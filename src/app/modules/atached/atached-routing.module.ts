import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtachedComponent } from './atached.component';

const routes: Routes = [{ path: '', component: AtachedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtachedRoutingModule { }
