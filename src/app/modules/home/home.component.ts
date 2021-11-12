import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { NotificationService } from "../notification/services/notification.service";
import { ComunicationService } from '../shared/services/comunication.service';
import { ContractsService } from '../see-contract/services/contracts.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ruta: string = '';
  userName =  '';
  isAdmin: boolean = false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  countExpired = 0;
  contracts$ = this.contractsService.contracts;
  
  constructor(private router: Router, private comunicationService: ComunicationService,
          public notificationService: NotificationService, public contractsService: ContractsService ) { 
            const navigation = this.router.getCurrentNavigation();
            let user = navigation?.extras?.state;
            this.userName = user?.name;
            this.comunicationService.changeUserName(this.userName);
            if (user?.role == 'Administrador') {
              this.isAdmin = true;
            }
            this.chequedExpired();
          }

  ngOnInit(): void {
    
  }
  

  changeMenu(options: number){
    switch(options){
       case 1:{
           this.ruta = 'crearContrato';
           break;
       }
       case 2:{
           this.ruta = 'verContrato';
           break;
       }
       case 3:{
           this.ruta = 'adjuntarContrato';
           break;
       }
       case 4:{
           this.ruta = 'exportToExcel';
           break;
       }
       case 5:{
           this.ruta = 'admin';
           break;
       }
       case 6:{
           this.ruta = 'help';
           break;
       }
       case 7:{
           this.ruta = 'aboutUs';
           break;
       }
       case 8:{
           this.ruta = 'expired';
           break;
       }
    }
    
  }

  logout(){
    this.router.navigate(['login']);
  }

  chequedExpired(){
    this.contracts$.subscribe(contracts =>{
      for(let contract of contracts){
        let fechaBd = contract.signatureDate;
        let fechaBdFormat = new Date(fechaBd);
         let actualDay = Date.now();
         let today = new Date(actualDay);
         let fecha1 = Date.UTC(fechaBdFormat.getUTCFullYear() ,fechaBdFormat.getMonth() +1, fechaBdFormat.getDate()+1);
         let fecha2 = Date.UTC(today.getUTCFullYear() ,today.getMonth() +1, today.getDate());
         let day = 1000*60*60*24;
         let result = (fecha2 - fecha1)/day;
         let contratDays = 0;
         if (contract.dayYear === 'año') {
          contratDays = contract.effect * 365;
         }else{
          contratDays = contract.effect;
         }
         if(contratDays - result <= 30){
          this.countExpired++;
         }
      }
      if (this.countExpired > 0) {
        if (this.countExpired === 1) {
          this.notificationService.error(`Tiene ${this.countExpired} contrato a punto de vencer!`,this.options)
        } else {
          this.notificationService.error(`Tiene ${this.countExpired} contratos a punto de vencer!`,this.options)
        }
        
        
      }
    })
  }

}
