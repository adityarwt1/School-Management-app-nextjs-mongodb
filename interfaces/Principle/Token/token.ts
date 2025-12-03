import { Role } from "@/types/role"

export interface PrincipleCookietoken{
    exp:number
    iat:number
    _id:string
    role:Role
}