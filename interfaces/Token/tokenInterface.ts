import { Role } from "@/types/role";
import mongoose, { Schema } from "mongoose";

export interface TokenInterface {
  _id: string | mongoose.Types.ObjectId | Schema.Types.ObjectId;
  role: Role;
}
