import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavRecoverComponent } from './nav-recover/nav-recover.component';
import { AmaterialModule } from '../amaterial/amaterial.module';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatRadioModule} from '@angular/material/radio';
import { TitleComponent } from './title/title.component';
import { OptionComponent } from './option/option.component';
import { PromotionComponent } from './promotion/promotion.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionIdentificacionComponent } from './optionIdentificacion/option-identificacion.component';


@NgModule({
  declarations: [
    NavRecoverComponent,
    HeaderComponent,
    NavbarComponent,
    TitleComponent,
    OptionComponent,
    OptionIdentificacionComponent,
    PromotionComponent,
    AddButtonComponent,
    
  ],
  imports: [
    CommonModule,
    AmaterialModule,
    ReactiveFormsModule
  ],
  exports:[
    NavRecoverComponent,
    HeaderComponent,
    NavbarComponent,
    MatRadioModule,
    TitleComponent,
    OptionComponent,
    OptionIdentificacionComponent,
    PromotionComponent,
    AddButtonComponent
    
  ]
})
export class SharedModule { }
