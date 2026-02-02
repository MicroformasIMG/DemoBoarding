import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { IdentificacionOficial } from 'src/app/shared/interfaces/IdentificacionOficial';

@Component({
  selector: 'app-option-identificacion',
  templateUrl: './option-identificacion.component.html',
  styleUrls: ['./option-identificacion.component.scss']
})
export class OptionIdentificacionComponent implements OnInit{

  @Input() formOption !: FormGroup;
  @Input() title !: string;
  @Input() identificacionData !: IdentificacionOficial[];
  @Output() selectedOption = new EventEmitter<IdentificacionOficial>();

  public generalForm !: FormGroup;


  ngOnInit(){
    if(this.formOption){
      this.generalForm = this.formOption;
    }
  }

  public selected(event : MatRadioChange):void{

    if(event.source.checked){
      const {value} = event;
      let selectedIdentificacion : IdentificacionOficial = this.identificacionData.find(it => it.id == Number(value))!;
      this.selectedOption.emit(selectedIdentificacion);

    }
  
    
  }
 
 


}
