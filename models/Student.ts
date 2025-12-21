import { StudentInterface } from "@/interfaces/Student/Student";
import mongoose, { Document, Schema } from "mongoose";

interface StudentDocument extends StudentInterface, Document {}

const StudentSchema: Schema<StudentDocument> = new Schema(
  {
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "School",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    currentClass:{
      type:Number,
      required:true,
      min:1,
      max:12
      // enum:Object.values(Class)
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    aadharNumber: {
      type: Number,
      required: true,
    },

    panNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    ssmId: {
      type: Number,
      required: true,
    },

    diseCode: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    profilePicture: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    govt:{
      type:Boolean,
      required:true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Student =
  mongoose.models.Student ||
  mongoose.model<StudentDocument>("Student", StudentSchema);

export default Student;
