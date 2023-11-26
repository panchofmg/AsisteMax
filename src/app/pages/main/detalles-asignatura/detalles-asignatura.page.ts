import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-asignatura',
  templateUrl: './detalles-asignatura.page.html',
  styleUrls: ['./detalles-asignatura.page.scss'],
})
export class DetallesAsignaturaPage implements OnInit {
  asignatura: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.asignatura = history.state.asignatura;
  }
}
