import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Start } from '@interfaces';
import { AuthService, DataService, FormService } from '@services';
import { interval, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-e-signature',
  templateUrl: './e-signature.component.html',
  styleUrls: ['./e-signature.component.scss']
})
export class ESignatureComponent implements OnInit {

  public loading !: boolean;
  private subscription !: Subscription;
  constructor(private dataService : DataService , private formService : FormService , private authService : AuthService, private router : Router){}

  ngOnInit(): void {
    
    this.sendRequest();
   
    /*setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('firma/error');

    },1500);*/
  
  }
  
  public sendRequest(){

    this.loading = true;


    let onbaseRequest: Start = this.formService.builStartRequest();
    onbaseRequest['otsignNotificationOrigin'] = 'SMS';
    setTimeout(() => this.dataService.sendStartRequest(onbaseRequest).subscribe({
      next : ((_) => {
        this.dataService.sendOnbaseRequest(this.formService.buildOnBaseRequest()).subscribe(({
          next : ((_) => {
            this.loading = false;
            this.validateStatus();
          })
        }))
      })

    }),1500);
    
  }

  public sendRequestEmail(){

    this.loading = true;


    let onbaseRequest: Start = this.formService.builStartRequest();
    onbaseRequest['otsignNotificationOrigin'] = 'EMAIL';
    setTimeout(() => this.dataService.sendStartRequest(onbaseRequest).subscribe({
      next : ((_) => {
        this.dataService.sendOnbaseRequest(this.formService.buildOnBaseRequest()).subscribe(({
          next : ((_) => {
            this.loading = false;
            this.validateStatus();
          })
        }))
      })

    }),1500);
    
  }

  private validateStatus():void{
    const {folio} = this.authService.user;
     this.subscription = interval(5000).pipe(
      startWith(0),
      switchMap(() => this.dataService.validateRequest(folio!))
     ).subscribe((res) => {
     
      if(res['error-code'] === '01'){
        this.subscription.unsubscribe();
        this.router.navigateByUrl('firma/confirmacion');
      }
      if(res['error-code'] === '06'){
        this.subscription.unsubscribe();
        this.router.navigateByUrl('firma/error');
      }
     })
   }
  

}
