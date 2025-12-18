
import { TokentInteface } from "@/interfaces/Token/tokenInterface";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken"

export  class  TokenServices{
    async getTokenInfo():Promise<TokentInteface | null  | JwtPayload | string>{
        const cookie = await cookies()
        const token = cookie.get("smaToken")?.value;

        if(!token){
            return null
        }

        const decoded:TokentInteface | JwtPayload | string= jwt.verify(token, process.env.JWT_SECRET as string)
        return decoded
    }
}