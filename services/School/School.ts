"use client"
import { SchoolRegisterRequest } from "@/interfaces/ApiResponse/School/registerSchool";
import { SchoolRegisterResponse } from "@/interfaces/School/SchoolInterface";

export class SchoolApi {
    
    async registerSchool(data:SchoolRegisterRequest):Promise<SchoolRegisterResponse>{
        try {
            const response = await fetch("/api/v1/registerSchool",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const resdata : SchoolRegisterResponse = await response.json()
            return resdata
        } catch (error) {
            return {
                succuss:false,
                error:"Internal server issue.",
                message:(error as Error).message
            }
        }
    }
}