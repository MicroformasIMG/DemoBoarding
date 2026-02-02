import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, FormService } from '@services';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit{

  public fol !: string;
  public date  = Date.now();

  constructor(private router : Router, private authService : AuthService, private formService : FormService){}

  ngOnInit(): void {
    const {folio} = this.authService.user;
    this.fol = folio!;
  }

  public toLogin():void{
    sessionStorage.clear();
    this.formService.resetData();
    this.router.navigateByUrl('/');
  }



}
