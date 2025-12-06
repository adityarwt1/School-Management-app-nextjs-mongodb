import mongoose from "mongoose"

export interface TeacherInterface{
    _id:mongoose.Types.ObjectId | string
    fullName:string
    contactNumber:number
    bcCode:string
    password:string
    schoolId:mongoose.Types.ObjectId | string
    diseCode:number   
    profilePicture:string | ArrayBuffer  | null,
    classTeacher:string
}