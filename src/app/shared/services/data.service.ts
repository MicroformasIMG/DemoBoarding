import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { ENDPOINTS } from "@config/server-endpoints";
import { map, Observable } from "rxjs";
import {
  AddressResponse,
  Business,
  Cuota,
  Start,
  Request,
  TerminalResponse,
  File,
} from "@interfaces";
import { FirmaElectronica } from "../interfaces/firma.interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  public firma!: FirmaElectronica;
  public businessInfo!: Business[];
  public businessOption = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  public bussinesTypes(): Observable<Business[]> {
    return this.http.get<Business[]>(ENDPOINTS.BUSSINESS_TYPES);
  }

  public mapTasa(businessType: string): Business {
    const res = this.businessInfo.filter(
      (p: Business) => p.nombre === businessType
    );
    return res.pop()!;
  }
  public setBusiness(data: Business[]): void {
    this.businessInfo = data;
  }
  public getBusiness(): Business[] {
    return this.businessInfo;
  }
  public getTerminals(): Observable<TerminalResponse[]> {
    return this.http.get<TerminalResponse[]>(ENDPOINTS.TERMINALS);
  }

  public getCpInfo(cp: string): Observable<AddressResponse> {
    return this.http.get<AddressResponse>(`${ENDPOINTS.CP_INFO}${cp}`);
  }

  public uploadFile(img: File): Observable<number> {
    return this.http
      .post<HttpHeaders>(ENDPOINTS.UPLOAD_FILE, img, { observe: "response" })
      .pipe(
        map((res) => {
          return res.status;
        })
      );
  }

  public getCuotas(type: string): Observable<Cuota> {
    return this.http.get<Cuota>(`${ENDPOINTS.ESQUEMA}${type}/INALAMBRICA`);
  }

  public sendStartRequest(data: Start): Observable<any> {
    return this.http.post<any>(ENDPOINTS.START_REQUEST, data);
  }

  public sendOnbaseRequest(data: Request): Observable<any> {
    return this.http.post<any>(ENDPOINTS.ONBASE_REQUEST, data);
  }

  public validateRequest(fol: string): Observable<any> {
    return this.http.post(ENDPOINTS.VALIDATE_RQUEST, {
      id: fol,
    });
  }
}
