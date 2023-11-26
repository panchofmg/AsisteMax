import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  isSupported = false;
  isScanning = false; // Variable para controlar la visibilidad del recuadro de reconocimiento
  barcodes: Barcode[] = [];
  @ViewChild('video', { static: false }) video: ElementRef;

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
      if (this.isSupported) {
        this.initCamera();
      }
    });
  }

  async initCamera(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' } // Utiliza siempre la cámara trasera
    });
    this.video.nativeElement.srcObject = stream;
  }

  async scan(): Promise<void> {
    this.isScanning = true; // Muestra el recuadro de reconocimiento

    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso denegado', 'Por favor, garantiza los permisos de la cámara.');
      this.isScanning = false; // Oculta el recuadro si se deniegan los permisos
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);

    this.isScanning = false; // Oculta el recuadro después de escanear

    if (barcodes.length > 0) {
      const scannedCode = barcodes[0].rawValue;
      const matchedAsignatura = this.asignaturas.find(asignatura => asignatura.qrCode === scannedCode);

      if (matchedAsignatura) {
        matchedAsignatura.asistencia += 1;
        this.presentAlert('Éxito', 'Código QR escaneado. Asistencia registrada.');
      } else {
        this.presentAlert('Error', 'Código QR no reconocido.');
      }
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  guardarMensaje() {
    const mensaje = "Ubicación: Las Palomas 7839, Hora del dispositivo: " + new Date().toLocaleString();
    localStorage.setItem('mensaje', mensaje);
  }

  asignaturas: { id: number; nombre: string; qrCode: string; asistencia: number }[] = [
    { id: 1, nombre: 'Gestión de proyectos informáticos', qrCode: 'qr_gestion_proyectos', asistencia: 0 },
    { id: 2, nombre: 'Calidad de Software', qrCode: 'qr_calidad_software', asistencia: 0 },
    { id: 3, nombre: 'Inglés Elemental', qrCode: 'qr_ingles_elemental', asistencia: 0},
    { id: 4, nombre: 'Estadística descriptiva', qrCode: 'qr_estadistica_descriptiva', asistencia: 0},
    { id: 5, nombre: 'Seguridad en sistemas computacionales', qrCode: 'qr_seguridad_sistemas', asistencia: 0},
  ];
}
