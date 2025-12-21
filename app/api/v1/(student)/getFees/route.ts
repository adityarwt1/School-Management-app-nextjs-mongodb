import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import { mongoconnect } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import { TokenServices } from "@/services/Token/token";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) :Promise<NextResponse>{
    const tokenServices = new TokenServices()
    const signInUrlForStudent = new URL('/studentLogin',req.url)
    try {
        const tokenInfo = await tokenServices.getTokenInfo()as TokenInterface

        if(!tokenInfo){
            return NextResponse.redirect(signInUrlForStudent);
        }

        if(!tokenInfo._id ){
            return NextResponse.json({success:false, message:"User id not found in the token!"})
        }

        const isConnected = await mongoconnect()

        if(!isConnected){
            return NextResponse.json({success:false,error:"Internal server issue." },{status:500}) 
        }
        

        const payments = await Payment.aggregate([
            {
                $match:{
                    schoolId:new mongoose.Types.ObjectId(tokenInfo.schoolId),
                    studentId:new mongoose.Types.ObjectId(tokenInfo._id)
                }
            },
            {
                $project:{
                    _id:1,
                    remains:1,
                    amount:1,
                    paymentMode:1,
                    createdAt:1
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            }
        ])

        return NextResponse.json({ success: true, payments }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal server issue." }, { status: 500 })
    }
}