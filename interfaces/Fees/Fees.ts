import mongoose from "mongoose"

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

