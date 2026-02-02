import { Injectable } from '@angular/core';
import { Cuota } from '../interfaces/cuota.interface';
import { AccountForm, ClientForm, CommercialAddress, ContactForm, Contacts, GeneralForm, Option, ValidationForm } from '../interfaces/forms.interface';
import { Request } from '../interfaces/onbase-request.interface';
import { Start } from '../interfaces/start-request.interface';
import { TerminalResponse } from '../interfaces/terminal.interface';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private generalForm : GeneralForm = {} as GeneralForm;
  private cuota : Cuota = {} as Cuota;
  private product : TerminalResponse = {} as TerminalResponse;
  private terminalsQuaintity : number = 0;
  private base64Document !: string;

  constructor(private authService : AuthService) { }

  public resetData():void{
    this.generalForm = {} as GeneralForm;
    this.cuota  = {} as Cuota;
    this.product = {} as TerminalResponse,
    this.terminalsQuaintity = 0;
  }
  public emptyGeneralForm():boolean{
    return Object.keys(this.generalForm).length <= 0;
  }
  public get recoverForm (): GeneralForm{
    return this.generalForm;
  }
  public get terminalQ(): number{
    return this.terminalsQuaintity;
  }

  public setTerminalsQunatity(q : number){
    this.terminalsQuaintity = q;
  }

  public setProduct(prod : TerminalResponse){
    this.product = prod;
  }

  public setPageState(cedula : boolean , imContact : boolean, hasAccount : boolean , telcel : boolean):void{
    this.generalForm.activeCedula = cedula;
    this.generalForm.imContact = imContact;
    this.generalForm.hasAccount = hasAccount;
    this.generalForm.TELCEL = telcel; 
  }

  public setCuota(cuota : Cuota){
    this.cuota = cuota;
  }

  public get Cuota():Cuota{
    return this.cuota;
  }

  public setNotContact(bool : boolean):void{
    this.generalForm.imContact = bool;
  }

  public setContactsBool(contacts : boolean[]){
    this.generalForm.contacts = contacts;
  }

  public setContactForm(data : ContactForm):void{
    this.generalForm.contact = data;
  }

  public setAccount(data : AccountForm):void{
    this.generalForm.account = data;
  }

  public setClient(data : ClientForm){
    this.generalForm.client = data;
  }

  public setCommercial(data : CommercialAddress){
    this.generalForm.commercialAddress = data;
  }

  public setValidation(data : ValidationForm){
    this.generalForm.validation = data;
  }

  public setAccountStatus(data : Option):void{
    this.generalForm.accountOpt = data;
  }
  public setValidationStatus(data : Option):void{
    this.generalForm.validationOpt= data;
  }
  public setCompanyStatus(data : Option):void{
    this.generalForm.companyOpt = data;
  }

  public setProductStatus(data : Option):void{
    this.generalForm.productOption = data;
  }

  public setContact(index : number ,data : Contacts){

    switch(index){
      case 0 : this.generalForm.contact1 = data; break;
      case 1 : this.generalForm.contact2 = data; break;
      case 2 : this.generalForm.contact3 = data; break;
      case 3 : this.generalForm.contact4 = data; break;
    }
  }

  public saveDataForm(contact : ContactForm , account : AccountForm, client : ClientForm, commercial : CommercialAddress , validation : ValidationForm):void{

   
    this.setContactForm(contact);
    this.setAccount(account);
    this.setClient(client);
    this.setCommercial(commercial);
    this.setValidation(validation);

    sessionStorage.setItem('info',JSON.stringify(true));
  }


  public existInfo():boolean{
    return Object.keys(this.generalForm).length > 0 ? true : false;
  }

  public builStartRequest(): Start {

    const {email} = this.generalForm.contact!;
    const {categoryBusiness, contactNumber, businessName, nameRepresent} = this.generalForm.client!;

    const quantity : number = this.terminalsQuaintity;
    const user = this.authService.user;
    const companyOption = this.generalForm.companyOpt?.opt;
    
    

    const info : Start = {
      id : user.folio,
      email : email, 
      giro  : categoryBusiness, 
      idTPV: 1,
      is_amex : true, 
      is_promociones: true,
      name : nameRepresent,
      phone : Number(contactNumber),
      razon_social : businessName,
      tipo_persona : "FISICA",
      tipo : "NONE",
      tipo_venta_id: "0",
      country : "MX" ,
      terminal : {
        tieneInternet: true,
        origen : null,
        nombreOrigen : null,
        url : null,
        numeroTerminales : quantity, //poner numero de terminales
        rentaMensual : 150, //checar renta mensual
        precio : 150, //poner el precio de la terminal,
        
        dataConexiones : {
          id_producto : Number(this.product.id)!, // poner id
          conectividad : {
            bluetooth : false,
            wifi : false,
            ethernet : false,
            GPRS : {
              movistar : companyOption == 0 ? true : false,
              telcel : companyOption == 1 ? true : false
            }
            
          },
         
          
        }
      },


    }

    return info;
    
  }

  public checksToString(contact : Contacts):string[]{
    let arr : string[] = [];
    const {fact,inst,acla,cont} = contact;
    if(fact){
      arr.push('CONTABILIDAD');
    }
    if(inst){
      arr.push('FACTURACION');
    }
    if(acla){
      arr.push('ACLARACIONES');
    }
    if(cont){
      arr.push('INSTALACION');
    }

    return arr;
  }

  public buildContactsArray(contacts : Contacts[]):Contacts[]{
    let contactsInternal : Contacts [] = [];

    if(contacts){
  
     let contactInternal : Contacts;
    
    /**for each contact build an interface that contains all info of that contact */
    contacts.forEach((contact,index) => {

      if(contact !== null){
        if(contact.name && contact.name!.length !== 0){

          contactInternal = {
            id : index,
            name : contact.name,
            email : contact.email,
            phone : contact.phone,
            activities : this.checksToString(contact)
          }
  
          contactsInternal.push(contactInternal);

        }
        
      }
    });

   }
   return contactsInternal;
  }

  public buildOnBaseRequest():Request{

    const {email} = this.generalForm.contact!;
    const imContact = this.generalForm.imContact;
    const telcel = this.generalForm.TELCEL;
    const {clabe} = this.generalForm.account!;
    const {categoryBusiness, rfc,contactNumber,alterNumber,businessName,activity,nameRepresent} = this.generalForm.client!;
    const {city,state, suburb, postalCode, street , monthFact, monthTarget,monthVaucher} = this.generalForm.commercialAddress!;
    const quantity : number = this.terminalsQuaintity;
    const user = this.authService.user;
    const {reference} = this.generalForm.validation!;
   
    const contacts : Contacts[] = [ this.generalForm.contact1!,this.generalForm.contact2!,this.generalForm.contact3!,this.generalForm.contact4!];
    
    const finalContacs = this.buildContactsArray(contacts);


    const info : Request = {

      folio: user.folio,
      id_ejecutivo: user.id,
      frontVersion: "1.2.2",
      canal : "SELECT",
      ciudad : city!,
      estado: state!,
      colonia : suburb!,
      cp : postalCode!,
      calle: street!,
      listacontactos: finalContacs,
      isSelfContact : imContact!,

      informacionGeneral : {
        aMex : "SI",
        aceptoUsoDatos : true,
        actividadPrincipal: activity!,
        clabe:clabe!,
        correo : email!,
        facturacionPromedioMensual: Number(monthFact)!,
        facturacionPromedioTarjetas: Number(monthTarget)!,
        giro : categoryBusiness!,
        nombreComercial:businessName!,
        nombreCompleto:nameRepresent,
        referenciaComercio: reference,
        rfc : rfc!,
        telefonoContacto : contactNumber!,
        telefonoContacto2 : alterNumber ? alterNumber : "",
        tiempoEntregaProducto : "Entrega el mismo día",
        urlNegocio: "",
        valorPromedioVaucher: monthVaucher!

      },
      producto : {
        numeroTerminales : quantity,
        precio : this.product.precio!,
        proveedorInternet:  telcel ? "telcel" : "movistar" ,
        rentaMensual : 150,
        tieneInternet: "true",
        tipoProducto: "Terminal Física",
        tipoTerminal: "Inalambrica"

      },
      terminalSelected:{
        id:this.product.id,
        nombre:this.product.nombre,
        descripcion:this.product.descripcion,
        precio:this.product.precio,
        comDebito:this.product.comDebito,
        comCredito:this.product.comCredito,
        comInternac: this.product.comInternac,
        rentaMes: this.product.precio,
        cadena64:this.product.cadena64,
        descuento:this.product.precio,
        cuotaAfil:0,
        tipoProducto:null,
      }

    };



    return info;


  }
}
