import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesAsignaturaPageRoutingModule } from './detalles-asignatura-routing.module';

import { DetallesAsignaturaPage } from './detalles-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesAsignaturaPageRoutingModule
  ],
  declarations: [DetallesAsignaturaPage]
})
export class DetallesAsignaturaPageModule {}
