import React from 'react'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PrincipleCookietoken } from '@/interfaces/Principle/Token/token'
import { mongoconnect } from '@/lib/mongodb'
import Principle from '@/models/Principle'
import { PrincipleInfoInterface } from '@/interfaces/Principle/Register/requestInterface'

const AdmingDashboard = async() => {
  const token = (await cookies()).get("principleToken")?.value
console.log(token)
  if(!token){
    redirect('/login')
  }
  const decode  = jwt.verify(token, process.env.JWT_SECRET as string) as PrincipleCookietoken
  console.log(decode)
  if(decode.role !=="principle"){
    redirect('/')
  }

  const isConnected = await mongoconnect()

  if(!isConnected){
    throw new Error("Internal server issue.")
  }
  const principle = await Principle.findOne({_id:decode._id}).select("fullName  contactNumber email ").lean<PrincipleInfoInterface>()
  console.log(principle)
  return (
    <div>AdmingDashboard</div>
  )
}

export default AdmingDashboard