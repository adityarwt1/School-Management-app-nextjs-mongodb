import { PrincipleLoginRequest, PrincipleLogistResponse } from "@/interfaces/ApiResponse/Principle/loginprinciple";
import { PrincipleLoginFileter } from "@/interfaces/Filter/filterResponse";
import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import Principle from "@/models/Principle";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import School from "@/models/School";

export async function POST(req: NextRequest):Promise<NextResponse<PrincipleLogistResponse>> {
    try {
        // start here
        const data:PrincipleLoginRequest = await req.json()

        const filter:PrincipleLoginFileter ={}
        if(data.bcCode) {
            filter.bcCode = data.bcCode
        }else{
            filter.email = data.email
        }
        
        // connecting mongodb
        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const principleDoc = await Principle.findOne(filter).select("email bcCode password schoolId").lean()

        if(!principleDoc){
            return NextResponse.json({success:false, error:"Teacher record not found."},{status:404})
        }

        const isPasswordTrue = await bcrypt.compare(data.password, principleDoc.password)

        if(!isPasswordTrue){
            return NextResponse.json({success:false, error:"Wron password!"},{status:500})
        }

        // token setup
        const school = await School.findOne({principleId:principleDoc?._id}).select("_id  govt").lean()
        const tokenPayload: TokenInterface = {
          _id: principleDoc._id,
          role: "principle",
          schoolId: school ? school._id : null,
          govt: school ? school.govt : null,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string,{
            expiresIn: 30 * 24 * 60*60*1000,
            issuer:"Aditya rawat"
        });

        const cookie = await cookies()
        cookie.set("smaToken",token,{
            httpOnly:true,
            sameSite:"lax",
            path:"/",
            name:"smaToken"
        });


        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false,error: "Internal server issue." }, { status: 500 })
    }
}