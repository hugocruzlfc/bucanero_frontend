import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


import { Contract } from '../../shared/interfaces/contract.interface';
import { Expired } from '../../shared/interfaces/expired.interface';
import { api } from '../../../config';



@Injectable({
  providedIn: 'root'
})
export class ExpiredService {
 
  apiUrl = api.SERVER_URL;
  contracts: Observable<Contract[]>;
  contractsExpired$: Observable<Expired[]>;
  //isContractExpired: boolean;
  countContractExpired: number;

  constructor(private httpClient: HttpClient) {
    this.contracts = this.getAllContract();
    this.contractsExpired$ = of(this.chequedExpired());
    this.countContractExpired = this.chequedExpired().length > 0 ? this.chequedExpired().length: 0;
    //this.isContractExpired = this.isExpiredBool();
   }


  
  getAllContract(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(`${this.apiUrl}/contracts/all`);
  } 

  chequedExpired(){
    let contractsExpired: Expired[] = [];
    this.contracts.subscribe(contracts =>{
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
          //  this.isContractExpired = true;
             let newContractExpired: Expired = contract;
             newContractExpired.dayToExpired = contratDays - result;
          contractsExpired.push(newContractExpired);
         }
      }
    })
    return contractsExpired;
  }
 isExpiredBool(): boolean{
    let contractsExpired: Expired[] = this.chequedExpired();
    if (contractsExpired.length > 0) {
       return true
    } else {
      return false
    }
  }





}
