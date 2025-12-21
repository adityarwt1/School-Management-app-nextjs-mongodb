import { PaymentMode } from "@/types/Payment";
import mongoose from "mongoose";

export interface PaymentInterface{
    paymentMode:PaymentMode,
    remains:number,
    amount:number
    studentId:mongoose.Types.ObjectId
    schoolId:mongoose.Types.ObjectId;
}