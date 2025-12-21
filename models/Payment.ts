import mongoose, { Document, Schema } from "mongoose";
import { type PaymentInterface } from "@/interfaces/PayMent/Payment";
import {PaymentMode} from "@/types/Payment"
import { Months } from "@/enums/MonthEnut";
interface PaymentInterfaceDocument extends PaymentInterface, Document {}

const PaymentSchema: Schema<PaymentInterfaceDocument> = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: "Student", // Add reference to Student model if needed
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
      enum: [PaymentMode.ONLINE, PaymentMode.OFFLINE], // Assuming PaymentMode is an enum
    },
    month: {
      type: Number,
      required: true,
      enum: Object.values(Months).filter(
        (value) => typeof value === "number"
      ),
    },
    amount: {
      type: Number,
      required: true,
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

PaymentSchema.index({ schoolId: 1, studentId: 1, createdAt: -1 });

export const Payment = mongoose.models.Payment ||  mongoose.model<PaymentInterfaceDocument>(
  "Payment",
  PaymentSchema
);
