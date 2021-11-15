import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotBlankSpacesDirective } from "./components/not-blank-spaces.directive";



@NgModule({
  declarations: [ NotBlankSpacesDirective],
  imports: [
    CommonModule
  ],
  exports: [ NotBlankSpacesDirective]
})
export class DirectivesModule { }
