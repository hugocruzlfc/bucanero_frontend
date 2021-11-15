import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,  ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '../../directives/directives.module'

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';


@NgModule({
  declarations: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule
  ]
})
export class ContractModule { }
