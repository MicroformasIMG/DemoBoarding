import { AbstractControl, AsyncValidatorFn, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class UtilsForm{

    private form !: FormGroup;

    constructor(formInput : FormGroup){
        this.form = formInput;
    }
    

    public getField(field : string):AbstractControl{
        return this.form?.get(field)!;
    }

    public touched(field : string):boolean{
        return this.getField(field)?.invalid && /*(this.getField(field)?.dirty);*/  this.getField(field)?.touched;
    }

    public error(controlName: string, type: string): boolean {
        return this.form?.controls[controlName].errors?.[type];
    }

    public isError(controlName : string , type : string){
        return this.touched(controlName) && this.error(controlName,type);
    }
    
}