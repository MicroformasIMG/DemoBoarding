import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentVerifierServicesService } from './services/document-verifier-services.service';
import {  FormService } from '@services';

@Component({
  selector: 'app-document-verifier',
  templateUrl: './document-verifier.component.html',
  styleUrls: ['./document-verifier.component.scss']
})
export class DocumentVerifierComponent {
  
  curp: string = '';
  domicilio: string = '';
  nombre: string = '';
  tipo: string = '';
  emisor: string = '';
  razon: string = '';
  isActiveine: boolean = false;
  isActivecon : boolean = false;
  isActivedom : boolean = false;
  @Output() selectedOption = new EventEmitter<boolean>();

  constructor(private documentVerifierServicesService: DocumentVerifierServicesService,  private formService : FormService) { }

  onFileSelected(event: any, type: any) {
    const file: File = event.target.files[0];
    this.curp = '';
    this.domicilio = '';
    this.nombre = '';
    this.tipo = '';
    this.emisor = '';
    this.razon = '';

    this.formService.setClient({ nameRepresent: '' });
    this.formService.setCommercial({ postalCode: '', amex: false });
    this.selectedOption.emit(true);
    if (file) {
      switch (type) {
        case 'ine':
          this.isActiveine = true;
          this.documentVerifierServicesService.uploadFileINE(file).subscribe(data => { 
            this.isActiveine = false;
            if (data['resultado']['valido'] === true) {
              this.curp = data['resultado']['datos']["curp"];
              this.domicilio = data['resultado']['datos']["domicilio"];
              this.nombre = data['resultado']['datos']["nombre"];
              this.tipo = data['resultado']["tipo"];
              const cp = this.domicilio.match(/\b\d{5}\b/);
              this.formService.setCommercial({ postalCode: cp ? cp[0] : " ", amex: false });
              this.formService.setClient({ nameRepresent: this.nombre });
              this.selectedOption.emit(true);
            } else { 
              this.razon = data['resultado']['razon'];
            }

           
          });
          break;
        case 'constancia':
          this.isActivecon = true;
          this.documentVerifierServicesService.uploadFileConstancia(file).subscribe(data => {
            this.isActivecon = false;
            if (data['resultado']['valido'] === true) {
              this.curp = data['resultado']['datos']["curp"];
              this.domicilio = data['resultado']['datos']["domicilio"];
              this.nombre = data['resultado']['datos']["nombre"];
              this.tipo = data['resultado']["tipo"];
              const cp = this.domicilio.match(/\b\d{5}\b/);
              this.formService.setCommercial({ postalCode: cp ? cp[0] : " ", amex: false });
              this.formService.setClient({ nameRepresent: this.nombre });
              this.selectedOption.emit(true);
            } else {
              this.razon = data['resultado']['razon'];
            }
          });;
          break;
        case 'domicilio':
          this.isActivedom = true;
          this.documentVerifierServicesService.uploadFileDomicilio(file).subscribe(data => {
            this.isActivedom = false;
            if (data['resultado']['valido'] === true) {
              this.curp = data['resultado']['datos']["curp"];
              this.domicilio = data['resultado']['datos']["domicilio"];
              this.nombre = data['resultado']['datos']["nombre_titular"];
              this.tipo = data['resultado']["tipo"];
              this.emisor = data['resultado']['datos']["emisor"];
              const cp = this.domicilio.match(/\b\d{5}\b/);
              this.formService.setCommercial({ postalCode: cp ? cp[0] : " ", amex: false });
              this.formService.setClient({ nameRepresent: this.nombre });
              this.selectedOption.emit(true);
            } else {
              this.razon = data['resultado']['razon'];
            }


          });;
          break;
        default:
          console.error('Tipo de archivo desconocido');
      }
    }
  }

}
