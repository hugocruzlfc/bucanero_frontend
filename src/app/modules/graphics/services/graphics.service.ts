import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contract } from '../../shared/interfaces/contract.interface';
import { api } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class GraphicsService {

  apiUrl = api.SERVER_URL;
  contracts: Observable<Contract[]>;

  constructor(private httpClient: HttpClient) {
    this.contracts = this.getAllContracts();
   }

   getAllContracts(): Observable<Contract[]> {
    return this.httpClient.get<Contract[]>(`${this.apiUrl}/contracts/all`);
  }
 

}
