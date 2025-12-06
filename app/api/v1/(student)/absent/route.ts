import { AbsentInterface, AbsetResponse } from "@/interfaces/Attendance/Absent";
import { mongoconnect } from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest):Promise<NextResponse<AbsetResponse>> {
    try {
        // start here
        const {_id}:AbsentInterface = await req.json()
        if(!_id){
            return NextResponse.json({success:false, error:"adsf"},{})
        }

        const isConned = await mongoconnect()

        if(!isConned){
            return NextResponse.json({success:false, error:"Interval server isssue."},{status:500})
        }


       const attendance=  await Attendance.deleteOne({_id})

       if(!attendance){
        return NextResponse.json({success:true, error:"Already absent"},{status:200})
       }
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(( error as Error).message)
        return NextResponse.json({success:false, error: "Internal server issue." }, { status: 500 })
    }
}