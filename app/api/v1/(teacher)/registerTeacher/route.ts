import { TeacherRegisterResponse } from "@/interfaces/Teacher/register/TeacherRegisterResponse";
import { TeacherInterface } from "@/interfaces/Teacher/TeacherInterface";
import { mongoconnect } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { Role } from "@/types/role";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest):Promise<NextResponse<TeacherRegisterResponse>> {
    try {
        const {bcCode,contactNumber,diseCode,fullName,password,profilePicture,schoolId , classTeacher}:TeacherInterface = await req.json();

        if(!bcCode || !contactNumber || !diseCode || !fullName || !password  || !schoolId || !classTeacher){
            return NextResponse.json({error:"Field not provided properly!" , success:false},{status:400})
        }

        // connect databse
        const isConnected = await mongoconnect()

        if(!isConnected){
            return  NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const exist = await Teacher.findOne({bcCode}).select("_id")

        if(exist){
            return NextResponse.json({error:"Teacher already exist!", success:false},{status:409})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const teacher  = await Teacher.create({bcCode, contactNumber, diseCode, fullName, password:hashedPassword, profilePicture , schoolId , classTeacher})

        if(!teacher){
            return NextResponse.json({error:"Failed to register!" , success:false},{status:500})
        }

        const tokenPayload = {
            _id:teacher._id,
            role:"teacher" as Role
        }

        const token = jwt.sign(tokenPayload , process.env.JWT_SECRET as string);

        (await cookies()).set("smaToken" , token)
        return NextResponse.json({ success: true , token}, { status: 200 })
    } catch (error) {
        console.log((error as Error).message)
        return NextResponse.json({ error: "Internal server issue." , success:false}, { status: 500 })
    }
}