
import { TokenInteface } from "@/interfaces/Token/tokenInterface";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export  class  TokenServices{
    async getTokenInfo():Promise<TokenInteface | null  >{
        const cookie = await cookies()
        const token = cookie.get("smaToken")?.value;

        if(!token){
            return null
        }

        const decoded: TokenInteface  = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as TokenInteface;
        return decoded
    }
}