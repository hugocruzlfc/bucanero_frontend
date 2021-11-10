import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import {  Router } from '@angular/router';

import { Contract } from './../shared/interfaces/contract.interface';
import { ContractsService } from './services/contracts.service';
import { NotificationService } from '../notification/services/notification.service';
import { ComunicationService } from '../shared/services/comunication.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  contractForm: FormGroup;
  private hexaOnly = /^([a-zA-Z]{3,3}-[0-9]{1,5})$/i; 
  actionMode: number = 1;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  userName = '';
  showDayYear = false;
  otros = '';

  constructor(private contractService: ContractsService, private comunicationService: ComunicationService,
    private fb: FormBuilder,private notificationService: NotificationService,
    private backRouter: Router) { 
      this.comunicationService.customName.subscribe(userName => {
        this.userName = userName;
      });
    this.contractForm = this.fb.group({
     // exactNumber: ['', [Validators.required, Validators.pattern(this.hexaOnly)]],
      sucursal: ['', [Validators.required]],
      signatureDate: ['', [Validators.required]],
      supplierClient: ['', [Validators.required]],
      aplicantArea: ['', [Validators.required]],
      contractType: ['', [Validators.required]],
      object: ['', [Validators.required]],
      processor: ['', [Validators.required]],
      effect: [null, [Validators.required]],
      dayYear: [false],
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
       newContract.dayYear = this.contractForm.value.dayYear ? 'años': 'días';
       newContract.exportation = this.contractForm.value.exportation == 'true'? true: false;
       let emailBody = {
        nombre: this.userName,
        asunto: "En espera de asignación de número de orden.",
        mensaje: `Se solicita un número de orden para el ${newContract.contractType} firmado por nuestra fábrica y ${newContract.supplierClient} con fecha ${newContract.signatureDate}. Saludos!`
       }
      this.contractService.addNewContract(newContract).subscribe(data =>{
         this.notificationService.success('Contrato creado correctamente',this.options);
         this.contractService.sendEmail(emailBody).subscribe();
      });
      this.contractForm.reset();
    }  
 }

 cancel(){
  this.contractForm.reset();
  this.backRouter.navigate(['sgc/home/welcome']);
 }

 
    
}
