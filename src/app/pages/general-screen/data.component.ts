import { Component, OnInit } from '@angular/core';
import { AuthService, DataService, FormService } from '@services';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators, Status, UtilsForm } from '@models';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TerminalResponse } from 'src/app/shared/interfaces/terminal.interface';
import { AccountForm, Business, ClientForm, CommercialAddress, ContactForm, Giro, Option, ValidationForm } from '@interfaces';
import { regexEmail, regexNumber, regexOnlyLetters, regexRFC } from '@config/regex';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('0.5s cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class DataComponent implements OnInit {
  
  public account !: string;
  public hasAccount : boolean = false; //s-account
  public showLinks : boolean = false;
  public person !:number;
  private utils !: any;
  public generalForm !: FormGroup;
  public contacts : boolean[] = [true,false,false,false];;
  public firstImage : boolean = true;
  public imContact :boolean = false;
  public addContact : boolean = false;
  public products !: TerminalResponse[];
  public giros !: Giro[];
  public inAlambrica : boolean = false;
  public tasa: Business = { tasa: {debit:1.7, credit:2.2, international:3.99} } as Business;
  public isTelcel !: boolean;
  public numTerminals : number = 1;
  public existFile : boolean = false;
  public up : boolean = true;
  public down : boolean = false;
  public state: string = 'collapsed';
  public categorybusiness !: string;
  public isDesktop !: boolean;
  public checked : boolean = false;
  public showProducts : boolean = false;
  public recover: boolean = false;
  public addValidatorContactFlag : boolean = false;
  
  public status = new Status();

  constructor(private authService : AuthService,
              private router : Router, 
              private fb : FormBuilder,
              private dataService : DataService,
              private formService : FormService,
              private breakPointObserver:BreakpointObserver
               ){}

  ngOnInit(){
    this.generalForm = this.initForm();
    this.initProds();
    this.recoverInfo();
 
    this.utils = new UtilsForm(this.generalForm);
    this.dataService.businessOption.subscribe(res => { 
      this.categorybusiness = res!;
      this.tasa = this.dataService.mapTasa(res!);
      this.showProducts = true;
      this.dataService.getCuotas(res!).subscribe({
        next: (cuota) => this.formService.setCuota(cuota)
      })
    
    });
  }




  public toggle(): void {
    this.up = !this.up;
    this.down = !this.down;
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
    
  }




  public initProds(){
    this.dataService.getTerminals().subscribe({
      next: ((res) => {
        this.formService.setProduct(res[0]);
      })
    })
  }


  public recoverRadios(accountR : Option , validR : Option , companyR : Option):void{
    this.getGroupByName('accountOptions').patchValue({
      opt : accountR.opt
    });
    this.getGroupByName('validationOptions').patchValue({
      opt : validR.opt
    });
    this.getGroupByName('companyOptions').patchValue({
      opt : companyR.opt
    });

  }


  public recoverInfo():void{

    if(this.formService.existInfo()){
      this.recover = true;
      this.showProducts = true;
      const generalRecover = this.formService.recoverForm;

      this.hasAccount = true;
      this.firstImage = false;
      this.inAlambrica = true;
      this.numTerminals = this.formService.terminalQ;

      
      this.generalForm.patchValue({
        contact : generalRecover.contact,
        account : generalRecover.account,
        client : generalRecover.client,
        commercialAddress : generalRecover.commercialAddress,
        validation : generalRecover.validation,
        productOption: generalRecover.productOption

   
      })

      
      
      this.contacts = generalRecover.contacts!;
      this.recoverRadios(generalRecover.accountOpt!,generalRecover.validationOpt!,generalRecover.companyOpt!);
     
      
      if(generalRecover.imContact){
        this.imContact = generalRecover.imContact;
        
      }
      else{
        
        this.imContact = false;
        this.contacts = generalRecover.contacts!;
        this.generalForm.patchValue({

          
          contact1 : generalRecover.contact1,
          contact2 : generalRecover.contact2,
          contact3 : generalRecover.contact3,
          contact4 : generalRecover.contact4,
  
        })
      }
   
    }

  }


  public initForm():FormGroup{

    return this.fb.group({

      contact: this.fb.group({
        email: ['',[Validators.required, Validators.pattern(regexEmail)],[CustomValidators.emailValidator(this.authService)]]
      }),

      account : this.fb.group({
        clabe: ['',[Validators.required],[CustomValidators.clabeValidator(this.authService)]],
        confirmClabe : ['',[Validators.required]]
      },{
        validator: CustomValidators.matchAccount('clabe','confirmClabe')
      }),

      client : this.buildclientForm(),

      commercialAddress : this.builCommercialAddres(),

      validation : this.fb.group({
        reference : ['',[]],
        file : ['',[]],
        fileOne: ['', [Validators.required]],
        fileTwo: ['', []],
        fiscal:['',[]]
      }),

      contact1 : this.fb.group({
        name: ['',[Validators.required,Validators.minLength(3)]],
        phone: ['',[Validators.required,Validators.pattern(regexNumber)]],
        email: ['',[Validators.required,Validators.email]],
        fact: [],
        inst: [],
        acla: [],
        cont: []
  
      }),
      contact2 : this.builContact(),
      contact3 : this.builContact(),
      contact4 : this.builContact(),

      accountOptions: this.fb.group({ opt: ['', [Validators.required]] }),
      validationOptions: this.fb.group({ opt: ['',[Validators.required]],}),
      companyOptions: this.fb.group({ opt: ['', [Validators.required]] }),
      amexOption: this.fb.group({ opt: ['0'] }),
      productOption: this.fb.group({ opt: [''] }),
    
    });

  }



 


  public builCommercialAddres():FormGroup{

    return this.fb.group({
      street : ['',[Validators.required]],
      postalCode : ['',[Validators.required]],
      suburb : ['',[Validators.required]],
      city : ['',[Validators.required]],
      state : ['',[Validators.required]],
      monthFact : ['',[Validators.required]],
      monthTarget: ['',[Validators.required]],
      monthVaucher : ['',[Validators.required]],
 
    },{
      validators:[ this.checkFact(),this.otherFact()]
    })
  }


  public checkFact(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const month = control.get('monthFact')?.value;
      const target = control.get('monthTarget')?.value;


      if(month < target){
        return {'factError':true}
      }
      
      
      return null;
    }
  }

  public otherFact(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const month = control.get('monthFact')?.value;
      const target = control.get('monthVaucher')?.value;


      if(month < target){
        return {'otherFactError':true}
      }
      
      
      return null;
    }
  }




  public buildclientForm():FormGroup{
    return this.fb.group({
      nameRepresent : ['',[Validators.required,Validators.minLength(3)]],
      contactNumber : ['',[Validators.required,Validators.minLength(10),Validators.pattern(regexNumber)]],
      alterNumber   : ['',[]],
      businessName :  ['',[Validators.required,Validators.minLength(3), Validators.pattern(/^[^$%&*+\-=¿?¡!@#^~{}\|\\`:;<>.\/'"()\[\]]+$/)]],
      rfc : ['',[Validators.required,Validators.minLength(12),Validators.maxLength(13),Validators.pattern(regexRFC)]],
      categoryBusiness: ['',[Validators.required]],
      activity : ['',[Validators.required]],

    })
  }


  public builContact(): FormGroup {
    return this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      fact: [],
      inst: [],
      acla: [],
      cont: []

    });
  }


  public getGroupByName(name : string):FormGroup{
    return this.generalForm?.get(name) as FormGroup;
  }

  public isError(controlName : string , type : string):boolean{
    return this.utils?.isError(controlName,type);
  }

  public typeAccount(event : number):void{
    if(event === 1){
      this.hasAccount = false;
      this.showLinks = true;
    }
    else{
      this.hasAccount = true;
      this.showLinks = false;
    }
  }

  public typeDocumentBolean(event: boolean): void {
    if (this.hasAccount == true) { 
      this.addValidatorContactFlag = !this.addValidatorContactFlag;
    }
    
  }

  public toAccount():void{
    this.router.navigateByUrl('https://cuentadigital.santander.com.mx/pyme/#/');
  }

  public setContactStatus():void{

    this.formService.setContact(0,this.getGroupByName('contact1')?.value);
    this.formService.setContact(1,this.getGroupByName('contact2')?.value);
    this.formService.setContact(2,this.getGroupByName('contact3')?.value);
    this.formService.setContact(3,this.getGroupByName('contact4')?.value);
    this.formService.setContactsBool(this.contacts);
    this.formService.setNotContact(this.imContact);

  }


  public setRadioStatus():void{

    this.formService.setAccountStatus(this.getGroupByName('accountOptions')?.value);
    this.formService.setValidationStatus(this.getGroupByName('validationOptions')?.value);
    this.formService.setCompanyStatus(this.getGroupByName('companyOptions')?.value);
    this.formService.setProductStatus(this.getGroupByName('productOption')?.value);

  }

  public setFile(file : boolean):void{
      if(file){
        this.existFile = true;
      }
      

  }

  public resetFile(flag : boolean){

    if(flag){

      this.existFile = false;
     
    }
  }


  public sendData():void{
  
    const contact : ContactForm = this.getGroupByName('contact')?.value;
    const account : AccountForm = this.getGroupByName('account')?.value;
    const validation : ValidationForm = this.getGroupByName('validation')?.value;
    const client : ClientForm = this.getGroupByName('client')?.value;
    client.categoryBusiness = this.categorybusiness;
    const commercial : CommercialAddress = this.getGroupByName('commercialAddress')?.value;

    this.setContactStatus();

    this.formService.setTerminalsQunatity(this.numTerminals);

    this.setRadioStatus();
    this.formService.saveDataForm(contact,account,client,commercial,validation);
   
    this.router.navigateByUrl('/firma');
  }

  public statusTwo(status : boolean[]){
    
    this.status.setTwo(status);

  }
  public statusThree(status : boolean[]){
    this.status.setThree(status);

  }
  public statusFour(status : boolean[]){
    this.status.setfour(status);

  }
  public statusOne(status : boolean[]){
    this.status.setOne(status);

  }
  public addValidatorContact(contact : string):void{

    this.getGroupByName(contact)?.get('name')?.addValidators([Validators.required,Validators.pattern(regexOnlyLetters),Validators.minLength(3)]);
    this.getGroupByName(contact)?.get('name')?.updateValueAndValidity();
    this.getGroupByName(contact)?.get('phone')?.addValidators([Validators.required,Validators.minLength(10),Validators.pattern(regexNumber)]);
    this.getGroupByName(contact)?.get('phone')?.updateValueAndValidity();
    this.getGroupByName(contact)?.get('email')?.addValidators([Validators.required,Validators.pattern(regexEmail)]);
    this.getGroupByName(contact)?.get('email')?.updateValueAndValidity();
  }

  public removeValidatorContact(contact : string):void{

    this.getGroupByName(contact)?.get('name')?.clearValidators();
    this.getGroupByName(contact)?.get('name')?.updateValueAndValidity();
    this.getGroupByName(contact)?.get('phone')?.clearValidators();
    this.getGroupByName(contact)?.get('phone')?.updateValueAndValidity();
    this.getGroupByName(contact)?.get('email')?.clearValidators();
    this.getGroupByName(contact)?.get('email')?.updateValueAndValidity();

  }
  public checkaddTwo(event : any){

    this.contacts[1] = event;
    this.addValidatorContact('contact2');

  
  }

  public deletwTwo():void{
    this.removeValidatorContact('contact2');
    this.getGroupByName('contact2')?.reset();
    this.contacts[1] = false;
    
    
  
  }

  public checkaddThree(event: any):void{
    
    this.contacts[2] = true;
    this.addValidatorContact('contact3');

  }

  public deleteThree(event: any):void{
    this.removeValidatorContact('contact3');
    this.getGroupByName('contact3')?.reset();
    this.contacts[2] = false;
  }

  public checkaddFour(event : any){
    this.contacts[3] = true;
    this.addValidatorContact('contact4');
    
  }

  public deleteFour(event: any):void{
    this.removeValidatorContact('contact4');
    this.getGroupByName('contact4')?.reset();
    this.contacts[3] = false;
  }

  public activeProduct(event : boolean):void{
    if(event){
      this.inAlambrica = true;
    }
    
    
  }

  public campaignOptions(event : any){
    if(event === 0){
      this.isTelcel = true;
    }
    else{
      this.isTelcel = false;
    }
  }

  public noContact(event : MatCheckboxChange){
    if(event.source.checked){
      this.imContact = true;
     
      this.getGroupByName('contact1')?.reset();
      this.getGroupByName('contact2')?.reset();
      this.getGroupByName('contact3')?.reset();
      this.getGroupByName('contact4')?.reset();
      this.removeValidatorContact('contact1');
      this.status.resetAll();
      this.contacts = [true,false,false,false];
    
    }
    else{
      this.imContact = false;
      this.addValidatorContact('contact1');
  
    }
  }

  public addContacts():void{
    this.addContact = !this.addContact;
    this.imContact = !this.imContact;
  }

  public increment():void{
    this.numTerminals++;
  }

  public decrement():void{

    if(this.numTerminals > 1){
      this.numTerminals--;
    }
    
  }

  public getTasa(type: string): string {

    if (this.tasa != undefined && this.tasa.tasa != undefined) {
      switch (type) {
        case 'debit': return this.tasa.tasa.debit!.toString();
        case 'credit': return this.tasa.tasa.credit!.toString();
        case 'international': return this.tasa.tasa.international!.toString();
        default: return '';
      }
    }
    return '';
  }


}
