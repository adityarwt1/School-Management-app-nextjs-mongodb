import { FeesInterface } from "@/interfaces/Fees/FeeInterface";
import mongoose, {  Schema } from "mongoose";


interface FeesDocument extends FeesInterface, Document{}

const FeesSchema :Schema<FeesDocument> = new Schema({
    paid:{
        type:Boolean,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    studentId:{
        type:Schema.Types.ObjectId
    }
},{timestamps:true})


const Fees = mongoose.models.Fees || mongoose.model<FeesDocument>("Fees" , FeesSchema)

export default Fees

