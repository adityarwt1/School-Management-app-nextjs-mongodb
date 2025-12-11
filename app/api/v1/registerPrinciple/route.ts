import { PrincipleRegisteredRequest, PrincipleRegisterResponse } from "@/interfaces/ApiResponse/Principle/registerInterface";
import { TokentInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import Principle from "@/models/Principle";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";

export async function POST(req: NextRequest):Promise<NextResponse<PrincipleRegisterResponse>> {
    try {
        const {bcCode,email,fullName,password,profilePicture}:PrincipleRegisteredRequest  = await req.json()

        if(!bcCode || !email || !fullName || !password  || !profilePicture){
            return NextResponse.json({success:false, error:"Field not provided."},{status:400})
        }   
        // connecteing mongodb
        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        // already exist filter
        const existed = await Principle.findOne({bcCode})

        if(existed){
            return NextResponse.json({success:false, error:`Principle already register with BCCODE:${bcCode}`},{status:409})
        }

        // hasing password
        const hashePassword  = await bcrypt.hash(password, 10)
        const principle = await Principle.create({bcCode, email, fullName, password:hashePassword, profilePicture})

        // if failded to create the principle
        if(!principle){
            return NextResponse.json({success:false, error:"Failed to register!"},{status:500})
        }

       /// maing the token fo 
       const tokenPayload :TokentInteface={
        _id:principle._id,
        role:"principle",
        schoolId:principle.schoolId
       } 
       
       const token  = jwt.sign(tokenPayload, process.env.JWT_SECRET as string);

       (await cookies()).set("smaToken", token ,{
        httpOnly:true,
        sameSite:"lax",
       })
        
       
        return NextResponse.json({ success: true, token }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal server issue." }, { status: 500 })
    }
}