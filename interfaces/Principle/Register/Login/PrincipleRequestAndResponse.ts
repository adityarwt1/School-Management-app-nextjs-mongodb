export interface PrincipleLoginRequest{
    email:string
    password:string
}

export interface PrincipleLoginResponse{
    success:boolean
    error?:string
    token?:string
}