import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
//import { AgmCoreModule } from '@agm/core';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';


@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyC0h3mUv7nbA_BSRpshGqSMi8O-4PMcQHw'
    // })
    GoogleMapsModule
  ]
})
export class AboutUsModule { }