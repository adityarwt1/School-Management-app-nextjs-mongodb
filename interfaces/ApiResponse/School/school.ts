import { SchoolInterface } from "@/interfaces/School/SchoolInterface";

export interface SchoolRegisterRequest{
        logo:string,
        diseCode:number,
        schoolName:string, 
        pinCode:number
        address:string, 
        from :number | string, 
        to:number,
        govt:boolean, 
}

export interface GetSchoolInterfaceResponse {
  school?: SchoolInterface;
  success: boolean;
  error?: string;
}