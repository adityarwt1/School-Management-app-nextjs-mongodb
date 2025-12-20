import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { StudentLoginInterface } from "@/interfaces/Student/Student";
import { TokentInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import Student from "@/models/Student";
import { CookieServices } from "@/services/Cookie/cookie";
import { JWTSERVICES } from "@/services/JWT/jwt";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest):Promise<NextResponse<StanderedResponse>> {
    const jwtServices = new JWTSERVICES()
    const cookieServies  = new CookieServices()
    try {
        const data:StudentLoginInterface = await req.json()
        console.log(data)
        if(!data){
            return NextResponse.json({success:false,error:"Field not provide successfully!"},{status:400})
        }

        const filter:{email?:string, ssmId?:number} ={}

        if(data.ssmId){
            filter.ssmId = Number(data.ssmId)
        }else{
            filter.email = data.email
        }
        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const student = await Student.findOne(filter).select("_id schoolId password govt").lean();

        if(!student){
            return NextResponse.json({success:false, error:"Student not register yet!, Register first."},{status:404})
        }

        const isPasswordTrue = await compare(data.password, student.password)

        if(!isPasswordTrue){
            return NextResponse.json({success:false, error:"Wrong password!"},{status:400})
        }

        const tokenPayLoad:TokentInteface={
            _id:student._id,
            role:"student",
            schoolId:student.schoolId,
            govt:student.govt
        }

        const token = jwtServices.createToken(tokenPayLoad)

        if(!token){
            return NextResponse.json({success:false, error:"Internal server issue!"},{status:500})
        }

        const isSavedToCookie = await cookieServies.setCookie(token)

        if(!isSavedToCookie){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        
        return NextResponse.json({ success: true , message:"Student login successfully!" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false, error: "Internal server issue." }, { status: 500 })
    }
}