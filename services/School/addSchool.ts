"use client"
import { RequestSchoolRegister } from "@/interfaces/School/registerSchoolRequest";
import { RegisterSchoolResponse } from "@/interfaces/School/registerSchoolResponse";

export async function addSchool({contactNumber ,diseCode ,email ,from ,pinCode ,schoolName ,to}:RequestSchoolRegister):Promise<RegisterSchoolResponse> {
    try {
        const response = await fetch("/api/v1/registerSchool",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({contactNumber, diseCode, email, from , pinCode, schoolName , to})
        });
        const data = await response.json()
        return data
    } catch (error) {
        return {success:false , error:(error as Error).message}
    }
}