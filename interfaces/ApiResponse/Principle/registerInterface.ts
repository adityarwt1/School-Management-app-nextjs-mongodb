import { StanderedResponse } from "../standeredResponse";

export interface PrincipleRegisteredRequest {
  fullName: string;
  email: string;
  bcCode: string;
  profilePicture?: string;
  password: string;
}

export interface PrincipleRegisterResponse extends StanderedResponse{
    token?:string
}