import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { UtilsForm } from '@models';
import { DataService, FormService } from '@services';
import { Business } from '@interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit, OnChanges {

  private utils !: any;
  public addContact : boolean = false;
  public businessTypes !: Business[];
  public lastSelected : string = "";
  @Input() name: any;
  @Input() dataForm !: FormGroup;
  public recoverSelected !: string;


  constructor(private dataService : DataService , private formService : FormService){}
  
  ngOnInit(){
    if (this.formService.existInfo()) {
      if (this.dataService.getBusiness() == undefined) {
        this.dataService.bussinesTypes().subscribe({
          next: ((res) => {

            this.businessTypes = res;
            this.dataService.setBusiness(res);
            this.businessTypes = this.dataService.businessInfo;
            const dat = this.formService.recoverForm.client;
            this.dataForm.controls['nameRepresent'].setValue(dat?.nameRepresent);

          })
        })
      } else {
        this.businessTypes = this.dataService.businessInfo;
        const dat = this.formService.recoverForm.client;
        this.dataService.businessOption.emit(dat?.categoryBusiness);
        this.dataForm.controls['nameRepresent'].setValue(dat?.nameRepresent);
      }
    }
    else{
      this.dataService.bussinesTypes().subscribe({
      
        next : ((res ) =>{
    
          this.businessTypes = res;
          this.dataService.setBusiness(res);
  
        } )
      })
  

    }

    

    
    this.utils = new UtilsForm(this.dataForm);
   
    this.checkBusinessCategory();
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.checkBusinessCategory();
      if (this.formService.existInfo()) {
        this.businessTypes = this.dataService.businessInfo;
        const dat = this.formService.recoverForm.client;
        this.dataForm.controls['nameRepresent'].setValue(dat?.nameRepresent);
      }
      
    }
  }
  
  

  public checkBusinessCategory():void{
    this.dataForm.get('categoryBusiness')?.valueChanges.subscribe({
      next: (val : string) => {
        this.dataService.businessOption.emit(val);
      }
    })
  }





  public isError(controlName : string , type : string):boolean{
    return this.utils.isError(controlName,type);
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


  public newNumber():void{
    this.addContact = !this.addContact;
    this.addValidatorsNumber();
  }

  public addValidatorsNumber():void{

    if(this.addContact){
      this.utils.getField('alterNumber').addValidators([Validators.required,Validators.minLength(10)]);
      this.utils.getField('alterNumber').updateValueAndValidity();
    }
    else{
      this.dataForm.get('alterNumber')?.reset();
      this.dataForm.get('alterNumber')?.updateValueAndValidity();
      this.dataForm.get('alterNumber')?.clearValidators();
      this.dataForm.get('alterNumber')?.updateValueAndValidity();
    }
  
  }

  public alphaNumberOnly ( e: any ):any{  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    


}

}