import { ResponseStudent } from "@/interfaces/Student/responseStudent";
import { StudentInterface } from "@/interfaces/Student/StudentInterface";
import { mongoconnect } from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
export async function POST(req: NextRequest):Promise<NextResponse<ResponseStudent>> {
    try {
        // start here
        const {address,adharCardNumber, contactNumber , currentClass ,diseCode ,fatherName,fullName,motherName ,password ,profilePicture,ssmId,schoolId}:StudentInterface = await req.json()

        if(!address || !adharCardNumber || !contactNumber || !currentClass || !diseCode || !fatherName || !fullName ||!motherName || !password || !profilePicture || !ssmId || !schoolId ){
            return NextResponse.json({error:"Field not provide properly!" , success:false},{status:400})
        }

        const isconnected = await mongoconnect()

        if(!isconnected){
            return NextResponse.json({success:false , error:"Internal server issue."},{status:500})
        }

        const exist = await Student.findOne({ssmId}).lean();

        if(exist){
            return NextResponse.json({error:"Student already exist!", success:false},{status:409})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const student = await Student.create({
          address,
          adharCardNumber,
          contactNumber,
          currentClass,
          diseCode,
          fatherName,
          fullName,
          motherName,
          password:hashedPassword,
          profilePicture,
          ssmId,
          schoolId,
        });

        const tokenPayload = {
            _id:student._id,
            role:"student"
        }

        const token = jwt.sign(tokenPayload , process.env.JWT_SECRET as string,{
            expiresIn: 7 * 24 * 60 * 60
        });

        (await cookies()).set("smaToken", token)
        return NextResponse.json({ success: true, token }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal server issue." }, { status: 500 })
    }
}