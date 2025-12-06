import { PrincipleLoginRequest, PrincipleLoginResponse } from "@/interfaces/Principle/Register/Login/PrincipleRequestAndResponse";
import { mongoconnect } from "@/lib/mongodb";
import Principle from "@/models/Principle";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { PrincipleInfoInterface } from "@/interfaces/Principle/Register/requestInterface";
import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import { cookies } from "next/headers";


export async function POST(req: NextRequest):Promise<NextResponse<PrincipleLoginResponse>> {
    try {
        const {email , password}:PrincipleLoginRequest = await req.json();

        if(!email || !password ){
            return  NextResponse.json({success:false, error:"field not provided!"},{status:400})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false, error:"Internal server issue."},{status:500})
        }

        const principle  = await Principle.findOne({email}).lean<PrincipleInfoInterface>()

        if(!principle){
            return NextResponse.json({success:false, error:"Principle Record not found!"},{status:404})
        }

        const isPassowrdTrue = await bcrypt.compare(password, principle.password);

        if(!isPassowrdTrue){
            return NextResponse.json({error:"Wrong password!",success:false} ,{status:400})
        }

        const tokenPayload:TokenInterface={
            _id:principle._id,
            role:"principle"
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string);

        (await cookies()).set("smaToken" , token)
        
        return NextResponse.json({ success: true , token }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue.", success:false }, { status: 500 })
    }
}