import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnDestroy {

  public loading : boolean = true;
  public showError : boolean = false;
  public error !: string;
  public loader : boolean = false;
  private user : string = "";
  public title : string = "Recuperación de contraseña";
  private subscription = new Subscription();

  /**reference to email recover input*/
  @ViewChild('recover') someInput  !: ElementRef;

  constructor(private authService : AuthService , private router : Router){}



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** Gets the value of input email using viewchild then use auth service for send email
   * 
   * @remarks While waiting for response ,loader is active, when has a success response, sets
   * loading's flag to false. If error ocurred, it activates show error flag and save that error.
  */
   public sendEmail():void{ 
    
    this.user = this.someInput.nativeElement.value;
   
    this.subscription.add(
      this.authService.sendEmail(this.user).subscribe(res => {
        if(res.success){
          this.loading = false;
        }
        else{
          this.showError = true;
          this.error = res.error!;
        }
        
      })
    );
   }

   /** Re-sends email*/
  public tryEmail():void{
    this.loader = true;
    this.subscription.add(
      this.authService.sendEmail(this.user).subscribe(res => {
        if(res){
          this.loader = false;
        }
      })
    );
    
  }

  public redirect():void{
    this.router.navigateByUrl('/'); 
  }
    



}
