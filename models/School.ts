import mongoose, { Document, Schema } from "mongoose";

interface SchoolInterface extends Document {
  udiseSchCode: string;
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
  schLocRuralUrban: number;
  schCategoryType: string;
}

const SchoolSchema: Schema<SchoolInterface> = new Schema(
  {
    udiseSchCode: { type: String, required: true },
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
    schLocRuralUrban: { type: Number },

    schCategoryType: { type: String },
  },
  { timestamps: true }
);

const School =
  mongoose.models.School ||
  mongoose.model<SchoolInterface>("School", SchoolSchema);

export default School;
