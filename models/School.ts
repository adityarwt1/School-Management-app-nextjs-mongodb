import { SchoolInterface } from "@/interfaces/School/SchoolInterface";
import mongoose, { Document, Schema } from "mongoose";

// importint interface from the diffrent file
interface SchoolDocument extends SchoolInterface, Document {}

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
  },
  { timestamps: true }
);

const School =
  mongoose.models.School ||
  mongoose.model<SchoolDocument>("School", SchoolSchema);

export default School;
