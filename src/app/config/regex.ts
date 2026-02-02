export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const regexOnlyLetters = /^[a-zA-Z]+$/;
export const regexNumber = /^[0-9]+$/;
export const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
export const regexRFC = /^[A-Z-a-z]{3}\w{9}/;