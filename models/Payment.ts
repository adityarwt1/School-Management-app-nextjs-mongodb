import mongoose, { Document, Schema } from "mongoose";
import { type PaymentInterface } from "@/interfaces/PayMent/Payment";
import {PaymentMode} from "@/types/Payment"
interface PaymentInterfaceDocument extends PaymentInterface, Document {}

const PaymentSchema: Schema<PaymentInterfaceDocument> = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      index:true,
      required: true,
      ref: "Student", // Add reference to Student model if needed
    },
    paymentMode: {
      type: String,
      required: true,
      enum:[PaymentMode.ONLINE , PaymentMode.OFFLINE], // Assuming PaymentMode is an enum
    },
    remains: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);


export const Payment = mongoose.model<PaymentInterfaceDocument>(
  "Payment",
  PaymentSchema
);
