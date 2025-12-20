import mongoose from "mongoose"

export interface PrincipleInfoInterface{
    fullName:string,
    email:string
    bcCode:string
    profilePicture?:string
    password:string,
    schoolId:string | mongoose.Types.ObjectId,
    govt:boolean
}

export interface PrincipleCardInterface{
    email:string,
    bcCode:string
    profilePicture:string
    fullName:string
    _id:string | mongoose.Types.ObjectId
    schoolId:string | mongoose.Types.ObjectId
}