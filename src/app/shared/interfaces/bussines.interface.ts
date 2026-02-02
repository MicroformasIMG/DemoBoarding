import { Tasa } from "./giro.interface";

export interface Business {
    id?:       string;
    nombre?:   string;
    tasa?: Tasa;
}
