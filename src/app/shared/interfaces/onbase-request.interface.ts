import { Contacts } from "./forms.interface";

export interface Request{

    folio ?: string;
    id_ejecutivo ?: string;
    canal ?: string;
    informacionGeneral ?: InformacionGeneral;
    producto ?: Producto;
    listacontactos ?: Contacts[];
    isSelfContact ?: boolean;
    terminalSelected ?: Terminales;
    frontVersion ?: string;
    calle ?: string;
    colonia ?: string;
    cp ?: string | number;
    ciudad ?: string;
    estado ?: string;

}

export interface Terminales{
    id ?:number | string;
    nombre ?:string;
    descripcion? :string;
    precio?:number;
    comDebito?:number;
    comCredito?:number;
    comInternac?:number;
    rentaMes?:number;
    cadena64?:string;
    descuento?: number;
    cuotaAfil?: number;
    tipoProducto?: string | null;
  }

interface Producto {

    tipoProducto: string;
    tipoTerminal: string;
    tieneInternet: string;
    proveedorInternet: string;
    numeroTerminales: number;
    precio: number;
    rentaMensual: number;

}

interface InformacionGeneral {

    correo?: string;
    clabe?: string;
    aceptoUsoDatos?: boolean;
    urlNegocio?: string;
    nombreCompleto?: string;
    telefonoContacto?: string;
    telefonoContacto2?: string;
    nombreComercial?: string;
    rfc?: string;
    giro?: string;
    actividadPrincipal?: string;
    facturacionPromedioMensual?: number;
    facturacionPromedioTarjetas?: number;
    valorPromedioVaucher?: number;
    tiempoEntregaProducto?: string;
    referenciaComercio?: string;
    contado?: boolean;
    isos?: string;
    aMex?: string;

}