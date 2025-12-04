import mongoose from "mongoose"

export interface getSchoolInfoResponse{
    success:boolean,
    error?:string
    school?:{
        _id:mongoose.Types.ObjectId | string,
        schoolName:string
    }
}