import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeeContractComponent } from './see-contract.component';

const routes: Routes = [{ path: '', component: SeeContractComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeeContractRoutingModule { }
