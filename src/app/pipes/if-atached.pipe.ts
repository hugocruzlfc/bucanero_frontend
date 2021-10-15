import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifAtached'
})
export class IfAtachedPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
   let resp = 'No';
   if (value) {
     resp = 'Si'
   }
    return resp;
  }

}
