export interface Giro {
    id?:       string;
    nombre?:   string;
    tasa?: Tasa;
}

export interface Tasa {
    credit:        number;
    debit:         number;
    international: number;
    discover:      number;
    amex:          number;
}
