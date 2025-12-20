import { Role } from "@/types/Role";
import mongoose from "mongoose";

export interface AttendanceInterface {
    _personId:mongoose.Types.ObjectId;
    date:Date,
    role:Role
    schoolId:mongoose.Types.ObjectId
}