import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TeacherRegisterInterface } from "@/interfaces/Teacher/TeacherInterfaces";
import { NextRequest, NextResponse } from "next/server";
import {hash} from "bcryptjs";
import { mongoconnect } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { TokentInteface } from "@/interfaces/Token/tokenInterface";
import School from "@/models/School";
import { JWTSERVICES } from "@/services/JWT/jwt";
import { CookieServices } from "@/services/Cookie/cookie";

export async function POST(req: NextRequest) :Promise<NextResponse<StanderedResponse>>{
    const jwtServices = new JWTSERVICES()
    const cookieServices = new CookieServices()
    try {
        // start here
        const data:TeacherRegisterInterface = await req.json()

        if(!data.bcCode || !data.contactNumber || !data.diseCode || !data.email || !data.fullName || !data.password){
            return NextResponse.json({success:false, error:"Field not provide properly!"},{status:400})
        }  
        
        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const isExist = await Teacher.findOne({diseCode:data.diseCode, bcCode:data.bcCode}).select("diseCode bcCode").lean();

        if(isExist){
            return NextResponse.json({success:false, error:"Teacher record already exist!"},{status:409})
        }

        const school = await School.findOne({diseCode:data.diseCode}).select("_id govt")

        if(!school){
            return NextResponse.json({success:false, error:"School not register yet!"},{status:404})
        }

        const hashedPassword = await hash(data.password, 10)
        const teacher = await Teacher.create({...data, password:hashedPassword , schoolId:school._id , govt:school.govt})

        if(!teacher){
            return NextResponse.json({success:false, error:"Failed to create teacher!"},{status:500})
        }

        const tokenPayload:TokentInteface = {
            _id:teacher._id,
            role:"teacher",
            schoolId:school._id,
            govt:school.govt
        } 
        const token = jwtServices.createToken(tokenPayload );

        if(!token){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const isSaved = await cookieServices.setCookie(token)

        if(!isSaved){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }


        return NextResponse.json({ success: true , message:"Teacher register successfull!"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." , success:false, message:(error as Error).message}, { status: 500 })
    }
}