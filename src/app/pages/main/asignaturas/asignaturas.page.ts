import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  asignaturas = [
    { nombre: 'Gestión de proyectos informaticos', datos: { /* datos de la clase */ } },
    { nombre: 'Calidad de Software', datos: { /* datos de la clase */ } },
    { nombre: 'Ingles Elemental', datos: { /* datos de la clase */ } },
    { nombre: 'Estadistica descriptiva', datos: { /* datos de la clase */ } },
    { nombre: 'Seguridad en sistemas computacionales', datos: { /* datos de la clase */ } },
    // Puedes agregar más asignaturas aquí
  ];

  constructor(private router: Router) { }

  verDetalles(asignatura) {
    // Aquí rediriges a la página de detalles de la asignatura seleccionada
    this.router.navigate(['detalles-asignatura', { asignatura: asignatura }]);
  }

  ngOnInit() {
  }

}
