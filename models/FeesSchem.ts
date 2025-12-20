import mongoose, { Document, Schema } from "mongoose";
import { type FeesSchema } from "@/interfaces/Fees/Fees"; // Adjust the import path

interface FeesDocument extends FeesSchema, Document {}

const FeesSchemaModel: Schema<FeesDocument> = new Schema(
  {
    class: {
      type: Number,
      required: true,
      min: 1,
      max: 12, // Adjust based on your school system
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "School", // Reference to School model if you have one
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
FeesSchemaModel.index({ class: 1, schoolId: 1 }, { unique: true }); // Ensures unique fees per class per school

export const Fees = mongoose.model<FeesDocument>("Fees", FeesSchemaModel);
