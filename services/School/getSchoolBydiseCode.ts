"use client"
import { getSchoolInfoResponse } from "@/interfaces/School/getSchoolInfo";

export async function getSchoolInfoByDiseCode(diseCode:number):Promise<getSchoolInfoResponse> {
    try {
      const response = await fetch(
        `/api/v1/getSchoolbyDiseCode?diseCode=${diseCode}`
      );

      const data = await response.json();
      return data
    } catch (error) {
        console.log(error)
        return {
            success:false,
            error:"Internal server issue."
        }
    }

}