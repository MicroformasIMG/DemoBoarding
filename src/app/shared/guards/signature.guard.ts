import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormService } from '../services/form.service';

@Injectable({
  providedIn: 'root'
})
export class SignatureGuard implements CanActivate {
  constructor(private formService : FormService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.formService.emptyGeneralForm()){
      return false;
    }
    return true;
  }
  
}
