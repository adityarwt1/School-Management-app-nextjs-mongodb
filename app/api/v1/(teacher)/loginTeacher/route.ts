import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TeacherInterFace, TeacherLoginInterface } from "@/interfaces/Teacher/TeacherInterfaces";
import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { CookieServices } from "@/services/Cookie/cookie";
import { JWTSERVICES } from "@/services/JWT/jwt";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) :Promise<NextResponse<StanderedResponse>>{
    const jwtServices = new JWTSERVICES()
    const cookiesServices = new CookieServices()
    try {
        const data:TeacherLoginInterface  = await req.json()

        if(!data.password){
            return NextResponse.json({success:false,error:"Field not provided!"},{status:400})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const filter:{
            email?:string,
            bcCode?:string
        } ={}

        if(data.email){
            filter.email = data.email
        }else{
            filter.bcCode = data.bcCode
        }

        const teacher = await Teacher.findOne(filter).select("_id email bcCode password schoolId govt").lean<TeacherInterFace>()

        if(!teacher){
            return NextResponse.json({success:false, error:'Teacher not foun!'},{status:404})
        }

        const isPasswordTrue = await compare(data.password, teacher.password)

        if(!isPasswordTrue){
            return NextResponse.json({success:false, error:"Wrong password!"},{status:404})
        }

        const tokenPayload:TokenInterface ={
            _id:teacher._id,
            role:"teacher",
            schoolId: teacher.schoolId,
            govt:teacher.govt

        }

        const token = jwtServices.createToken(tokenPayload)

        if(!token ){
            return NextResponse.json({success:false, error:"Internal server issue!"},{status:500})
        }

        const isSaved = await cookiesServices.setCookie(token)

        if(!isSaved){
            return NextResponse.json({success:false, error:"Internal server issue!"},{status:500})
        }

        return NextResponse.json({ success: true , message:"Teahcer login successfully!"}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,  error: "Internal server issue." }, { status: 500 })
    }
}