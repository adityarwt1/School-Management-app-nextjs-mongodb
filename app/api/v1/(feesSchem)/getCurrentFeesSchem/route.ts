import { StatusCode } from "@/interfaces/ApiResponse/standeredResponse";
import { CurrentFessSchema } from "@/interfaces/Fees/Fees";
import { TokenInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { TokenServices } from "@/services/Token/token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) : Promise<NextResponse<CurrentFessSchema>>{
    const tokenServices = new TokenServices()
    try {
        const tokenInfo = await tokenServices.getTokenInfo() as TokenInteface

        if(!tokenInfo || !tokenInfo.schoolId || !tokenInfo._id){
            return NextResponse.json({
                success:false,
                status:401,
                error:"Unotherized",
                message:"User unotherized!",
            },{
                status:401
            })
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({
                status:StatusCode.INTERNAL_SERVER_ERROR,
                success:false,
                error:""
            })
        }
        const studentData = await
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." }, { status: 500 })
    }
}