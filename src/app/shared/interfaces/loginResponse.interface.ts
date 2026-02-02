export interface LoginResponse {
    id?:              string;
    expediente?:      null;
    nombre?:          string;
    correo?:          string;
    password?:        string;
    resetToken?:      null;
    resetTokenLimit?: Date;
    folio ?: string;
}
