import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsignaturasPageRoutingModule } from './asignaturas-routing.module';

import { AsignaturasPage } from './asignaturas.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [AsignaturasPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AsignaturasPageRoutingModule,
        SharedModule
    ]
})
export class AsignaturasPageModule {}
