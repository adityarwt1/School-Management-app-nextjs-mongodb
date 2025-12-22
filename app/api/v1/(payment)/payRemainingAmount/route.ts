import { StanderedResponse, StatusCode, StatusText } from "@/interfaces/ApiResponse/standeredResponse";
import { PayRemainingAmount } from "@/interfaces/PayMent/Payment";
import { mongoconnect } from "@/lib/mongodb";
import { Payment } from "@/models/Payment";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) :Promise<NextResponse<StanderedResponse>> {
    try {
        const body:PayRemainingAmount = await req.json()

        //validating body
        if(!body){
            return NextResponse.json({
                status:StatusCode.BAD_REQUEST,
                success:false,
                error:StatusText.BAD_REQUEST,
                message:"Body not provided properly!"
            },{
                status:StatusCode.BAD_REQUEST
            })
        
        }

        const isConnected = await mongoconnect()


        if(!isConnected){
            return NextResponse.json({
                status:StatusCode.INTERNAL_SERVER_ERROR,
                success:false,
                error:StatusText.INTERNAL_SERVER_ERROR,
                message:"Unable to connected databse!",
            },{
                status:StatusCode.INTERNAL_SERVER_ERROR
            })
        }


        // finding payMent in this is

        const paymentDocument  = await Payment.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(body._id),
                }
            },
            {
                $project:{
                    _id:1,
                    amount:1,
                    remains:1
                }
            }
        ])

        // if doeumnt not found
        if(!paymentDocument[0]){
            return NextResponse.json({
                status:StatusCode.NOT_FOUND,
                success:false,
                error:StatusText.NOT_FOUND,
                message:"Payment history not found in this document."
            },{
                status:StatusCode.NOT_FOUND
            })
        }

     const updatedDocument = await Payment.findOneAndUpdate(
       { _id: body._id },
       [
         {
           $set: {
             amount: { $add: ["$amount", Number(body.amount)] },
             remains: { $subtract: ["$remains", Number(body.amount)] }, 
           },
         },
       ],
       { new: true } // Return the updated document
     );

     if(!updatedDocument){
        return NextResponse.json({
            status:StatusCode.INTERNAL_SERVER_ERROR,
            success:false,
            error:StatusText.INTERNAL_SERVER_ERROR,
            message:"Failed to update payment"
        },{
            status:StatusCode.INTERNAL_SERVER_ERROR
        })
     }
        return NextResponse.json({ success: true , status:StatusCode.OK,message:"Payment updated successfully!" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({status:StatusCode.INTERNAL_SERVER_ERROR,success:false, error: "Internal server issue." }, { status: 500 })
    }
}