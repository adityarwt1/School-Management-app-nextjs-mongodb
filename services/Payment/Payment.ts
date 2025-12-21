"use client"

import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { PaymentAddInterface } from "@/interfaces/PayMent/Payment";

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
                message:(error as Error).message
            }
        }
    }
}