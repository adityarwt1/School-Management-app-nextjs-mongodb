import { TeacherInterface } from "@/interfaces/Teacher/TeacherInterface";
import mongoose, { Document, Schema } from "mongoose";

interface TeacherDocument extends TeacherInterface, Document{}


const TeacherSchema:Schema<TeacherDocument> = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true
    },
    bcCode:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    schoolId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    diseCode:{
        type:Number,
        required:true
    },
    profilePicture:{
        type:String,
        default:"/images/profile.png"
    },
    classTeacher:{
        type:String,
        required:true
    }

},{timestamps:true})

const Teacher = mongoose.models.Teacher || mongoose.model<TeacherDocument>("Teacher" , TeacherSchema)

export default Teacher