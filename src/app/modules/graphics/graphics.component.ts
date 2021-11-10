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

  constructor(private graphicsService: GraphicsService, private _location: Location) { }

  ngOnInit(): void {
    this.getContractByMonth();
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



getContractByMonth(){
  this.contracts$.subscribe(contracts =>{
    let contractByMont = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let value of contracts) {
          let actualIncident: any = value;
          let mont =  new Date(actualIncident.createdAt).getMonth();
          contractByMont[mont]++
          this.barChartDataContract[0].data = contractByMont;
        }
  })
}

getTotalValueByContract(){
  let count = 0;
  this.contracts$.subscribe(contracts =>{
    this.barChartLabelsTotalValue[0] ='Cantidad de Contratos:' + contracts.length.toString();
    for (let value of contracts) {
       count += value.totalValue;
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
        //  let firmDay = value.signatureDate;
        //  let actualDay =  new Date();
        //  let firmDayFormat = (firmDay.getUTCFullYear() + "/" + (firmDay.getMonth() +1) + "/" + firmDay.getDate());
        //  let actualDayFormat = (actualDay.getFullYear() + "/" + (actualDay.getMonth() +1) + "/" + actualDay.getDate());
        //  var day1 = new Date(firmDayFormat); 
        //  var day2 = new Date(actualDayFormat);     
        //  const date1utc = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
        //   const date2utc = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());  
        //   let day = 1000*60*60*24;
        //   let result = (date2utc - date1utc)/day
        //   console.log(result);
         
        
         this.barChartDataExpired[0].data?.push(currentDay);
         this.barChartLabelsExpired.push( value.exactNumber ? value.exactNumber : 'En espera de Exact');
      }
  })
}




  backClicked() {
    this._location.back();
  }


}
