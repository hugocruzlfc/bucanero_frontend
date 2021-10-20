import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import {  Router } from '@angular/router';

import { Contract } from './../shared/interfaces/contract.interface';
import { ContractsService } from './services/contracts.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contractForm: FormGroup;
  private hexaOnly = /^([a-zA-Z]{3,3}-[0-9]{1,5})$/i; 
  actionMode: number = 1;

  constructor(private contractService: ContractsService, private fb: FormBuilder,
    private backRouter: Router) { 
    this.contractForm = this.fb.group({
      exactNumber: ['', [Validators.required, Validators.pattern(this.hexaOnly)]],
      sucursal: ['', [Validators.required]],
      signatureDate: ['', [Validators.required]],
      supplierClient: ['', [Validators.required]],
      aplicantArea: ['', [Validators.required]],
      supplementContract: ['', [Validators.required]],
      object: ['', [Validators.required]],
      processor: ['', [Validators.required]],
      effect: ['', [Validators.required]],
      wayToPay: ['', [Validators.required]],
      termToPay: ['', [Validators.required]],
      nationalInternational: [null, [Validators.required]],
      totalValue: [null, [Validators.required]],
      currencyPay: ['', [Validators.required]],
      exportation: [null, [Validators.required]],
      observations: [''],
    });
  }

  ngOnInit(): void {
      // This is intentional
  }

  async workerContract(){
    if (this.actionMode == 1) {
       var newContract: Contract;
       newContract = this.contractForm.value;
       newContract.nationalInternational = this.contractForm.value.nationalInternational == 'true'? true: false;
       newContract.exportation = this.contractForm.value.exportation == 'true'? true: false;
      this.contractService.addNewContract(newContract).subscribe();
      this.contractForm.reset();
    }  
 }

 cancel(){
  this.contractForm.reset();
  this.backRouter.navigate(['sgc/home/welcome']);
 }

}
