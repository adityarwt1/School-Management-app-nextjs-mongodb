import { Months } from "@/enums/MonthEnut";
import { PaymentMode } from "@/types/Payment";
import mongoose from "mongoose";
import { StanderedResponse } from "../ApiResponse/standeredResponse";

export interface PaymentInterface{
    paymentMode:PaymentMode,
    remains:number,
    amount:number,
    year:number
    month: Months,
    studentId:mongoose.Types.ObjectId
    schoolId:mongoose.Types.ObjectId;
}
export interface PaymentAddInterface {
  paymentMode: PaymentMode | null;
  remains: number;
  amount: number;
  year: number;
  month: Months;
}

export interface PaymentHistory{
  _id:string | mongoose.Types.ObjectId
  month:number,
  amount:number,
  remains:number,
  createdAt:Date
}
export interface PaymentHistoryInterface extends StanderedResponse {
  paymentHistory?: PaymentHistory[]
}