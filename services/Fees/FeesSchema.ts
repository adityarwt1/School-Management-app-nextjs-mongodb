"use client"

import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { FeesSchema, UpdateFeesBody } from "@/interfaces/Fees/Fees";

export class FeesServices{
    async addFeesSchema(data:FeesSchema) :Promise<StanderedResponse>{
        try {
            const response = await fetch("/api/v1/addFeesSchem",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)

            })
            const resData:StanderedResponse = await response.json();
            return resData
        } catch (error) {
            return {
                success:false,
                error:"Internal server issue.",
                message:(error as Error).message
            }
        }
    }

    async editFeesSchema(data:UpdateFeesBody):Promise<StanderedResponse>{
        try {
            const response =await fetch("/api/v1/editFeesSchem",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            });

            const resData:StanderedResponse =await response.json()
            return resData;
        } catch (error) {
            return {
                success:false,
                error:"Internal server issue",
                message:(error as Error).message
            }
        }
    }
}