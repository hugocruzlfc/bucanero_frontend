import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { GraphicsComponent } from './graphics.component';


@NgModule({
  declarations: [
    GraphicsComponent
  ],
  imports: [
    CommonModule,
    GraphicsRoutingModule,
    ChartsModule
  ]
})
export class GraphicsModule { }
