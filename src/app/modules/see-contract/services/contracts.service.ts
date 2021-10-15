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
  contracts: Observable<Contract[]>;

  constructor(private httpClient: HttpClient) { 
    this.contracts = this.getAllContract()
  }

  getAllContract(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(`${this.apiUrl}/contracts/all`);
  }  

  editContract(contract: Contract){
    let id = contract.id;
    return this.httpClient.put(`${this.apiUrl}/contracts/update/${id}`,contract);
  }

  deleteContract(contract: Contract){
    let id = contract.id;
    return this.httpClient.delete(`${this.apiUrl}/contracts/delete/${id}`);
  }
}
