"use client"
import { AttednaceResponse, AttendanceInterface } from "@/interfaces/Attendance/AttendaceInterface";

export async function attendStudent({studentId}:AttendanceInterface):Promise<AttednaceResponse> {

    try {
    const response = await fetch("/api/v1/attendStudent",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({studentId})
    });
    
    const data:AttednaceResponse = await response.json();
    return data
    } catch (error) {
        console.log((error as Error).message)

        return {
            success:false,
            error:"Interval server issue."
        }
    }
    
}