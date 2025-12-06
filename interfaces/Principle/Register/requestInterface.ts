import mongoose from "mongoose"

export interface PrincipleInfoInterface{
    _id:mongoose.Types.ObjectId | string
    fullName:string,
    contactNumber:number,
    email:string
    password:string,
    profilePhoto?:string
    
}