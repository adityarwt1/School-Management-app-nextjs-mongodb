import { SchoolRegisterRequest } from "@/interfaces/ApiResponse/School/registerSchool";
import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { NextRequest, NextResponse } from "next/server";

export async function  POST(req: NextRequest) :Promise<NextResponse<StanderedResponse>>{
    try {
        const {address,diseCode,from,govt,logo,pinCode,schoolName,to}:SchoolRegisterRequest = await req.json();

        // validatinv request
        if(!address || !diseCode || !from || typeof govt !== "boolean" || !logo || !pinCode || !schoolName || !to ){
            return NextResponse.json({success:false, error:"Field not provide properly!"},{status:400})
        }

        

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false, error: "Internal server issue." }, { status: 500 })
    }
}