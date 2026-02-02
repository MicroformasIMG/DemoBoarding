import { Business } from "./bussines.interface";

export interface GeneralForm{
    
    contact ?: ContactForm;
    account ?: AccountForm;
    client ?: ClientForm;
    commercialAddress ?: CommercialAddress;
    validation ?: ValidationForm;
    contact1 ?: Contacts;
    contact2 ?: Contacts;
    contact3 ?: Contacts;
    contact4 ?: Contacts;
    productOption ? :Option;
    
    accountOpt ?: Option;
    validationOpt ?: Option;
    companyOpt ?: Option;
  
    contacts ?: boolean[];
    imContact ?: boolean;
    activeCedula ?: boolean;
    hasAccount ?: boolean;
    TELCEL ?: boolean;



}

export interface Option{
    opt : boolean | number;
}


export interface ContactForm{
    email ?: string;
}

export interface AccountForm{
    clabe ?: string;
    confirmClabe ?:string;
}

export interface ClientForm{

    nameRepresent ?: string, 
    contactNumber ?: string,
    alterNumber   ?: string,
    businessName ?: string,
    rfc ?: string,
    categoryBusiness ?: string,
    activity ?: string;

}

export interface CommercialAddress{

    street ?: string;
    postalCode ?: string | number;
    suburb ?: string; 
    city ?: string;
    state ?: string;
    monthFact ?:  number;
    monthTarget ?:  number; 
    monthVaucher ?:   number; 
    amex : boolean;

}


export interface ValidationForm{
    reference ?: string;
}

export interface Contacts{

    name ?: string;
    phone ?: string | number;
    email ?: string;
    fact ?: boolean,
    inst ?: boolean,
    acla ?: boolean,
    cont ?: boolean
    id ?: number;
    activities ?: string[];

}