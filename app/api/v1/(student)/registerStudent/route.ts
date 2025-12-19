import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TokentInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import School from "@/models/School";
import Student from "@/models/Student";
import { RegisterStudentOmit } from "@/omits/Student/student";
import { CookieServices } from "@/services/Cookie/cookie";
import { JWTSERVICES } from "@/services/JWT/jwt";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) :Promise<NextResponse<StanderedResponse>>{
    const jwtSevices = new JWTSERVICES()
    const cookieServices = new CookieServices()
    try {
        const data:RegisterStudentOmit = await req.json()

        if(!data){
            return NextResponse.json({success:false, error:"Filed not provided properly!"},{status:400})
        }

        const isConnected  = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Interanal server issue."},{status:500})
        }

        const isExist= await Student.findOne({ssmId:data.ssmId})

        if(isExist){
            return NextResponse.json({success:false, error:"Student already register!"},{status:409})
        }
        const school = await School.findOne({diseCode:data.diseCode}).select("_id").lean()

        if(!school){
            return NextResponse.json({success:false, error:"School not register currently!"},{status:400})
        }

        const hashPassword = await hash(data.password, 10)
        const student = await Student.create({...data, password:hashPassword, schoolId:school._id})

        if(!student){
            return NextResponse.json({success:false, error:"Failed to creat student!"},{status:500})
        }

        const tokenPayload :TokentInteface ={
            _id:student._id,
            role:"student",
            schoolId:school._id
        }

        const token = jwtSevices.createToken(tokenPayload);

        if(!token){
            return NextResponse.json({success:false, error:"Internal server issue.", message:"Failed to create token"},{status:500})
        }

        const isSavedToCookie = await cookieServices.setCookie(token)
        

        if(!isSavedToCookie){
            return NextResponse.json({success:false, error:"Interval server issue.", message:"Failed to Save cookie!"}, {status:500})
        }


        return NextResponse.json({ success: true , message:"Student register successfully!" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success:false,error: "Internal server issue." }, { status: 500 })
    }
}