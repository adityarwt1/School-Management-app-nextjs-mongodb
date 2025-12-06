import mongoose from "mongoose";

export interface AttendanceInterface {
    studentId:mongoose.Types.ObjectId | string
    attend:boolean
    date:Date
    currentYear:Date
}


export interface AttednaceResponse{
    success:boolean
    error?: string
}