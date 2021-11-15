import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNotBlankSpaces]'
})
export class NotBlankSpacesDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('keyup', ['$event'])
  keyup(event: { target: { value: any; }; }) {
    let value = event.target.value
    if(value.trim() === ""){
      if(!this.ngControl.control?.hasError('required')){
        this.ngControl.control?.setErrors({ required: true });
      }
    }
  }

}
