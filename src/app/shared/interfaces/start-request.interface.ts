import { Business } from "./bussines.interface";

export interface Start{
     otsignNotificationOrigin?: String;
    country ?: string; //MX
    email ?: string;
    giro ?: string;
    id ?: number | string; //folio
    idTPV ?: number;
    is_amex ?: boolean;
    is_promociones ?:boolean;
    name ?: string;
    phone ?: number;
    razon_social ?: string; //nombre del negocio
    terminal : Terminal;
    tipo ?: string;
    tipo_persona ?: string; //FISICA
    tipo_venta_id ?: string;

}


export interface Terminal{

    nombreOrigen ?: null;
    numeroTerminales ?: number;
    origen ?: null;
    precio ?: number;
    rentaMensual ?: number;
    tieneInternet ?: boolean;
    url ?: null;
    dataConexiones : DataConexiones;

}

interface DataConexiones{
    id_producto : number | string;
    conectividad : Conectividad;

}

interface Conectividad{
    bluetooth ?: boolean;
    ethernet ?: boolean;
    wifi ?: boolean;
    GPRS : GPRS;
}

interface GPRS{
    movistar ?: boolean;
    telcel ?: boolean;

}