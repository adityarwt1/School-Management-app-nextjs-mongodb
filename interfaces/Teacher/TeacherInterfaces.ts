import mongoose from "mongoose";

export interface TeacherInterFace{
    schoolId:mongoose.Types.ObjectId | string
    fullName:string
    bcCode:string
    email:string
    password:string
    contactNumber:number,
    diseCode:number
}

export interface TeacherRegisterInterface {
  fullName: string;
  bcCode: string;
  email: string;
  password: string;
  contactNumber: number;
  diseCode: number;
}

export interface TeacherLoginInterface{
    bcCode?:string
    email?:string
    password:string
}

