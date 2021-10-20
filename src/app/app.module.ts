import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
//import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyC0h3mUv7nbA_BSRpshGqSMi8O-4PMcQHw'
    // })
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
