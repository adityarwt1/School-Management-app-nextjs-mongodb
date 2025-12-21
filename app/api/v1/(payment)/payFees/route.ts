import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { TokenServices } from "@/services/Token/token";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest):Promise<NextResponse<StanderedResponse>> {
    const tokenServerices = new TokenServices()
    try {
        const tokenInfo = await tokenServerices.getTokenInfo() as TokenInterface

        if(!tokenInfo){
            return NextResponse.json({success:false,error:"Unotherized"},{status:401})
        }


        const body:PaymentAddress = await req.json()

        if(!body){
            return NextResponse.json({success:false, error:"Somenthing wen wrong", message:"Field not provide properly!"},{status:400})
        }

        
        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false,error:"Internal server issue."},{status:500})
        }

        const payMentFees = await Payment.create({...body, schoolId:tokenInfo.schoolId, studentId:tokenInfo._id})
        
        if(!payMentFees){
            return NextResponse.json({success:false, error:"Failed to pay!" , message:"Failed while creating document."},{status:400 })
        }
        return NextResponse.json({ success: true ,message:"Payment added successfully!" }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal server issue." }, { status: 500 })
    }
}