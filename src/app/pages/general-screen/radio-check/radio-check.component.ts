import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-check',
  templateUrl: './radio-check.component.html',
  styleUrls: ['./radio-check.component.scss']
})
export class RadioCheckComponent implements OnInit {

  public isDesktop !: boolean;
  @Input() formOption !: FormGroup;
  public generalForm !: FormGroup
  @Output() value = new EventEmitter<boolean>();

  constructor(private fb : FormBuilder ){}
  ngOnInit(): void {
  
    

    if(this.formOption){

      this.generalForm = this.formOption;
      
  
    }
  }

  public option(event : any):void{
    this.value.emit(true);
    

  }

  

}
