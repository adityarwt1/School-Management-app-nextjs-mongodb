import mongoose from "mongoose";

export interface StudentInterface{
    schoolId:mongoose.Types.ObjectId
    fullName:string,
    fatherName:string,
    motherName:string,
    aadharNumber:number,
    panNumber:string
    ssmId:number,
    diseCode:number,
    address:string,
    email:string,
    profilePicture:string
    contactNumber:number
    password:string
}

export interface StudenterRegisterInterface {
  fullName: string;
  fatherName: string;
  motherName: string;
  aadharNumber: number;
  panNumber: string;
  ssmId: number;
  diseCode: number;
  address: string;
  email: string;
  profilePicture: string;
  contactNumber: number;
  password: string;
}

export interface StudentLoginInterface{
  email?:string,
  ssmId?:number,
  password:string,
}

