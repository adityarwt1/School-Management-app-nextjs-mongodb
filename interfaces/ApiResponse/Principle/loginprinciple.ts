import { StanderedResponse } from "../standeredResponse"

export interface PrincipleLoginRequest{
    bcCode?:number| string
    email?:string ,
    password:string
}

export interface PrincipleLogistResponse extends StanderedResponse{}
