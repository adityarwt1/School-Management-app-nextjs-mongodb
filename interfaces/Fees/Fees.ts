import mongoose from "mongoose"
import { StanderedResponse } from "../ApiResponse/standeredResponse";

export interface FeesSchema{
    id?:string | mongoose.Types.ObjectId
    class:number,
    amount:number
    schoolId?:mongoose.Types.ObjectId | string
}

export interface UpdateFeesBody {
  _id: string;
  class?: number;
  amount?: number;
}


export interface FeesCardInterface{
    _id?:mongoose.Types.ObjectId | string
    amount:number,
    class:number
}

export interface FeesSchema{
  class:number,
  baseAmount:number
}
export interface CurrentFessSchema extends StanderedResponse{
  fees?:FeesSchema
}