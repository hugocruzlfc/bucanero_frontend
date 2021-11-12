import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ExpiredRoutingModule } from './expired-routing.module';
import { ExpiredComponent } from './expired.component';
import { FilterPipe } from "../../pipes/filter.pipe";


@NgModule({
  declarations: [
    ExpiredComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ExpiredRoutingModule,
    DataTablesModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ExpiredModule { }
