import { AttendanceInterface } from "@/interfaces/Attendance/AttendaceInterface";
import mongoose, { Document, Schema } from "mongoose";

interface AttendanceDocument extends AttendanceInterface , Document {}


const AttendanceSchema:Schema<AttendanceDocument>= new Schema({
    studentId:{
        type:Schema.Types.ObjectId ,
        required:true
    },
    attend:{
        type:Boolean,
    },

    date:{
        type:Date,
        required:true
    },
    currentYear:{
        type:Date,
        required:true
    },

},{timestamps:true})

const Attendance = mongoose.models.Attendance || mongoose.model<AttendanceDocument>("Attendance", AttendanceSchema)

export default Attendance
