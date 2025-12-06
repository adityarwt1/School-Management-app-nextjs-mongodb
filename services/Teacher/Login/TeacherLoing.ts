"use client"
import { TeacherLoginResponse } from "@/interfaces/Teacher/login/TeacherLoginReasponse";
import { TeacherLoginRequest } from "@/interfaces/Teacher/login/TeacherLoginRequest";

export async function loginTeacher({bcCode,password}:TeacherLoginRequest):Promise<TeacherLoginResponse> {

    try {
        const response = await fetch("/api/v1/loginTeacher",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({bcCode, password})
        });

        const data :TeacherLoginResponse = await response.json();
        return data
    } catch (error) {
        console.log(error)
        return {
            success:false,
            error:"Internal server issue"
        }
    }


    
}