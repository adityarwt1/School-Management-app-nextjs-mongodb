import { PrincipleLoginRequest, PrincipleLoginResponse } from "@/interfaces/Principle/Register/Login/PrincipleRequestAndResponse";

export async function loginPrinciple({email,password}:PrincipleLoginRequest):Promise<PrincipleLoginResponse> {

    try {
        const response = await fetch("/api/v1/loginPrinciple",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email, password})
        });

        const data :PrincipleLoginResponse  = await response.json()
        return data
    } catch (error) {
        console.log((error as Error).message)
        return {
            success:false,
            error:"Internal server issue."
        }
    }
    
}