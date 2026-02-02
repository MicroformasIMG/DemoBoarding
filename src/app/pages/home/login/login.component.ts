import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm !: FormGroup;
  public logError : boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) { }

  ngOnInit() {
    this.loginForm = this.initForm();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  public sendInfo(): void {

    const { code, password } = this.loginForm.value;

    this.authService.login(code, password).subscribe((res)=> {

        if(res){
       
        this.router.navigateByUrl('/data');
      }
      else{
        this.logError = true;
      }
      
    },(err => {
      this.logError = true;
    }))
 


  }

  /**
 * Gets some part of reactive form
 * 
 * @param field name of form control
 * @returns field control
*/
  public getField(field: string): AbstractControl {
    return this.loginForm.get(field)!;
  }

  /**
 * Indicates if some field has touched, are dirty or invalid
 * @param field 
 * @returns Returns true if any condition is met
*/
  public touched(field: string): boolean {
    return this.getField(field)?.invalid && (this.getField(field)?.dirty || this.getField(field)?.touched);
  }

  /**
   * 
   * @param controlName form control name of input that I need get errors
   * @param type name of type error that I need to check
   * @returns true if exist some error
  */
  public error(controlName: string, type: string): boolean {
    return this.loginForm.controls[controlName].errors?.[type];
  }

  /**
 * 
 * @param controlName form control name of input that I need get errors
 * @param type name of type error that I need to check
 * @returns true if some has touched, are dirty or invalid, or has errors
 * 
 * @remarks This method is a combination of the error function and the touched function, because I need to catch the error once the user starts typing.
  */
  public isError(controlName: string, type: string) {
    return this.touched(controlName) && this.error(controlName, type);
  }

}
