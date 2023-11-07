import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  guardarMensaje() {
    // Crear un mensaje que incluye la hora del sistema
    const mensaje = "Ubicación: Las Palomas 7839, Hora del dispositivo: " + new Date().toLocaleString();

    // Almacenar el mensaje en el localStorage
    localStorage.setItem('mensaje', mensaje);
  }
}
