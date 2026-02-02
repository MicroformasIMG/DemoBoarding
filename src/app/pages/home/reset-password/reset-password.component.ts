import { Component, OnDestroy, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { regexPassword } from "@config/regex";
import { passwordReset } from "@interfaces";
import { AuthService } from "@services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit,OnDestroy {

  public show : boolean = false;
  public resetForm !: FormGroup;
  public title : string = "Ingresa nueva contraseña";
  private subscription = new Subscription();
  private user !: string;
  private token !: string;

  constructor(
    private readonly fb: FormBuilder,
    private route : ActivatedRoute,
    private authService : AuthService,
    private router : Router
  ) {}

  ngOnInit() {
    this.resetForm = this.createForm();
    this.getParams();
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**Gets the url information to later build the payload that requires the password reset*/
  public getParams():void{
    this.subscription.add(
      /**Get and set token and user contained in url*/
      this.route.queryParams.subscribe(res => {

        let { username , token} = res;
        this.token = token;
        this.user = username;
      })
    )
  }

  /** Buils the payload required to reset a password and use auth service to set that password 
   * 
   * @remarks It needs use two auth service methods,because when password was setted succesfully
   * is necesary to log with that password, and redirect to start component
  */
  public onSubmit(): void {
    /** Extract password writed */
    const { confirmPassword } = this.resetForm.value;
    /**Build interface that contains data for send*/
    const body : passwordReset = {
      username : this.user,
      password : confirmPassword,
      token : this.token
    }

    this.subscription.add(
      this.authService.resetPassword(body).subscribe(res => {
        if(res.success){
          this.authService.login(this.user,confirmPassword).subscribe(log => {
            if(log){
             
              this.router.navigateByUrl('/data');
            }
            else{
              return;
            }
          })
        }
      })
    )
  }
   /**
    * initialize reset form
    * @returns reset form
    */
  private createForm(): FormGroup {
    return this.fb.group({
      password: ['', [Validators.required,Validators.pattern(regexPassword),this.passwordMatch,Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchAccount]],
    },
    );
  }

  /**
   * 
   * @param controlName form control name of input that I need get errors
   * @param type name of type error that I need to check
   * @returns true if exist an error, else return false
   */
  public getErrorMessage(controlName: string, type: string): boolean {
    return this.resetForm.controls[controlName].errors?.[type];
  }

  /**
   * Custom validator, checks the match between first field and second field
   * 
   * @param control Takes the parameter automatically
   * @returns Object that contains error result, return null when don't exist error
   */
  public matchAccount(control: AbstractControl): { [key: string]: boolean } | null {
    if (control && (control.value !== null || control.value !== undefined)) {
      const account = control.value;
      const firstAccount = control.root.get('password');
      if (firstAccount) {
        const first = firstAccount.value;
        if(first.length !== 0){
          if (first !== account) {
            return { noMatch: true }
          }

        }
        
      }
    
    }

    return null;
  }
  
  /**
   * Custom Validator,checks the match between confirm password field and password field
   * 
   * @param control Takes the parameter automatically
   * @returns Object that contains error result, return null when don't exist error
   */
  public passwordMatch(control: AbstractControl): { [key: string]: boolean } | null {
    if (control && (control.value !== null || control.value !== undefined)) {
      const account = control.value;
      const firstAccount = control.root.get('confirmPassword');
      if (firstAccount) {
        const first = firstAccount.value;
        if(first.length !== 0){
          if (first !== account) {
            return { noMatch: true }
          }

        }
        
      }
    
    }

    return null;
  }

  /**
   * Gets some part of reactive form
   * 
   * @param field name of form control
   * @returns field control
   */
  public getField(field : string):AbstractControl{
    return this.resetForm.get(field)!;
  }
  /**
   * Indicates if some field has touched, are dirty or invalid
   * @param field 
   * @returns Returns true if any condition is met
   */
  public touched(field : string):boolean{
    return this.getField(field)?.invalid && (this.getField(field)?.dirty || this.getField(field)?.touched);
  }

  /**
   * 
   * @param controlName form control name of input that I need get errors
   * @param type name of type error that I need to check
   * @returns true if exist some error
   */
  public error(controlName: string, type: string): boolean {
    return this.resetForm.controls[controlName].errors?.[type];
  }

  /**
   * 
   * @param controlName form control name of input that I need get errors
   * @param type name of type error that I need to check
   * @returns true if some has touched, are dirty or invalid, or has errors
   * 
   * @remarks This method is a combination of the error function and the touched function, because I need to catch the error once the user starts typing.
   */
  public isError(controlName : string , type : string){
    return this.touched(controlName) && this.error(controlName,type);
  }


}