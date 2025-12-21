import { AttendanceInterface } from "@/interfaces/Attendance/Attendance";
import mongoose, { Document, Schema } from "mongoose";

interface AttendaceInterface extends AttendanceInterface , Document{}

const AttendaceSchema :Schema<AttendaceInterface>= new Schema({
    _personId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    schoolId:{
        types:Schema.Types.ObjectId,
    },
    date:{
        type:Date,
        required:true
    },
    role:{
        type:String,
    }
},{timestamps:true})

const Atttendace = mongoose.models.Attendance || mongoose.model<AttendaceInterface>("Attendace", AttendaceSchema)

export default Atttendace;