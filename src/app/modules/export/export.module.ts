import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './export.component';


@NgModule({
  declarations: [
    ExportComponent
  ],
  imports: [
    CommonModule,
    ExportRoutingModule,
    DataTablesModule
  ]
})
export class ExportModule { }
