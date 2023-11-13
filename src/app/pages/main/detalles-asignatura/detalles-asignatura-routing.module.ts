import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesAsignaturaPage } from './detalles-asignatura.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesAsignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesAsignaturaPageRoutingModule {}
