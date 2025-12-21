import { PaymentHistoryInterface } from "@/interfaces/PayMent/Payment";
import { TokenInteface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { TokenServices } from "@/services/Token/token";
import mongoose from "mongoose";
import {  NextResponse } from "next/server";

export async function GET() :Promise<NextResponse<PaymentHistoryInterface>> {
    const tokenServices  = new TokenServices()
    try {

        const tokenInfo = await tokenServices.getTokenInfo() as TokenInteface


        if(!tokenInfo || !tokenInfo._id || !tokenInfo.schoolId || tokenInfo.role !== "student"){
            return NextResponse.json({success:false, error:"Unotherized!"},{status:401})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({
                success:false,
                error:"Internal server issue.",
                message:"Failed to connect database"
            },{
                status:500
            })
        }

        // using mongodb aggregate return the histor of othe the payment
        const paymentHistory = await Payment.aggregate([
            {
                $match:{
                    schoolId:new mongoose.Types.ObjectId(tokenInfo.schoolId),
                    studentId:new mongoose.Types.ObjectId(tokenInfo._id)
                }
            },
            {
                $project:{
                    _id:1,
                    month:1,
                    amount:1,
                    remains:1,
                    createdAt:1,
                }
            },
            {
                $sort:{
                    month:-1
                }
            }
        ])
        return NextResponse.json(
          { success: true, paymentHistory },
          { status: 200 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:(error as Error).message, error: "Internal server issue." }, { status: 500 })
    }
}