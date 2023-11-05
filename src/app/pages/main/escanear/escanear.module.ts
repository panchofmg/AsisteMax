import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscanearPageRoutingModule } from './escanear-routing.module';

import { EscanearPage } from './escanear.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [EscanearPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EscanearPageRoutingModule,
        SharedModule
    ]
})
export class EscanearPageModule {}
