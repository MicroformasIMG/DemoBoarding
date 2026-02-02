import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ESignatureRoutingModule } from './e-signature-routing.module';
import { ESignatureComponent } from './e-signature.component';
import { AmaterialModule, SharedModule } from '@modules';
import { StatusComponent } from './status/status.component';
import { ErrorComponent } from './status/error/error.component';
import { SuccessComponent } from './status/success/success.component';


@NgModule({
  declarations: [
    ESignatureComponent,
    StatusComponent,
    ErrorComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    ESignatureRoutingModule,
    SharedModule,
    AmaterialModule
  ]
})
export class ESignatureModule { }
