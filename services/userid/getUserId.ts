"use server"

import { TokenInterface } from '@/interfaces/Token/tokenInterface'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


export async function getUserId():Promise<string>{

    const token = (await cookies()).get("smaToken")?.value

    if(!token){
        redirect("/login")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenInterface

    if(!decoded){
        redirect("/login")
    }

    return decoded._id;
}