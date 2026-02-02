import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Image, successFile } from '@interfaces';
import { FormService } from '@services';
import { IdentificacionOficial } from 'src/app/shared/interfaces/IdentificacionOficial';

@Component({
  selector: 'app-data-validation',
  templateUrl: './data-validation.component.html',
  styleUrls: ['./data-validation.component.scss']
})
export class DataValidationComponent implements OnInit{

  public indentityOptions: IdentificacionOficial[] = [
    {
      id: 0,
      nombre: "IFE/INE",
      numeroDoc: 2
    },
    {
      id: 1,
      nombre: "Pasaporte",
      numeroDoc: 1
    },
    {
      id: 2,
      nombre: "Cédula Profesional",
      numeroDoc: 1
    },
    {
      id: 3,
      nombre: "Cartilla de Servicio Militar",
      numeroDoc: 1
    },
  ];

  @Input() validationForm !: FormGroup; 
  @Input() formOption !: FormGroup;
  @Output() uploadFile = new EventEmitter<boolean>();
  @Output() resetFlag = new EventEmitter<boolean>();
  public showFile : boolean = false;
  public lastSelectData !: string;
  public showSimple: boolean = false;
  public showMultiple: boolean = false;
  public showMultipleINE: boolean = false;
  public showINE2: boolean = false;

  constructor(private formService : FormService){}

  ngOnInit(){
    if(this.formService.existInfo()){
      this.showFile = true;
    }
  }
 
  public checkOption(event : IdentificacionOficial):void{
    this.showFile = true;
    this.showMultipleINE = false;
    switch(event.id) {
      
      case 0:
        this.showINE2 = false;
        this.showMultiple = false;
        this.showSimple = false;
        this.showMultipleINE = true;
        this.lastSelectData = `${event.id}`;
        this.validationForm.get('fileTwo')!.clearValidators();
        this.validationForm.get('fileTwo')!.updateValueAndValidity();

        break;

      case 2:

        this.showSimple = false;
        this.showMultiple = true;
        this.lastSelectData = `${event.id}`;
        this.validationForm.get('fileTwo')?.addValidators(Validators.required);
        this.validationForm.get('fileTwo')!.updateValueAndValidity();

        break;

      default:

        this.showSimple = true;
        this.showMultiple = false;
        this.lastSelectData = `${event.id}`;
        this.validationForm.get('fileTwo')!.clearValidators();
        this.validationForm.get('fileTwo')!.updateValueAndValidity();

        break;
    }
    
  }

  public extractImg(image : boolean){
    this.uploadFile.emit(image);
  }

  public verifyStatus(status : boolean){
    if(status){
      this.resetFlag.emit(true);

    }
  }


  public resetImgs(): void {
    this.validationForm.get('fileOne')?.setValue("");
    this.validationForm.get('fileTwo')?.setValue("");
  }


  public reUpload(event: boolean, doc: number) {

    if (event) {

      switch (doc) {

        case 0:
          this.showINE2 = false;
          this.validationForm.get('fileOne')?.setValue("");
          this.validationForm.updateValueAndValidity();
          break;
        case 1:
          this.validationForm.get('fileTwo')?.setValue("");
          this.validationForm.updateValueAndValidity();
          break;
        case 2:
          this.validationForm.get('accountFile')?.setValue("");
          this.validationForm.updateValueAndValidity();
          break;
        case 3:
          this.validationForm.get('act')?.setValue("");
          this.validationForm.updateValueAndValidity();
          break;

        case 4:
          this.validationForm.get('fiscal')?.setValue("");
          this.validationForm.updateValueAndValidity();
          break;

      }
    }
  }

  public setSuccess(event: successFile): void {
    const { lastSelect, fileType } = event;

    switch (lastSelect) {

      //INE
      case "0":

        if (fileType === 0) {
          this.showINE2 = true;
          this.validationForm.get('fileOne')?.setValue("x"); this.validationForm.updateValueAndValidity();

        }
        else {
          this.validationForm.get('fileTwo')?.setValue("x"); this.validationForm.updateValueAndValidity();
        }

        break;
      //pasaport
      case "1":
        if (fileType === 0) {

          this.validationForm.get('fileOne')?.setValue("x"); this.validationForm.updateValueAndValidity();
        }

        break;
      //CEDULA
      case "2":

        if (fileType === 0) {
          this.validationForm.get('fileOne')?.setValue("x"); this.validationForm.updateValueAndValidity();

        }
        else {
          this.validationForm.get('fileTwo')?.setValue("x"); this.validationForm.updateValueAndValidity();
        }


        break;
      //cartilla
      case "3":

        if (fileType === 0) {
          this.validationForm.get('fileOne')?.setValue("x"); this.validationForm.updateValueAndValidity();

        }

        break;
      //estadocuenta
      case "4":

        if (fileType === 0) {

          this.validationForm.get('accountFile')?.setValue("x"); this.validationForm.updateValueAndValidity();
        }

        break;
      //acta
      case "5":

        if (fileType === 0) {
          this.validationForm.get('act')?.setValue("x"); this.validationForm.updateValueAndValidity();

        }

        break;

      case "6":

        if (fileType === 0) {
          this.validationForm.get('fiscal')?.setValue("x"); this.validationForm.updateValueAndValidity();

        }


        break;
    }

  }

}
