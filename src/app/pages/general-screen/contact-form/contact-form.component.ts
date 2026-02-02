import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UtilsForm } from '@models';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  
  public statusOptions : boolean[] = [];
  public newcontact : boolean = true;
  public existOptions : boolean = false;
  public utilErrors !: any;

  @Output() addContact = new EventEmitter<boolean>;
  @Output() deleContact = new EventEmitter<boolean>;
  @Output() status = new EventEmitter<boolean[]>;
  @Input() contactForm !: FormGroup;
  @Input() showDelete : boolean = false;
  @Input() selectedOptions !: boolean[];
 

  ngOnInit(): void {
    this.utilErrors = new UtilsForm(this.contactForm);
    if(this.selectedOptions.length > 0){
      this.existOptions = true;
      this.statusOptions = this.selectedOptions;

    
      this.contactForm.patchValue({
        fact : this.selectedOptions[0],
        inst : this.selectedOptions[1],
        acla : this.selectedOptions[2],
        cont : this.selectedOptions[3]
      })

      if(this.selectedOptions[0]){
        this.contactForm.get('fact')?.disable();
      }
      else{
        this.contactForm.get('fact')?.enable();
      }

      if(this.selectedOptions[1]){
        
        this.contactForm.get('inst')?.disable();
   
      }
      else{
        this.contactForm.get('inst')?.enable();
      }

      if(this.selectedOptions[2]){
    
        this.contactForm.get('acla')?.disable();
      }
      else{
        this.contactForm.get('acla')?.enable();
      }

      if(this.selectedOptions[3]){
    
        this.contactForm.get('cont')?.disable();
      }
      else{
        this.contactForm.get('cont')?.enable();
      }

    }

    else{
      this.existOptions = false;
      this.statusOptions = [false,false,false,false];
      
    }
  
  }

  


  public checkOptions(event : MatCheckboxChange){
    if(event.checked){
      const index = Number(event.source.value);
      this.statusOptions[index] = true;
    }
    else{

      const index = Number(event.source.value);
      this.statusOptions[index] = false;
    }
    this.newcontact = this.statusOptions.every((value) => value === true) ? false : true;
    this.checkStatus();
    
  }

  public checkStatus():void{
    this.status.emit(this.statusOptions);
  }

  public contact():void{

    let type = false;
    type = this.statusOptions.some((value) => value === true);
    
    
    if(type){
      this.addContact.emit(true);
    }
    
  }

  public deleteContact():void{

    this.deleContact.emit(true);
  }

  public isError(controlName : string , type : string):boolean{
    return this.utilErrors.isError(controlName,type);
  }

  public keyPressNumbers(event : KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public keyPressLetters(event : KeyboardEvent) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
     
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }






}
