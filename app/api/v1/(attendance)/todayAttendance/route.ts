import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mongoconnect } from "@/lib/mongodb";
import Atttendace from "@/models/Attendance";
// import jwt from 'jsonwebtoken'
// import { TokenInterface } from "@/interfaces/Token/tokenInterface";
export async function GET(req: NextRequest) {
    try {
        const role = req.nextUrl.searchParams.get("role")
        const token = (await cookies()).get("smaToken")?.value
        
        if(!token || !role){
            return NextResponse.json({success:false, error:'User aunotherize'},{status:401})
        }

        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as TokenInterface

        const isConnected = await mongoconnect();

        if(!isConnected){
            return NextResponse.json({success:false, error:"Interanal server issue."},{status:500})
        }
        
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

        const attendace = await Atttendace.find({createdAt: {$gte: startOfToday,$lt: startOfTomorrow}, role})
        


        return NextResponse.json({ success: true , attendace }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." }, { status: 500 })
    }
}