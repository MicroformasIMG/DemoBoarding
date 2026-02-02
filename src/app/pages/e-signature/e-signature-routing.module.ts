import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ESignatureComponent } from './e-signature.component';
import { ErrorComponent } from './status/error/error.component';
import { SuccessComponent } from './status/success/success.component';

const routes: Routes = [
  {
    path:'',
    
    children:[
      {
        path:'',
        component : ESignatureComponent,
      }
      ,
      {
        path:'confirmacion',
        component : SuccessComponent
      },
      {
        path:'error',
        component: ErrorComponent
      }
    ]

  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ESignatureRoutingModule { }
