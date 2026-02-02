import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGuard } from './shared/guards/data.guard';
import { SignatureGuard } from './shared/guards/signature.guard';



const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path:'data',
    loadChildren: () => import('./pages/general-screen/general-screen.module').then( m  => m.GeneralScreenModule),
    canActivate : [DataGuard]
  },
  {
    path:'firma',
    loadChildren: () => import('./pages/e-signature/e-signature.module').then(m => m.ESignatureModule),
    canActivate: [SignatureGuard]
  }


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
