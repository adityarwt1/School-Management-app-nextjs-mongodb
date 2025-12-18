import { GetSchoolInterfaceResponse } from "@/interfaces/ApiResponse/School/school";
import { mongoconnect } from "@/lib/mongodb";
import School from "@/models/School";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) : Promise<NextResponse<GetSchoolInterfaceResponse>>{
    try {
        const searchParams = req.nextUrl.searchParams
        const schoolId = searchParams.get("schoolId")

        if(!schoolId){
            return NextResponse.json({success:false, error:"School id not found in the params."},{status:400})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const school = await School.findOne({_id: schoolId})

        if(!school){
            return  NextResponse.json({success:false, error:"School not found."},{status:404})
        }


        return NextResponse.json({ success: true , school }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false,error: "Internal server issue." }, { status: 500 })
    }
}