import { TeacherLoginResponse } from "@/interfaces/Teacher/login/TeacherLoginReasponse";
import { TeacherLoginRequest } from "@/interfaces/Teacher/login/TeacherLoginRequest";
import { TeacherInterface } from "@/interfaces/Teacher/TeacherInterface";
import { mongoconnect } from "@/lib/mongodb";
import Teacher from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
export async function POST(req: NextRequest):Promise<NextResponse<TeacherLoginResponse>> {
    try {
        const {bcCode,password}:TeacherLoginRequest = await req.json() 

        if(!bcCode || !password ){
            return NextResponse.json({error:"Field not provided Properly" , success:false},{status:400})
        }

        const isconnected   = await mongoconnect()

        if(!isconnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const teacher = await Teacher.findOne({bcCode}).lean<TeacherInterface>();

        if(!teacher){
            return NextResponse.json({success:false, error:"Teacher record not found!"},{status:404})
        }

        const isPasswordTrue = await bcrypt.compare(password , teacher.password);

        if(!isPasswordTrue){
            return NextResponse.json({success:false, error:"Wrong password!"},{status:400})
        }

        const tokenPayload:TokenInterface  = {
            _id:teacher._id ,
             role:"teacher"
        } 

        const token = jwt.sign(tokenPayload , process.env.JWT_SECRET as string,{
            expiresIn:7 * 24  * 60 * 60
        }) ;

        (await cookies()).set("smaTokon" , token)

        return NextResponse.json({ success: true , token }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false, error: "Internal server issue." }, { status: 500 })
    }
}