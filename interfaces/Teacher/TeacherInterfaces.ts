import mongoose from "mongoose";

export interface TeacherInterFace{
  _id:mongoose.Types.ObjectId
  schoolId:mongoose.Types.ObjectId | string
  fullName:string
  bcCode:string
  email:string
  password:string
  contactNumber:number,
  diseCode:number,
  govt:boolean
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

