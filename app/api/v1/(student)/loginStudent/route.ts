import { StudentLoginRequest } from "@/interfaces/Student/Login/requstInterface";
import { StudentLoginResponse } from "@/interfaces/Student/Login/responseInterface";
import { mongoconnect } from "@/lib/mongodb";
import Student from "@/models/Student";
import { NextRequest, NextResponse } from "next/server";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import { TokenInterface } from "@/interfaces/Token/tokenInterface";

export async function POST(req: NextRequest):Promise<NextResponse<StudentLoginResponse>> {
    try {
        // start here
        const {ssmId, password}:StudentLoginRequest = await req.json()
        if(!ssmId || !password){
            return NextResponse.json({error:'Fields not provided!' , success:false},{status: 400})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const student = await Student.findOne({ssmId}).lean();

        if(!student){
            return NextResponse.json({success:false, error:'Student no registered.'},{status:404})
        }

        const isCorrectedPassword = await bcrypt.compare(password,student.password );

        if(!isCorrectedPassword){
            return NextResponse.json({success:false, error:"Wrong Password."},{status:400})
        }

        const toknePayload:TokenInterface = {
            _id:student._id,
            role:"student"
        }

        const token = jwt.sign(toknePayload , process.env.JWT_SECRET as string);

        (await cookies()).set("smaToken" , token)
        return NextResponse.json({ success: true , token}, { status: 200 })
    } catch (error) {
        console.log((error as Error).message)
        return NextResponse.json({ success:false,error: "Internal server issue." }, { status: 500 })
    }
}