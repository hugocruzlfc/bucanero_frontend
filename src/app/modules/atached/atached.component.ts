import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms'; 

import { Contract } from "../shared/interfaces/contract.interface";
import { AtachedService } from "../atached/services/atached.service";
import { NotificationService } from '../notification/services/notification.service';

@Component({
  selector: 'app-atached',
  templateUrl: './atached.component.html',
  styleUrls: ['./atached.component.scss']
})
export class AtachedComponent implements OnInit {

  contracts = Array<Contract>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  modalTitle: string = '';
  actionMode: number = 1;
  currentContract: any;
  contractForm: FormGroup;
  private hexaOnly = /^([a-zA-Z]{3,3}-[0-9]{1,5})$/i; 
  imageSrc = "assets/images/+imagen.png";
  fileContract? = new File([],'');
  fotoSelected: boolean = false;
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
 

  constructor(private atachedService: AtachedService,  private fb: FormBuilder,
    private notificationService: NotificationService,) {
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
    this.atachedService.getAllContract().subscribe(data => {
      const aux: any = data;
      if (aux) {
        this.contracts = aux;
        this.dtTrigger.next();
      }
     });
   }

   modalMode(item?: Contract){
  
        this.modalTitle = 'Adjuntar Foto de Contrato';
        this.actionMode = 1
        this.currentContract = item;
        if (this.currentContract.contractAttached) {
          this.imageSrc = this.linkImg();
        } else {
          this.imageSrc = "assets/images/+imagen.png";
        }
        this.fotoSelected = false;

  }



   linkImg() {
     let urlImage: string = this.currentContract.contractAttached;
     ///console.log(this.currentContract.contractAttached);
    // quito la palabra public
    let str = urlImage.replace(/storage/g, '');
    // quito la barra '\'
    str = str.replace('\\', '');
    // invierto la barra en sentido a '/'
    str = str.replace('\\', '/');
    // console.log(str);
    const URL = 'http://localhost:3001/';
    const link = URL + str;
    return link;
  }

  selectFotoToContract(){
    let  fileUpload = document.getElementById('fileUpload') as HTMLInputElement;

      fileUpload.onchange = () =>{
        this.fileContract = fileUpload.files![0];
        this.fotoSelected = true;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(this.fileContract);
       };
  
      fileUpload.click();
  }


  atachedContract(){
    let formData = new FormData();
    formData.append('contractAttached', this.fileContract!);
    this.atachedService.atachedContract(this.currentContract.id, formData).subscribe(data =>{
      this.notificationService.success('Contrato adjuntado correctamente',this.options);
         this.getAllContracts();
    });
  }

}
