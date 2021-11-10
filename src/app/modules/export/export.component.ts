import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ExportService } from "./services/export.service";
import { Contract, ContractEsp } from "../shared/interfaces/contract.interface";
import { NotificationService } from '../notification/services/notification.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  contracts = Array<Contract>();
  contractsExportEsp = Array<ContractEsp>();
  contractsExport: boolean[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  selectedTrue = false;

  constructor(private exportService: ExportService,private notificationService: NotificationService) { }

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
    this.exportService.getAllContract().subscribe(data => {
      const aux: any = data;
      if (aux) {
        this.contracts = aux;
        this.dtTrigger.next();
      }
     });
   }

  exportToExcel(item: Contract){
    
    let contractsArray: any[] = [];
    let contractToExcel= new ContractEsp(); 
    contractToExcel.No_EXACT = item.exactNumber;
    contractToExcel.Estado = item.estate;
    contractToExcel.Sucursal = item.sucursal;
    contractToExcel.Fecha_de_Firma = item.signatureDate;
    contractToExcel.Proveedor_Cliente = item.supplierClient;
    contractToExcel.Área = item.aplicantArea;
    contractToExcel.Tipo_de_Contrato = item.contractType;
    contractToExcel.Objeto = item.object;
    contractToExcel.Tramitador = item.processor;
    contractToExcel.Vigencia = item.effect;
    contractToExcel.Día_Año = item.dayYear;
    contractToExcel.Forma_Pago = item.wayToPay;
    contractToExcel.Término_Pago = item.termToPay;
    contractToExcel.Nacional_Internacional = item.nationalInternational? 'Si': 'No';
    contractToExcel.Valor_Total = item.totalValue;
    contractToExcel.Moneda = item.currencyPay;
    contractToExcel.Exportación = item.exportation ? 'Si' : 'No';
    contractToExcel.Observaciones = item.observations;

    contractsArray.push(contractToExcel);
    this.exportService.exportExcel(contractsArray, 'Contrato');
   this.notificationService.success('Contrato exportado correctamente',this.options);
  }

  checkOnClick(item: Contract, i: number){
    if(this.contractsExport[i]){
      this.contractsExport[i] = false;

    }else{
      this.contractsExport[i] = true;

    }
    this.selectedTrue = false;
    for( let value of this.contractsExport){
         if(value){
           this.selectedTrue = true;
         }
    }
  }

  exportSelectedToExcel(){
    for (let index = 0; index < this.contractsExport.length; index++) {
           if (this.contractsExport[index]) {
            let contractToExcel= new ContractEsp(); 
            contractToExcel.No_EXACT = this.contracts[index].exactNumber;
            contractToExcel.Sucursal = this.contracts[index].sucursal;
            contractToExcel.Fecha_de_Firma = this.contracts[index].signatureDate;
            contractToExcel.Proveedor_Cliente = this.contracts[index].supplierClient;
            contractToExcel.Área = this.contracts[index].aplicantArea;
            contractToExcel.Tipo_de_Contrato = this.contracts[index].contractType;
            contractToExcel.Objeto = this.contracts[index].object;
            contractToExcel.Tramitador = this.contracts[index].processor;
            contractToExcel.Vigencia = this.contracts[index].effect;
            contractToExcel.Día_Año = this.contracts[index].dayYear;
            contractToExcel.Forma_Pago = this.contracts[index].wayToPay;
            contractToExcel.Término_Pago = this.contracts[index].termToPay;
            contractToExcel.Nacional_Internacional = this.contracts[index].nationalInternational? 'Si': 'No';
            contractToExcel.Valor_Total = this.contracts[index].totalValue;
            contractToExcel.Moneda = this.contracts[index].currencyPay;
            contractToExcel.Exportación = this.contracts[index].exportation ? 'Si' : 'No';
            contractToExcel.Observaciones = this.contracts[index].observations;
            this.contractsExportEsp.push(contractToExcel);

           } 
      
    }
    if(this.contractsExportEsp.length > 0){
      this.exportService.exportExcel(this.contractsExportEsp, 'Contratos');
      this.notificationService.success('Contratos exportados correctamente',this.options);
    }
    this.contractsExportEsp = [];


    //mensaje para  cuando no marcas nada
    
  }

}
