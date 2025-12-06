import mongoose from "mongoose"

export interface FeesInterface{
    paid:boolean
    amount:number
    studentId:mongoose.Types.ObjectId | string
}