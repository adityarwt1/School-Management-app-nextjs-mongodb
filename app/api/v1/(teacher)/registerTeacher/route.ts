import { TeacherRegisterResponse } from "@/interfaces/Teacher/register/TeacherRegisterResponse";
import { TeacherInterface } from "@/interfaces/Teacher/TeacherInterface";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest):Promise<NextResponse<TeacherRegisterResponse>> {
    try {
        const {bcCode,contactNumber,diseCode,fullName,password,profilePicture,schoolId}:TeacherInterface = await req.json();

        if(!bcCode || !contactNumber || !diseCode || !fullName || !password || !profilePicture || !schoolId){
            return NextResponse.json({error:"Field not provided properly!" , success:false})
        }
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." , success:false}, { status: 500 })
    }
}