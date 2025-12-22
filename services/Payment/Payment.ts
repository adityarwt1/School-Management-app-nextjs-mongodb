"use client"

import { StanderedResponse, StatusCode, StatusText } from "@/interfaces/ApiResponse/standeredResponse";
import { PaymentAddInterface, PaymentHistoryInterface, PayRemainingAmount } from "@/interfaces/PayMent/Payment";

export class PaymentServices {
    async payFees(data:PaymentAddInterface) :Promise<StanderedResponse> {
        try {
            const response = await fetch("/api/v1/payFees",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const resData:StanderedResponse = await response.json()
            return resData;
        } catch (error) {
            return {
                success:false,
                error:"Internal server issue.",
                message:(error as Error).message,
                status:500
            }
        }
    }

    async getPaymentHistory(): Promise<PaymentHistoryInterface>{
        try {
            const response = await fetch("/api/v1/getPaymentHistory",{
                method:"GET"
            });

            const resData:PaymentHistoryInterface = await response.json()

            if(response.status == 401 ){

            }
            return resData
        } catch (error) {
            return {
                success:false,
                error:"Internal server issue.",
                message:(error as Error).message,
                status:500
            }
        }
    }

    async payRemainingAmount(data:PayRemainingAmount) : Promise<StanderedResponse>{
        try {
            const response = await fetch("/api/v1/payRemainingAmount",{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            });
            const responseData:StanderedResponse = await response.json()

            return responseData;
        } catch (error) {
            return {
                status:StatusCode.INTERNAL_SERVER_ERROR,
                success:false,
                error:StatusText.INTERNAL_SERVER_ERROR,
                message:(error as Error).message
            }
        }
    }
}