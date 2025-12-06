import { AttednaceResponse, AttendanceInterface } from "@/interfaces/Attendance/AttendaceInterface";
import { mongoconnect } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { getCurrentYear } from "@/services/School/CurrentYear";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) :Promise<NextResponse<AttednaceResponse>>{
    try {
        // start here
        const {studentId}:AttendanceInterface  = await req.json();

        if( !studentId) {
            return NextResponse.json({success:false , error:"Field not provided!"},{status:400})
        }

        const isConnedted = await mongoconnect()

        if(!isConnedted){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }
        const currentYearFunc = getCurrentYear();
        const attendance = await Attendance.create({studentId: new mongoose.Types.ObjectId(studentId), currentYear:currentYearFunc, date:new Date(),attend:true})
        return NextResponse.json({ success: true, attendance}, { status: 200 })
    } catch (error) {
        console.log((error as Error).message)
        return NextResponse.json({ error: "Internal server issue.", success:false }, { status: 500 })
    }
}