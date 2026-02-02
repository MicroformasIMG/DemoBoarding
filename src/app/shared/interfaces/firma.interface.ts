import { Terminal } from "./start-request.interface";


export interface FirmaElectronica {
    id              : string;
    name            : string;
    phone           : number;
    country         : string;
    email           : string;
    tipo            : string;
    giro            : string;
    is_amex         : boolean;
    tipo_persona    : string;
    razon_social    : string;
    is_promociones  : boolean;
    tipo_venta_id   : string;
    idTPV           : number;
    terminal        : Terminal;
}