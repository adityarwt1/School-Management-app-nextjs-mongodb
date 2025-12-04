import mongoose from "mongoose"

export interface StudentInterface {
  fullName: string;
  diseCode: number;
  currentClass: string;
  contactNumber: number;
  fatherName: string;
  motherName: string;
  adharCardNumber: number;
  ssmId: number;
  address: string;
  profilePicture: string | ArrayBuffer;
  schoolId?: mongoose.Types.ObjectId;
  password: string;
}