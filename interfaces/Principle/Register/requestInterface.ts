import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface PrincipleInfoInterface {
  _id?: mongoose.Types.ObjectId | string | Schema.Types.ObjectId;
  fullName: string;
  contactNumber: number;
  email: string;
  password: string;
  profilePhoto?: string;
}
