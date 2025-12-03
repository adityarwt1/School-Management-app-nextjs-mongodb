import mongoose from "mongoose"

export interface PrincipleInfoInterface{
    fullName:string,
    contactNumber:number,
    email:string
    password:string,
    _id:mongoose.Types.ObjectId | string
    
}