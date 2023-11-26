import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage {
  asignaturas = [
    { id: 1, nombre: 'Gestión de proyectos informáticos', horario: 'Lunes - 10:00-12:10 | Jueves - 12:30 - 14:10', seccion: '003D', qrCode: 'qr_gestion_de_proyectos_informaticos', asistencia: 0, totalClases: 12, qrPath: 'assets/gestion-de-proyectos-informaticos-codigoqr.png', },
    { id: 2, nombre: 'Calidad de Software', horario: 'Lunes - 08:30 - 09:50 | Viernes - 12:30 - 14:10', seccion: '002D', qrCode: 'calidad_de_software', asistencia: 0, totalClases: 13, qrPath: 'assets/calidad-de-software-codigoqr.png', },
    { id: 3, nombre: 'Inglés Elemental', horario: 'Martes - 14:00 - 16:10 | Miércoles - 12:30 - 14:10', seccion: '007D', qrCode: 'qr_ingles_elemental', asistencia: 0, totalClases: 3, qrPath: 'assets/ingles-elemental-codigoqr.png', },
    { id: 4, nombre: 'Estadística descriptiva', horario: 'Lunes - 12:30-14:30 | Viernes - 10:00 - 11:30', seccion: '004D', qrCode: 'qr_estadistica_descriptiva', asistencia: 0, totalClases: 5, qrPath: 'assets/estadistica-descriptiva-codigoqr.png',  },
    { id: 5, nombre: 'Seguridad en sistemas computacionales', horario: 'Miércoles - 10:00-12:00 | Jueves - 08:30 - 10:00', seccion: '009D', qrCode: 'qr_seguridad_sistemas', asistencia: 0, totalClases: 7, qrPath: 'assets/seguridad-en-sistemas-computacionales-codigoqr.png',  },
  ];

  constructor(private router: Router, private alertController: AlertController) {}

  verDetalles(asignatura) {
    this.router.navigate(['/main/detalles-asignatura', asignatura.id], { state: { asignatura } });
  }

  async escanearCodigoQR(asignatura: any): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert('Permiso denegado', 'Por favor, garantiza los permisos de la cámara.');
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();
    if (barcodes.length > 0) {
      // Si se escanea un código, actualiza la asistencia
      asignatura.asistencia += 1;
      this.presentAlert('Éxito', 'Código QR escaneado. Asistencia registrada.');
    } else {
      this.presentAlert('Error', 'No se escaneó ningún código QR.');
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
}
