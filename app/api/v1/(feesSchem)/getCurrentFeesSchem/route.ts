import { StatusCode, StatusText } from "@/interfaces/ApiResponse/standeredResponse";
import { CurrentFessSchema } from "@/interfaces/Fees/Fees";
import { TokenInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { Fees } from "@/models/FeesSchem";
import Student from "@/models/Student";
import { TokenServices } from "@/services/Token/token";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) : Promise<NextResponse<CurrentFessSchema>>{
    const searchParams = req.nextUrl.searchParams;
    const tokenServices = new TokenServices()
    let currentClass : number | null= Number(searchParams.get("class") )| 0;
    try {
        const tokenInfo = await tokenServices.getTokenInfo() as TokenInteface

        if(!tokenInfo || !tokenInfo.schoolId || !tokenInfo._id){
            return NextResponse.json({
                success:false,
                status:401,
                error:"Unotherized",
                message:"User unotherized!",
            },{
                status:401
            })
        }

        if(tokenInfo.role !== "student"){
            return NextResponse.json({
                status:StatusCode.FORBIDDEN,
                success:false,
                error:StatusText.FORBIDDEN,
                message:"User not login as the student or teacher"
            })
        }
        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({
                status:StatusCode.INTERNAL_SERVER_ERROR,
                success:false,
                error:""
            })
        }
    

        /// fiding student from the databse

        if(!currentClass){
         const  studentData = await Student.aggregate([
            {
              $match: {
                _id: new mongoose.Types.ObjectId(tokenInfo._id),
              },
            },
            {
              $project: {
                _id: 1,
                currentClass: 1,
              },
            },
            ]);
        
            currentClass = studentData[0].currentClass
             if(!studentData){
            return NextResponse.json({
                status:StatusCode.NOT_FOUND,
                success:false,
                error:StatusText.NOT_FOUND,
                message:"Please provide class as the search params"
            })
        }
          
        }
        
     const feesSchmea = await Fees.aggregate([
       {
         $match: {
           schoolId: new mongoose.Types.ObjectId(tokenInfo.schoolId),
           class: currentClass,
         },
       },
       {
         $project: {
           _id: 1,
           amount: 1,
         },
       },
     ]);
     const feesScheamResponse = feesSchmea[0]
     if (!feesScheamResponse) {
       return NextResponse.json(
         {
           status: StatusCode.NOT_FOUND,
           success: false,
           error:
             "Fees Scheam not added currently contact your class teacher to add them.",
           message: "Fess Not added by the school!",
         },
         {}
       );
     }

        // 
        return NextResponse.json(
          { status: StatusCode.OK, success: true, fees:feesScheamResponse , schoolId:tokenInfo.schoolId, currentClass },
          { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json({status:StatusCode.INTERNAL_SERVER_ERROR, success:false, error: "Internal server issue." }, { status: 500 })
    }
}