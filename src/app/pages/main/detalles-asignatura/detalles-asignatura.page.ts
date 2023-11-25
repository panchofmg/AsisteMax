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

  // Método para generar el contenido del código QR
  generateQRCodeData(): string {
    // Puedes ajustar esto según lo que desees en el código QR
    return this.asignatura ? `Asignatura ID: ${this.asignatura.id}` : '';
  }
}
