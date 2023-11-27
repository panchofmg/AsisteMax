import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import {BarcodeScanner} from '@awesome-cordova-plugins/barcode-scanner/ngx'

@Component({
  selector: 'app-escanear',
  templateUrl: './escanear.page.html',
  styleUrls: ['./escanear.page.scss'],
})
export class EscanearPage{
  texto:string=''
  constructor(private barcodescanner:BarcodeScanner) {}

  scan(){
    this.barcodescanner.scan().then(barcodedata=>{
      console.log("Scaneando...", barcodedata);
      this.texto=(JSON.stringify(barcodedata));
    }).catch(err=>{
      console.log("ERROR AL ESCANEAR!!!!");
    })

  }

}
