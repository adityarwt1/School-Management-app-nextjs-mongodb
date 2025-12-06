import mongoose from "mongoose";

export interface AbsentInterface{
    _id:mongoose.Types.ObjectId | string
}


export interface AbsetResponse{
    success:boolean,
    error?:string
}