import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit{

  @Input() formOption !: FormGroup;
  @Input() title !: string;
  @Input() optionOne !: string;
  @Input() optionTwo !: string;
  @Input() onlyOne !: boolean;
  @Input() selectedOne !: boolean;
  @Output() selectedOption = new EventEmitter<number>();

  public generalForm !: FormGroup;


  ngOnInit(){
    if(this.formOption){
      this.generalForm = this.formOption;
    }
  }

  public selected(event : MatRadioChange):void{

    if(event.source.checked){
      const {value} = event;
      this.selectedOption.emit(Number(value));

    }
  
    
  }
 
 


}
