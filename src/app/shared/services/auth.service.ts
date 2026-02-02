import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENDPOINTS } from '@config/server-endpoints';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { emailResponse, Folio, LoginResponse, Password, passwordReset } from '@interfaces';
import { ValidateResponse } from '../interfaces/validate.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user !: LoginResponse;

  constructor(private http : HttpClient) { }

  public get user():LoginResponse{
    return this._user;
  }

  public login(username : string , password : string):Observable<boolean>{

    const body = new URLSearchParams();
    body.set('username',username);
    body.set('password',password);

    let options = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic '+ btoa(`${username}:${password}`)

      })
    };

    
    return this.http.post<LoginResponse>(ENDPOINTS.AUTH,body.toString(),options).pipe(
      tap((token: any) => sessionStorage.setItem('x-token',JSON.stringify(token.bearerToken))),
      switchMap((user : LoginResponse) => {
        return this.getFolio().pipe(
          tap((fol) => {
            this._user = {
              ...user,
              folio: fol.folio
            };
          }),
          map(res => { return res ? true : false; }),
          catchError(err => of(false)));
      })
    )
    
  }

  public getFolio():Observable<Folio>{
    return this.http.post<Folio>(ENDPOINTS.FOL,null);
  }


  public sendEmail(user : string):Observable<any>{
    
    return this.http.post<any>(`${ENDPOINTS.SEND_EMAIL}?usuario=${user}`,null);
  }

  public validateAccount(account : string): Observable<boolean>{
    const url = ENDPOINTS.CHECK_CLABE.replace('${clabe}', account);
    return this.http.post<ValidateResponse>(url,null).pipe(
      map((res : ValidateResponse) => { return res.cuentaValida ? res.cuentaValida : false}),
      catchError(err => of(false))
    )
  }

  public validateEmail(email : string): Observable<boolean>{
    return this.http.get<emailResponse>(`${ENDPOINTS.VERIFY_EMAIL}${email}`).pipe(
      map((res : emailResponse) => { return res.response ? res.response : false}),
      catchError(err => of(false))
    )

  }

  public resetPassword(info : passwordReset):Observable<Password>{
    return this.http.post<Password>(ENDPOINTS.RESET_PASSWORD,info);
   }
  
}
