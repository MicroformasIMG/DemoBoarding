import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

export class CustomValidators{

    static  matchAccount(firstControl : string , secondControl : string):ValidatorFn{
      return (control : AbstractControl): ValidationErrors | null =>{
        const first = control.get(firstControl)!.value;
        const second = control.get(secondControl)!.value;
        if(first === second){
          return null;
        }
        else{
          return  {'noMatch': true};
        }
       
      }
    }


    static clabeValidator(authService : AuthService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          return authService.validateAccount(control.value).pipe(
            map(res => (res ? null : { isValid: true })),
          );
        };
    
      }
    

      static emailValidator(authService : AuthService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          return authService.validateEmail(control.value).pipe(
            map(res => (res ? { emailInvalid: true } : null)),
          );
        };
    
      }
}