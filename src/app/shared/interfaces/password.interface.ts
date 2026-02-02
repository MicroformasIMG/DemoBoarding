export interface Password{
    username : string;
    password : string;
    token   ?: string;
    error   ?: string;
    success ?: boolean;
}

export interface passwordReset{
    username : string;
    password : string;
    token : string;
}