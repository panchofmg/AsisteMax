import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  asignaturas = [
    { id: 1, nombre: 'Gestión de proyectos informaticos', horario: 'Lunes - 10:00-12:10 | Jueves - 12:30 - 14:10', seccion: '003D' },
    { id: 2, nombre: 'Calidad de Software', horario: 'Lunes - 08:30 - 09:50 | Viernes - 12:30 - 14:10', seccion: '002D' },
    { id: 3, nombre: 'Ingles Elemental', horario: 'Martes - 14:00 - 16:10 | Miercoles - 12:30 - 14:10', seccion: '007D' },
    { id: 4, nombre: 'Estadistica descriptiva', horario: 'Lunes - 12:30-14:30 | Viernes - 10:00 - 11:30', seccion: '004D' },
    { id: 5, nombre: 'Seguridad en sistemas computacionales', horario: 'Miercoles - 10:00-12:00 | Jueves - 08:30 - 10:00', seccion: '009D' },
  ];

  constructor(private router: Router) { }

  verDetalles(asignatura) {
    this.router.navigate(['/main/detalles-asignatura', asignatura.id], { state: { asignatura } });
  }

  ngOnInit() {
  }

}
