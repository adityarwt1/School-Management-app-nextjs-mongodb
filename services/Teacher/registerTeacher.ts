"use client"
import { TeacherRegisterRequest } from "@/interfaces/Teacher/register/TeacherRegisterRequest";
import { TeacherRegisterResponse } from "@/interfaces/Teacher/register/TeacherRegisterResponse";

export async function registerTeacher({bcCode,classTeacher,contactNumber,diseCode,fullName,password,schoolId}:TeacherRegisterRequest):Promise<TeacherRegisterResponse> {
    try {
        const response = await fetch("/api/v1/registerTeacher",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({bcCode, classTeacher, contactNumber, diseCode, fullName, password, schoolId})
        });
        const data:TeacherRegisterResponse = await response.json()
        return data 
    } catch (error) {
        console.log((error as Error).message)
        return {
            success:false,
            error:"Internal server issue."
        } as TeacherRegisterResponse
    }
}