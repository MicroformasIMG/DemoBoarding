//const SERVER_URL = '/select';
                    
//PROD //const SERVER_URL = 'https://portalotrosbancos.com/medicos';

const SERVER_URL = 'https://bdemo.microformas.com.mx/select';

export const ENDPOINTS = {
  AUTH: `${SERVER_URL}/auth/login`,
  SEND_EMAIL: `${SERVER_URL}/auth/email-reset-password`,
  RESET_PASSWORD: `${SERVER_URL}/auth/reset-password`,
  CHECK_CLABE: SERVER_URL + "/onbase/cuentas/${clabe}/validar",
  BUSSINESS_TYPES: `${SERVER_URL}/onbase/giros`,
  TERMINALS: `${SERVER_URL}/onbase/terminales`,
  FOL: `${SERVER_URL}/onbase/folios`,
  VERIFY_EMAIL: `${SERVER_URL}/onbase/ejecutivo/correo/`,
  CP_INFO: `${SERVER_URL}/onbase/consulta-domicilio/`,
  ESQUEMA: `${SERVER_URL}/onbase/productos/cuotas/`,
  UPLOAD_FILE: `${SERVER_URL}/onbase/solicitudesFile`,
  START_REQUEST: `${SERVER_URL}/onbase/otpSign/start`,
  ONBASE_REQUEST: `${SERVER_URL}/onbase/solicitudes`,
  VALIDATE_RQUEST: `${SERVER_URL}/onbase/otpSign/validateByFolio`,
};
