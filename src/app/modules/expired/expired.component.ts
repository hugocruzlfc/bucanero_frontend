import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {  FormGroup, FormBuilder } from '@angular/forms'; 

import { ExpiredService } from "./services/expired.service";
import { Contract } from "../shared/interfaces/contract.interface";
import { Expired } from '../shared/interfaces/expired.interface';

@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  expiredContracts: Expired[] = [];
  contractForm: FormGroup;
  currentContract: any;
  showDayYear = false;
  filterContracts= '';

  constructor(private expiredService: ExpiredService,  private fb: FormBuilder) {
   
    this.contractForm = this.fb.group({
      exactNumber: [''],
      estate: [''],
      sucursal: [''],
      signatureDate: [''],
      supplierClient: [''],
      aplicantArea: [''],
      contractType: [''],
      object: [''],
      processor: [''],
      effect: [null],
      dayYear: [false],
      wayToPay: [''],
      termToPay: [''],
      nationalInternational: [null],
      totalValue: [null],
      currencyPay: [''],
      exportation: [null],
      observations: [''],
    });
    
   }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      info: true,
      retrieve: true,
      destroy: true,
      responsive: true,
      stateSave: true,
      columnDefs: [
        {
          targets:[0],
          orderData: [0,1]
        },
      ],
      language: {
        emptyTable:	"No hay datos disponibles.",
        zeroRecords:	"No se han encontrado coincidencias.",
        lengthMenu: 'Mostrar _MENU_  elementos',
        loadingRecords:	"Cargando...",
        processing:	"Procesando...",
        search: 'Buscar:',
        searchPlaceholder:	"Dato para buscar",
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        },
        aria: {
					sortAscending:	"Ordenación ascendente",
					sortDescending:	"Ordenación descendente"
				}
   }
  }
  this.expiredService.contractsExpired$.subscribe(contracts =>{
    this.expiredContracts = contracts;
    console.log(contracts)
    this.dtTrigger.next();
  })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



  modalMode( item?: Contract){
        this.currentContract = item;
        this.showDayYear = this.currentContract.dayYear == 'años' ? true : false;
        this.showContract(this.currentContract);
      
    }


    showContract(item: Contract){
  
      this.contractForm.patchValue({
        'exactNumber': item.exactNumber,
        'estate': item.estate,
        'sucursal' : item.sucursal ,
        'signatureDate': item.signatureDate,
        'supplierClient': item.supplierClient,
        'aplicantArea' : item.aplicantArea,
        'contractType' : item.contractType,
        'object' : item.object,
        'processor': item.processor,
        'effect' : item.effect,
        'wayToPay': item.wayToPay,
        'termToPay' : item.termToPay,
         'nationalInternational' : item.nationalInternational ? 'Nacional': 'Internacional',
         'totalValue' : item.totalValue,
        'currencyPay': item.currencyPay,
        'exportation': item.exportation ? 'Si': 'No',
        'observations' : item.observations
        })
     }



  }

  

