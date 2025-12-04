import { PrincipleInfoInterface } from "@/interfaces/Principle/Register/requestInterface";
import { PrincipleRegistrationResponse } from "@/interfaces/Principle/Register/responsePrincipleRegistration";
import { mongoconnect } from "@/lib/mongodb";
import Principle from "@/models/Principle";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(req: NextRequest):Promise<NextResponse<PrincipleRegistrationResponse>> {
    try {
        const {contactNumber , email  ,fullName , password}:PrincipleInfoInterface = await req.json();

        if(!contactNumber || !email ||!fullName || !password){
            return NextResponse.json({success:false , error:"Field not provided properly"}, {status:400})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false ,error:"Internal server issue." },{status:500})
        }
        
        // is already exist or not
        const exist = await Principle.findOne({email})

        if(exist){
            return NextResponse.json({success:false, error:"Already register please login!"},{status:409})
        }

        const hashePassoword  = await bcrypt.hash(password, 10);

        const principle = await Principle.create({fullName, contactNumber , email, password:hashePassoword}) 

        if(!principle){
            return NextResponse.json({error:"Failed to register." , success:false},{status:500})
        }

        // tokenn
        const tokenPayload ={
            _id:principle._id,
            role:"principle"
        }
        const token = jwt.sign(tokenPayload , process.env.JWT_SECRET as string , {
            expiresIn: 7 * 24 * 60 * 60 
        });

        (await cookies()).set("smaToken"   , token)

        return NextResponse.json({ success: true , token }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." , success:false}, { status: 500 })
    }
}