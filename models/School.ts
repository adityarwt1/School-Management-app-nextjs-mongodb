import mongoose, { Document, Schema } from "mongoose";

export interface SchoolInterface extends Document {
  diseSchCode: string;
  schoolName: string;
  pincode: number;
  classFrm: number;
  classTo: number;
  stateName: string;
  districtName: string;
  blockName: string;
  email: string | null;
  address: string;
  schCatDesc: string;
  schLocRuralUrban: string;
  principleName:string,
  mobileNumber:number
}

const SchoolSchema: Schema<SchoolInterface> = new Schema(
  {
    diseSchCode: { type: String, required: true },
    schoolName: { type: String, required: true },
    pincode: { type: Number },

    classFrm: { type: Number },
    classTo: { type: Number },

    stateName: { type: String },
    districtName: { type: String },
    blockName: { type: String },

    email: { type: String, default: null },
    address: { type: String },

    schCatDesc: { type: String },
    schLocRuralUrban: { type: String},

    principleName:{
      type:String,
      required:true
    },
    mobileNumber:{
      type:Number
    }
  },
  { timestamps: true }
);

const School =
  mongoose.models.School ||
  mongoose.model<SchoolInterface>("School", SchoolSchema);

export default School;
