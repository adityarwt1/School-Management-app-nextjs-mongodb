import mongoose from "mongoose"

export interface SchoolInterface  {
    diseCode:number,
    schoolName:string, 
    pinCode:number
    address:string, 
    from :number | string, 
    to:number,
    govt:boolean, 
    logo:string
    principleId:string | mongoose.Types.ObjectId 
}

export interface SchoolRegisterResponse{
    succuss:boolean
    error?:string
    message?:string

}