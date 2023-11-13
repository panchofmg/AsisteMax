import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  asignaturas = [
    { nombre: 'Gestión de proyectos informáticos', porcentaje: 25 },
    { nombre: 'Calidad de Software', porcentaje: 90 },
    { nombre: 'Inglés Elemental', porcentaje: 63 },
    { nombre: 'Estadística descriptiva', porcentaje: 78 },
    { nombre: 'Seguridad en sistemas computacionales', porcentaje: 15 },
    // Añadir más asignaturas si es necesario
  ];

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  // ===== CERRAR SESIÓN ===== //
  signOut(){
    this.firebaseSvc.signOut();
  }

  aumentarPorcentaje(asignatura) {
    if (asignatura.porcentaje < 100) {
      asignatura.porcentaje += 5;
      if (asignatura.porcentaje > 100) {
        asignatura.porcentaje = 100;
      }
      // Almacenar mensaje en localStorage
      const mensaje = "Ubicación: Las Palomas 7839, Hora del dispositivo: " + new Date().toLocaleString();
      localStorage.setItem('mensajeAsistencia', mensaje);

      // Aquí podrías guardar el porcentaje actual en tu base de datos o almacenamiento.
    }
  }

}
