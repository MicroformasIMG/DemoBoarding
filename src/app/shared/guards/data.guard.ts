import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, FormService } from '@services';

@Injectable({
  providedIn: 'root'
})
export class DataGuard implements CanActivate {
  constructor(private authService : AuthService, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.user){
        return true;
      }
    
    sessionStorage.clear();
    this.router.navigateByUrl('/');

    return false;

    }
  
}
