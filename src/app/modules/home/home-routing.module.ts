import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/welcome',
    pathMatch: 'full'
  },
  {
    path: 'home',component: HomeComponent, children: 
    [
      { path: 'welcome', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'contract', loadChildren: () => import('../contract/contract.module').then(m => m.ContractModule) },
      { path: 'see-contract', loadChildren: () => import('../see-contract/see-contract.module').then(m => m.SeeContractModule) },
      { path: 'export', loadChildren: () => import('../export/export.module').then(m => m.ExportModule) },
      { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
      { path: 'about-us', loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsModule) },
      { path: 'admin/users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
      { path: 'admin/graphics', loadChildren: () => import('../graphics/graphics.module').then(m => m.GraphicsModule) },
      { path: 'help', loadChildren: () => import('../help/help.module').then(m => m.HelpModule) },  
      { path: 'atached', loadChildren: () => import('../atached/atached.module').then(m => m.AtachedModule) }
    ]
     
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
