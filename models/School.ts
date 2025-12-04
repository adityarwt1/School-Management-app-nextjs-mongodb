import { SchoolInterface } from "@/interfaces/School/SchoolInterface";
import mongoose, { Document, Schema } from "mongoose";

// importint interface from the diffrent file
interface SchoolDocument extends SchoolInterface, Document {
  principleId:mongoose.Types.ObjectId
}


const SchoolSchema: Schema<SchoolDocument> = new Schema(
  {
    diseCode: {
      type: Number,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    email:{
      type:String
    },
    principleId:{
      type:Schema.Types.ObjectId,
      required:true
    },
    from:{
      type:String || Number,
      required:true
    },
    to:{
      type:Number,
      required:true
    }
  },
  { timestamps: true }
);

const School =
  mongoose.models.School ||
  mongoose.model<SchoolDocument>("School", SchoolSchema);

export default School;
