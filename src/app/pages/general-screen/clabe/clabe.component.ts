import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { UtilsForm } from '@models';
import { AuthService } from '@services';


@Component({
  selector: 'app-clabe',
  templateUrl: './clabe.component.html',
  styleUrls: ['./clabe.component.scss'],
  
  
})
export class ClabeComponent {

  private utils !: any;

  @Input() clabeForm !: FormGroup;

  constructor(){}

  ngOnInit(){
    this.utils = new UtilsForm(this.clabeForm);
  }

  public isError(controlName : string , type : string){
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

}
