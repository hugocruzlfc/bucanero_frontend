import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { api } from '../../../config';
import { Contract } from '../../shared/interfaces/contract.interface';

@Injectable({
  providedIn: 'root'
})
export class AtachedService {

   apiUrl = api.SERVER_URL;
  contracts: Observable<Contract[]>;

  constructor(private httpClient: HttpClient) { 
    this.contracts = this.getAllContract()
  }

  getAllContract(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(`${this.apiUrl}/contracts/all`);
  }  
  
  atachedContract(id: number, fileContract: FormData): Observable<Contract[]> {
    return this.httpClient.post<Contract[]>(`${this.apiUrl}/contracts/atached/${id}`,fileContract);
  }  
 
}
