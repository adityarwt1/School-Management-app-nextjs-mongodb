import { PrincipleInfoInterface } from "@/interfaces/Principle/PrincipleInfoInterface";
import mongoose ,{Document, Schema}from "mongoose";

interface PrincipleDocument extends PrincipleInfoInterface, Document{}


const PrincipleSchema:Schema<PrincipleDocument> = new Schema({
    fullName:{
        type:String,
        required:[true, "Please provide principle name."]
    },
    bcCode:{
        type:String,
        required:[true, "Please provide the bc code."]
    },
    email:{
        type:String,
        required:[true, "Please provide email id."]
    },
    password:{
        type:String,
        required:[true, "Please provide passoword."]
    },
    profilePicture:{
        type:String,
        default:"/images/default.png"
    },
    schoolId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:"School"
    }
},{timestamps:true})

const Principle = mongoose.models.Principle || mongoose.model<PrincipleDocument>("Principle", PrincipleSchema)

export default Principle