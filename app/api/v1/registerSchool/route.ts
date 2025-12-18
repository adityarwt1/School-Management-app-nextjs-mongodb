import { SchoolRegisterRequest } from "@/interfaces/ApiResponse/School/registerSchool";
import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { mongoconnect } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { TokentInteface } from "@/interfaces/Token/tokenInterface";
import School from "@/models/School";

export async function  POST(req: NextRequest) :Promise<NextResponse<StanderedResponse>>{
    const cookie = await cookies()
    const signUpUrl= new URL('/signup', req.url)
    try {
        const data:SchoolRegisterRequest = await req.json();

        // validatinv request
        if(!data.address || !data.diseCode || !data.from || typeof data.govt !== "boolean" || !data.logo || !data.pinCode || !data.schoolName || !data.to ){
            return NextResponse.json({success:false, error:"Field not provide properly!"},{status:400})
        }
        
        const token = cookie.get("smaToken")?.value
        
        if(!token){
            return NextResponse.json({success:false, error:"Unotherized acccess."},{status:401})
        }

        const decoded = (jwt.verify(token, process.env.JWT_SECRET as string)) as TokentInteface;

        //validate role
        if(decoded.role !== "principle"){
            return NextResponse.json({success:false, error:"only principle can add school!"},{status:403})
        }
        if(!decoded._id){
            return NextResponse.json({success:false,error:"Invalid Token"},{status:400})
        }
        
                const  isConnected = await mongoconnect()
        
               if(!isConnected){
                    console.log("failed to connect database.")
                    return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
                }
        
            const exist = await School.findOne({diseCode:data.diseCode});

        if(exist){
             return NextResponse.json({success:false, error:"School already register with thi Dise Code."},{status:409})
        }
        const school = await School.create({ ...data, principleId :decoded._id});

        if(!school){
            return NextResponse.json({success:false, error:"Failed to create school"})
        }

        // cookie set to the cookie
        const newTokenPayload :TokentInteface={
            _id:decoded._id,
            role:"principle",
            schoolId:school._id
        }
        const asignedToken = jwt.sign(newTokenPayload, process.env.JWT_SECRET as string,{
            issuer:"Aditya rawat"
        })
        cookie.set("smaToken",asignedToken, {
            httpOnly:true,
        });

        return NextResponse.json({ success: true , token: asignedToken }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false, error: "Internal server issue." }, { status: 500 })
    }
}