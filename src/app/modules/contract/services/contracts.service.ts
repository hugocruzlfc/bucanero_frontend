import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { api } from '../../../config';
import { Contract } from '../../shared/interfaces/contract.interface';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  apiUrl = api.SERVER_URL;

  constructor(private httpClient: HttpClient) { 
  }


  addNewContract(newContract: Contract): Observable<Contract>{
    return this.httpClient.post<Contract>(`${this.apiUrl}/contracts/create`,newContract);
   
  }
  
  sendEmail(emailBody: any){
    console.log(emailBody);
    return this.httpClient.post(`${this.apiUrl}/sendemail`,emailBody);
  }
}
