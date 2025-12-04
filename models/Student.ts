import { StudentInterface } from "@/interfaces/Student/StudentInterface";
import mongoose, { Schema } from "mongoose";

interface StudentDocument extends StudentInterface , Document{}

const StudentSchema:Schema<StudentDocument> = new Schema({
    fullName:{
        type:String,
        required:true
    },
    diseCode:{
        type:Number,
        required:true
    },
    currentClass:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true,
        maxlength:10
    },
    fatherName:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    adharCardNumber:{
        type:Number,
        required:true
    },
    ssmId:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"/images/profile.png"
    },
    schoolId:{
        type:Schema.Types.ObjectId,
        required:true
    }

},{timestamps:true})

const Student = mongoose.models.Student || mongoose.model<StudentDocument>("Student", StudentSchema)

export default Student