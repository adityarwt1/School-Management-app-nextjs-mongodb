import { RequestSchoolRegister } from "@/interfaces/School/registerSchoolRequest";
import { RegisterSchoolResponse } from "@/interfaces/School/registerSchoolResponse";
import { mongoconnect } from "@/lib/mongodb";
import School from "@/models/School";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse<RegisterSchoolResponse>> {
    try {
        // start here
        const {diseCode, schoolName, pinCode, contactNumber }:RequestSchoolRegister = await req.json()

        if(!diseCode || !schoolName || !pinCode || !contactNumber){
            return NextResponse.json(
              { error: "Field not provided properly.", success: false },
              { status: 400}
            );
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({error:"internel server issue", success:false},{status:500})
        }

        const existingSchool = await School.findOne({diseCode})

        if(existingSchool){
            return NextResponse.json({error:"School already exists!", success:false},{status:409})
        }
        const school = await School.create({diseCode, schoolName, pinCode, contactNumber })

        if(!school){
            return NextResponse.json({error:"Failed to add School" , success:false},{status:500})
        }

        return NextResponse.json({ success: true , school  }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue.", success:false }, { status: 500 })
    }
}