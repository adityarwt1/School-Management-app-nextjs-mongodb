"use client"

import { StudentLoginRequest } from "@/interfaces/Student/Login/requstInterface";
import { StudentLoginResponse } from "@/interfaces/Student/Login/responseInterface";

export async function loginStudent({ssmId , password}:StudentLoginRequest):Promise<StudentLoginResponse> {
    try {
        const response = await fetch("/api/v1/loginStudent",{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({ssmId, password})
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error as Error)
        return {
            success:false,
            error:"Internal server issue."
        }
    }
}