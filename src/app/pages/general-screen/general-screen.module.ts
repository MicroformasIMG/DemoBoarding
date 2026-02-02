import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralScreenRoutingModule } from './general-screen-routing.module';
import { DataComponent } from './data.component';
import { AmaterialModule, SharedModule } from '@modules';
import { ClabeComponent } from './clabe/clabe.component';
import { DataFormComponent } from './data-form/data-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommercialFormComponent } from './commercial-form/commercial-form.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { LinksComponent } from './links/links.component';
import { NgxCurrencyModule } from "ngx-currency";
import { DataValidationComponent } from './data-validation/data-validation.component';
import { UploadComponent } from './data-validation/upload/upload.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactComponent } from './contact/contact.component';
import { OnlyTextDirective } from 'src/app/shared/directives/only-text.directive';
import { RadioCheckComponent } from './radio-check/radio-check.component';
import { DocumentVerifierComponent } from './document-verifier/document-verifier.component';



@NgModule({
  declarations: [
    DataComponent,
    ClabeComponent,
    DataFormComponent,
    CommercialFormComponent,
    EmailFormComponent,
    LinksComponent,
    DataValidationComponent,
    UploadComponent,
    ContactFormComponent,
    ContactComponent,
    RadioCheckComponent,
    DocumentVerifierComponent,
    
    
    
   
  ],
  imports: [
    CommonModule,
    GeneralScreenRoutingModule,
    SharedModule,
    AmaterialModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    FormsModule,
   
   
  ]
})
export class GeneralScreenModule { }
