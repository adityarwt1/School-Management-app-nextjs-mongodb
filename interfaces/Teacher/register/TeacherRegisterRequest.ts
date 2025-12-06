import mongoose from "mongoose"

export interface TeacherRegisterRequest{
    bcCode:string,
    contactNumber:number
    diseCode:number
    fullName:string
    password:string
    schoolId:string | mongoose.Types.ObjectId
    classTeacher:string
}