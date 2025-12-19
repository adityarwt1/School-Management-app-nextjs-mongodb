"use client"

import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TeacherRegisterInterface } from "@/interfaces/Teacher/TeacherInterfaces";

export class TeacherApi{
    async registerTeacher(data:TeacherRegisterInterface):Promise<StanderedResponse>{
        try {
            const response = await fetch("/api/v1/registerTeacher",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const responseData :StanderedResponse = await response.json()
            return responseData
        } catch (error) {
            return {
                success:false,
                error:"Internal server issue.",
                message:(error as Error).message
            }
        }
    }
}