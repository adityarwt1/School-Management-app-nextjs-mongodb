import { cookies } from "next/headers"

export class CookieServices {
    async setCookie(token:string):Promise<boolean>{
        try {
            const cookie = await cookies()
            cookie.set(process.env.COOKIE_NAME as string, token,{
                httpOnly:true,
                sameSite:"lax"
            })
            return true
        } catch  {
            return false
        }
    }

    
}