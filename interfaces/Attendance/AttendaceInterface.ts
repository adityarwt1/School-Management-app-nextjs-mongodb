import mongoose from "mongoose";

export interface AttendanceInterface {
    studentId:mongoose.Types.ObjectId | string
    attend:boolean
    currentYear:string
}


export interface AttednaceResponse{
    success:boolean
    error?: string
}