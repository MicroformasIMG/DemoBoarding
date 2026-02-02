import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeneralInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const token: string = JSON.parse(sessionStorage.getItem('x-token')!);
   
    let request = req;

    if (token && !req.url.includes('login')) {

    
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });

    }

    return next.handle(request);



  }
}