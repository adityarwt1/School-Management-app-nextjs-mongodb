import { TeacherRegisterResponse } from "@/interfaces/Teacher/register/TeacherRegisterResponse";
import { TeacherInterface } from "@/interfaces/Teacher/TeacherInterface";
import { mongoconnect } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { Role } from "@/types/role";
export async function POST(req: NextRequest):Promise<NextResponse<TeacherRegisterResponse>> {
    try {
        const {bcCode,contactNumber,diseCode,fullName,password,profilePicture,schoolId}:TeacherInterface = await req.json();

        if(!bcCode || !contactNumber || !diseCode || !fullName || !password || !profilePicture || !schoolId){
            return NextResponse.json({error:"Field not provided properly!" , success:false})
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


        const teacher  = await Teacher.create({bcCode, contactNumber, diseCode, fullName, password, profilePicture , schoolId})

        if(!teacher){
            return NextResponse.json({error:"Failed to register!" , success:false},{status:500})
        }

        const tokenPayload = {
            _id:teacher._id,
            role:"teacher" as Role
        }

        const token = jwt.sign(tokenPayload , process.env.JWT_SECRET as string);

        (await cookies()).set("smaToken" , token)
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." , success:false}, { status: 500 })
    }
}