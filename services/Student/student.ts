"use client"
import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { StudenterRegisterInterface } from "@/interfaces/Student/Student";

export class StudentApi{
    async registerStudent(data:StudenterRegisterInterface):Promise<StanderedResponse>{
        try {
            const response = await fetch("/api/v1/registerStudent",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"true"
                },
                body:JSON.stringify(data)
            })

            const resData :StanderedResponse = await response.json();

            return resData
        } catch (error) {
            return {
                success:false,
                error:"Internal server issue.",
                message:(error as Error).message
            }
        }
    }
}