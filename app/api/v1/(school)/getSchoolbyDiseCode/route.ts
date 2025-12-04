import { getSchoolInfoResponse } from "@/interfaces/School/getSchoolInfo";
import { mongoconnect } from "@/lib/mongodb";
import School from "@/models/School";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest):Promise<NextResponse<getSchoolInfoResponse>> {
    try {
        // start here
        const diseCode = req.nextUrl.searchParams.get("diseCode")

        if(!diseCode){
            return NextResponse.json({success:false , error:'Filed not provide'},{status:400})
        }

        const isConnected =await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const school = await School.findOne({diseCode}).select("_id schoolName");

        if(!school){
            return NextResponse.json({success:false , error:"School not found."},{status:404})
        }


        return NextResponse.json({ success: true , school }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal server issue." }, { status: 500 })
    }
}