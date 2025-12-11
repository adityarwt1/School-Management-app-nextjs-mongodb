import mongoose from "mongoose"

export interface PrincipleInfoInterface{
    fullName:string,
    email:string
    bcCode:string
    profilePicture?:string
    password:string,
    schoolId:string | mongoose.Types.ObjectId
}