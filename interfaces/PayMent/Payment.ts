import { Months } from "@/enums/MonthEnut";
import { PaymentMode } from "@/types/Payment";
import mongoose from "mongoose";

export interface PaymentInterface{
    paymentMode:PaymentMode,
    remains:number,
    amount:number,
    month: Months,
    studentId:mongoose.Types.ObjectId
    schoolId:mongoose.Types.ObjectId;
}
export interface PaymentInterface{
    paymentMode:PaymentMode,
    remains:number,
    amount:number
}

