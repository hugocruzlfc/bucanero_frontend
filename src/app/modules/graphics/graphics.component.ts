import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';


import { GraphicsService } from './services/graphics.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  contracts$ = this.graphicsService.contracts;
  actualYear: any;
  arrayOfYears: number[]= [];
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabelsMonts: Label[] = ['Enero', 'Febrero','Marzo', 'Abril', 'Mayo', 
  'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  public barChartLabelsTotalValue: Label[] = [];
  public barChartLabelsExpired: Label[] = [];
  // public barChartLabelsTotalValue: Label[] = ['Informática', 'Matemática','Industrial', 'Economía', 'Turismo', 
  // 'RRHH', 'Jul', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartDataContract: ChartDataSets[] = [
    { data:[], label: 'Contratos' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartDataTotalValue: ChartDataSets[] = [
    { data:[], label: 'Monto' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  public barChartDataExpired: ChartDataSets[] = [
    { data:[], label: 'Días' },
    //{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  ruta: string = 'meses';

  constructor(private graphicsService: GraphicsService, private _location: Location) { 
    this.getCurrentYear();
  }

  ngOnInit(): void {
    this.getContractByYear();
    this.getTotalValueByContract();
    this.getExpiredByContract();
  }

  changeMenu(options: number){
    switch(options){
      case 1:{
        
          this.ruta = 'meses';
          break;
      }
      case 2:{
          this.ruta = 'monto';
          break;
      }
      case 3:{
          this.ruta = 'contrato';
          break;
      }
   }
  }



getContractByYear(){
  this.contracts$.subscribe(contracts =>{
    let contractByMont = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let value of contracts) {
      let actualContracts: any = value;
      let yearContract = new Date(actualContracts.signatureDate).getFullYear();
      if ((this.actualYear == yearContract) && (actualContracts.estate ==='Ejecución')){
        let mont =  new Date(actualContracts.signatureDate).getMonth();
          contractByMont[mont]++
          this.barChartDataContract[0].data = contractByMont;
      } 
          
        }
  })
}

refreshGetContractByYear(){
  this.getContractByYear();
}

getTotalValueByContract(){
  let count = 0;
  this.contracts$.subscribe(contracts =>{
    this.barChartLabelsTotalValue[0] ='Cantidad de Contratos:' + contracts.length.toString();
    for (let value of contracts) {
      if (value.estate === 'Ejecución') {
        count += value.totalValue;
      }
       
      }
     this.barChartDataTotalValue[0].data?.push(count);
  })
}

getExpiredByContract(){
  this.contracts$.subscribe(contracts =>{
    for (let value of contracts) {
       let currentDay = 0;
         if (value.dayYear === 'días') {
            currentDay = value.effect;
         } else {
          currentDay = value.effect * 365;
         }
         this.barChartDataExpired[0].data?.push(currentDay);
         this.barChartLabelsExpired.push( value.exactNumber ? value.exactNumber : 'En espera de Exact');
      }
  })
}

getCurrentYear(){
  let actualDay = Date.now();
  let today = new Date(actualDay);
  this.actualYear =  today.getFullYear();
  this.arrayOfYears.push( this.actualYear);
  this.contracts$.subscribe(contracts =>{
    for (let value of contracts) {
       let currentDay = 0;
         if (value.estate === 'Ejecución') {
          let fechaBd = value.signatureDate;
          let fechaBdFormat = new Date(fechaBd);
          let yearOfContract = fechaBdFormat.getFullYear();
          if ( !this.arrayOfYears.includes(yearOfContract)) {
            this.arrayOfYears.push(yearOfContract);
          }
         } 
      }
  })
}


  backClicked() {
    this._location.back();
  }


}
