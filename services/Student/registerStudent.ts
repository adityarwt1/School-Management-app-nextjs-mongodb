"use client"
import { ResponseStudent } from "@/interfaces/Student/responseStudent";
import { StudentInterface } from "@/interfaces/Student/StudentInterface";

export async function registerStudent({address,adharCardNumber,contactNumber ,currentClass ,diseCode ,fatherName,fullName ,motherName ,profilePicture ,password ,ssmId,schoolId}:StudentInterface) :Promise<ResponseStudent>{
    try {
        const response = await fetch("/api/v1/registerStudent",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({address, adharCardNumber, contactNumber, currentClass, diseCode, fatherName, fullName, motherName, profilePicture, password, ssmId, schoolId})
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error as Error)
        return {
            success:false,
            error:"Internal server issue."
        }
    }
}