import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { ContractsService } from "./services/contracts.service";
import { Contract } from "../shared/interfaces/contract.interface";
import { Suplement } from "../shared/interfaces/suplement.interface";
import { NotificationService } from '../notification/services/notification.service';
declare var $: any;


@Component({
  selector: 'app-see-contract',
  templateUrl: './see-contract.component.html',
  styleUrls: ['./see-contract.component.scss']
})
export class SeeContractComponent implements OnInit {

  contracts = Array<Contract>();
  suplements = Array<Suplement>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalTitle: string = '';
  actionMode: number = 1;
  currentContract: any;
  contractForm: FormGroup;
  suplementForm: FormGroup;
  private hexaOnly = /^([a-zA-Z]{3,3}-[0-9]{1,5})$/i; 
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  showDayYear = false;
  contractPosition = 0;
  

  constructor(private contractService: ContractsService,  private fb: FormBuilder,
    private notificationService: NotificationService) {
    this.suplementForm =this.fb.group({
      amount: [null, [Validators.required]]
    });
    this.contractForm = this.fb.group({
      exactNumber: ['', [Validators.required, Validators.pattern(this.hexaOnly)]],
      estate: ['', [Validators.required]],
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
  this.getAllContracts();
  }

  getAllContracts(){
    this.contractService.getAllContract().subscribe(data => {
      const aux: any = data;
      if (aux) {
        this.contracts = aux;
        console.log(this.contracts)
        this.dtTrigger.next();
      }
     });
   }

   modalMode(mode: number,fila: number, item?: Contract){
    switch(mode){
      case 1:{
        this.modalTitle = 'Detalles del Contrato';
        this.actionMode = 1
        this.currentContract = item;
        this.showDayYear = this.currentContract.dayYear == 'años' ? true : false;
        this.showContract(this.currentContract)
       break;
      }
       case 2:{
        this.modalTitle = 'Editar Contrato';
        this.actionMode = 2
        this.currentContract = item;
        this.showDayYear = this.currentContract.dayYear == 'años' ? true : false;
        this.showContract(this.currentContract)
       break;
      }
       case 3:{
        this.currentContract = item;
        this.contractPosition = fila + 1;
       break;
      }
       case 4:{
        this.currentContract = item;
        this.suplements = this.currentContract.suplements;

       break;
      }
    }

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

   editContract(){
      var editContract: Contract = this.contractForm.value;
      editContract.exportation = this.contractForm.value.exportation == 'Si' ? true : false;
      editContract.nationalInternational = this.contractForm.value.nationalInternational == 'Nacional' ? true : false;
      editContract.dayYear = this.contractForm.value.dayYear ? 'años': 'días';
      editContract.id =  this.currentContract.id;
      this.contractService.editContract(editContract).subscribe(data => {
        this.notificationService.success('Contrato modificado correctamente',this.options);
        this.getAllContracts();
      });
    } 

    deleteContract(){
      this.contractService.deleteContract(this.currentContract).subscribe(data => {
        this.notificationService.warn('Contrato eliminado correctamente',this.options);
        this.getAllContracts(); 
      });
    }


    addSuplement(){
      let newSuplement: Suplement = this.suplementForm.value;
      newSuplement.contractId = this.currentContract.id;
      console.log(newSuplement);
      this.contractService.addSuplement(newSuplement).subscribe(data => {
        this.notificationService.warn('Suplemento añadido correctamente',this.options);
        this.getAllContracts(); 
      });
      $("#modalSuplemento").modal("hide");
    }

}
