import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilsForm } from '@models';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {

  @Input() emailForm !:FormGroup
  private utils !: any;

  ngOnInit(): void {

    this.utils = new UtilsForm(this.emailForm);

  }

  public isError(controlName : string , type : string):boolean{
    return this.utils.isError(controlName,type);
  }
}
