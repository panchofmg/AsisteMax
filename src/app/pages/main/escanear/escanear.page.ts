import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  @ViewChild('video', { static: false }) video: ElementRef;

  constructor(private alertController: AlertController) { }

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
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Por favor, garantiza los permisos a la aplicación para poder utilizar la cámara.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  guardarMensaje() {
    const mensaje = "Ubicación: Las Palomas 7839, Hora del dispositivo: " + new Date().toLocaleString();
    localStorage.setItem('mensaje', mensaje);
  }
}
