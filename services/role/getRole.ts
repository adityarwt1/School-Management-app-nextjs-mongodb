"use server"

import { TokenInterface } from "@/interfaces/Token/tokenInterface"
import { Role } from "@/types/role"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function getRole():Promise<Role> {

    const token = (await cookies()).get("smaToken")?.value

    if(!token){
        // redirect("/login")
        return "guest"
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenInterface

    if(!decoded){
        // redirect("/login")
        return "guest"
    }

    if(decoded.role == "principle"){
        return "principle"
    }
    else if (decoded.role == "teacher"){
        return "teacher"
    }else{
      return "student";
    }
}