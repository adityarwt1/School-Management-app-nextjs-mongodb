import { Role } from "@/types/role"
import mongoose from "mongoose"

export interface TokenInterface{
    _id:string | mongoose.Types.ObjectId
    role:Role
}