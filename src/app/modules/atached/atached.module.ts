import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPrintModule} from 'ngx-print';

import { AtachedRoutingModule } from './atached-routing.module';
import { AtachedComponent } from './atached.component';
import { IfAtachedPipe } from '../../pipes/if-atached.pipe';


@NgModule({
  declarations: [
    AtachedComponent,
    IfAtachedPipe
  ],
  imports: [
    CommonModule,
    AtachedRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgxPrintModule
  ]
})
export class AtachedModule { }
