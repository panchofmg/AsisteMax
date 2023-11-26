import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
  @ViewChild('videoFront', { static: false }) videoFront: ElementRef;
  @ViewChild('videoBack', { static: false }) videoBack: ElementRef;
  cameraFacingMode: 'user' | 'environment' = 'environment'; // Inicia con la cámara trasera

  constructor(private alertController: AlertController, private renderer: Renderer2) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
      if (this.isSupported) {
        this.initCamera();
      }
    });
  }

  async initCamera(): Promise<void> {
    const streamFront = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
    });
    this.videoFront.nativeElement.srcObject = streamFront;

    const streamBack = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    this.videoBack.nativeElement.srcObject = streamBack;

    this.showCamera();
  }

  showCamera(): void {
    if (this.cameraFacingMode === 'user') {
      this.renderer.setStyle(this.videoFront.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.videoBack.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.videoFront.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.videoBack.nativeElement, 'display', 'block');
    }
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

  toggleCamera(): void {
    this.cameraFacingMode = this.cameraFacingMode === 'user' ? 'environment' : 'user';
    this.showCamera();
  }

  guardarMensaje() {
    const mensaje = "Ubicación: Las Palomas 7839, Hora del dispositivo: " + new Date().toLocaleString();
    localStorage.setItem('mensaje', mensaje);
  }
}
