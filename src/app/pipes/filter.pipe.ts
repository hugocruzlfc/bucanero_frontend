import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any,arg: string): any {
        if (arg ==='') return value;
        const resutlContracts =[];
        for(const contract of value){

           if ((contract.supplierClient.toLowerCase().indexOf(arg.toLowerCase()) > -1)
           ||(contract.exactNumber?.toLowerCase().indexOf(arg.toLowerCase()) > -1)) {
            console.log(contract)
            resutlContracts.push(contract);
           }
        }
        return resutlContracts;
  }

}
