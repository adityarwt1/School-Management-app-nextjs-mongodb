import { TeacherInterFace } from "@/interfaces/Teacher/TeacherInterfaces";
import mongoose, { Schema } from "mongoose";

interface TeacherDocument  extends TeacherInterFace, Document {}

const TeacherSchema:Schema<TeacherDocument> = new Schema({
    bcCode:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    diseCode:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    schoolId:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true})

const Teacher = mongoose.models.Teacher || mongoose.model<TeacherDocument>("Teacher", TeacherSchema)

export default Teacher