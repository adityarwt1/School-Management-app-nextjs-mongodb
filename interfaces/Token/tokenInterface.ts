import { Role } from "@/types/Role";
import mongoose from "mongoose";

export interface TokentInteface{
    _id:string | mongoose.Types.ObjectId
    role:Role,
    schoolId:string | mongoose.Types.ObjectId,
    govt:boolean | null
}