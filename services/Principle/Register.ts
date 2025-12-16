"use client"

import { PrincipleRegisteredRequest, PrincipleRegisterResponse } from "@/interfaces/ApiResponse/Principle/registerInterface";


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
}
