import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsForm } from '@models';
import { DataService, FormService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-commercial-form',
  templateUrl: './commercial-form.component.html',
  styleUrls: ['./commercial-form.component.scss']
})
export class CommercialFormComponent implements OnInit, OnChanges {

  @Input() commercialForm !: FormGroup;
  @Input() optionForm !: FormGroup;
  @ViewChild('search') searchCp !: ElementRef<HTMLInputElement>;
  @Input() name: any;
  public recoverSelected !: string;

  public suburbOptions : string[] = [];
  private utils !: any;
  private subscription = new Subscription();

  constructor(private dataService : DataService, private formService : FormService){}


  ngOnInit() {
    this.utils = new UtilsForm(this.commercialForm);
    if (this.formService.existInfo()) {
      const { postalCode } = this.formService.recoverForm.commercialAddress!;
      const { suburb } = this.formService.recoverForm.commercialAddress!;
      this.recoverSelected = suburb!;
      if (postalCode !== undefined && postalCode !== null && postalCode !== '') {
        this.commercialForm.get('postalCode')?.setValue(postalCode);
        this.subscription.add(
          this.dataService.getCpInfo(postalCode + '').subscribe(res => {

            if (res.success) {

              this.suburbOptions = res.colonias!;
              this.commercialForm.get('city')?.setValue(res.ciudad);
              this.commercialForm.get('state')?.setValue(res.estado);

            }

          })

        )
      }

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['name']) {
        if (this.formService.existInfo()) {
          const { postalCode } = this.formService.recoverForm.commercialAddress!;
          if (postalCode !== undefined && postalCode !== null && postalCode !== '') {
            this.commercialForm.get('postalCode')?.setValue(postalCode);
            this.subscription.add(
              this.dataService.getCpInfo(postalCode + '').subscribe(res => {

                if (res.success) {
                  this.suburbOptions = res.colonias!;
                  this.commercialForm.get('city')?.setValue(res.ciudad);
                  this.commercialForm.get('state')?.setValue(res.estado);
                }
              })
            )
          }
        }
        
      }
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

  public infoAddress():void{
    const cp = this.searchCp.nativeElement.value;
    if(cp.length === 5){
 
    this.subscription.add(
      this.dataService.getCpInfo(cp).subscribe(res => {
      
        if(res.success){
  
          this.suburbOptions = res.colonias!;
          this.commercialForm.get('city')?.setValue(res.ciudad);
          this.commercialForm.get('state')?.setValue(res.estado);
     
        }
  
      })

    )
    
  }
  }


}
