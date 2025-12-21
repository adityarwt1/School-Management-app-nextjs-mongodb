"use client"

import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { TeacherLoginInterface, TeacherRegisterInterface } from "@/interfaces/Teacher/TeacherInterfaces";

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
                message:(error as Error).message,
                status:500
            }
        }
    }

    async loginTeacher(data:TeacherLoginInterface):Promise<StanderedResponse>{
        try {
            const response = await fetch("/api/v1/loginTeacher", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            const resData:StanderedResponse = await response.json()
            return resData;
        } catch (error) {
            return {
                success:false, 
                error:"Internal server issue!",
                message:(error as Error).message,
                status:500
            }
        }
    }
}