import { PrincipleInfoInterface } from "@/interfaces/Principle/Register/requestInterface";
import mongoose, { Document,  Schema } from "mongoose";

// importint old schema
interface PrincipleDocument extends PrincipleInfoInterface  , Document{}

const PrincipleSchema :Schema<PrincipleDocument> = new Schema({
    fullName:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    profilePhoto:{
        type:String,
        required:true
    }

},{timestamps:true})

const Principle = mongoose.models.Principle || mongoose.model<PrincipleDocument>("Principle" , PrincipleSchema)

export default Principle;