import { TokenInterface } from "@/interfaces/Token/tokenInterface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken"
export async function getTokenInfo():Promise<TokenInterface>{
     const token = (await cookies()).get("smaToken")?.value

     if(!token){
        redirect('/login')
     }

     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenInterface

     if(!decoded){
        redirect("/login")
     }

     return decoded;
}