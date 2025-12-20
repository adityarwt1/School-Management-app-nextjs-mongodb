"use client"
import { StanderedResponse } from "@/interfaces/ApiResponse/standeredResponse";
import { StudenterRegisterInterface, StudentLoginInterface } from "@/interfaces/Student/Student";

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

    async loginStudent(data:StudentLoginInterface):Promise<StanderedResponse>{
        try {  
            console.log("login studen backend data" , data)
            const response = await fetch("/api/v1/loginStudent",{
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