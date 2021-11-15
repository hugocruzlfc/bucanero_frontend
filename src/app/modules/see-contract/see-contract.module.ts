import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';
import { DirectivesModule } from '../../directives/directives.module'

import { SeeContractRoutingModule } from './see-contract-routing.module';
import { SeeContractComponent } from './see-contract.component';


@NgModule({
  declarations: [
    SeeContractComponent
  ],
  imports: [
    CommonModule,
    SeeContractRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    DirectivesModule
  ]
})
export class SeeContractModule { }
