import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentVerifierServicesService {

  private apiUrl = 'https://files-550847957163.us-central1.run.app/api/upload/'; // Reemplaza con tu URL base

  constructor(private http: HttpClient) { }

  uploadFileINE(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.apiUrl}/ine`, formData);
  }

  uploadFileConstancia(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/constancia`, formData);
  }

  uploadFileDomicilio(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/domicilio`, formData);
  }
}
