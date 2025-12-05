import mongoose from "mongoose"

export interface TeacherInterface{
    fullName:string
    contactNumber:number
    bcCode:string
    password:string
    schoolId:mongoose.Types.ObjectId | string
    diseCode:number   
    profilePicture:string | ArrayBuffer 
}