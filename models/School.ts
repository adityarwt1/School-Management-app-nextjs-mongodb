import { SchoolInterface } from "@/interfaces/School/SchoolInterface";
import mongoose, { Document, Schema } from "mongoose";

interface SchoolDocument extends SchoolInterface , Document{}

const SchoolSchema:Schema<SchoolDocument> = new Schema({
    diseCode:{
        type:Number,
        required:[true, "pliease provide dise code"]
    },
    schoolName:{
        type:String,
        required:[true, "please provide school name."]
    },
    pinCode:{
        type:Number,
        required:[true, "please provide pincode"]
    },
    from:{
        type:String || Number,
        required: [true, "please provide wher school starget actully."]
    },
    to:{
        type:Number,
        required:[true, "wher school located"]
    },
    govt:{
        type:Boolean,
        default:false
    },
    principleId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    logo:{
        type:String,
        default:"/images/default.png"
    }
},{timestamps:true})

const School = mongoose.models.School || mongoose.model<SchoolInterface>("School" , SchoolSchema)

export default School