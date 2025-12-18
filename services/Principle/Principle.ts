"use client"

import { PrincipleLoginRequest, PrincipleLogistResponse } from "@/interfaces/ApiResponse/Principle/loginprinciple";
import { PrincipleRegisteredRequest, PrincipleRegisterResponse } from "@/interfaces/ApiResponse/Principle/registerInterface";
import { PrincipleInfoInterface } from "@/interfaces/Principle/PrincipleInfoInterface";


export class PrincipleApi {
    // register prnciple 
 async registerPrinciple(
    data: PrincipleRegisteredRequest
  ): Promise<PrincipleRegisterResponse> {
    try {
      const response = await fetch("/api/v1/registerPrinciple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData: PrincipleRegisterResponse = await response.json();
      return resData;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: "Internal server issue.",
      };
    }
  }

  // login principple
  async loginPrinciple(data:PrincipleLoginRequest):Promise<PrincipleLogistResponse>{
      try {
        const response  = await fetch("/api/v1/principleLogin",{
          method: "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        })
        const resData :PrincipleLogistResponse = await response.json()
        return resData
      } catch {
        return {
          success:false,
          error:"Internal server issue."
        }
      }
  }


}
