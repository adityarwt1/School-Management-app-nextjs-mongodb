import React, { Suspense } from 'react'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { mongoconnect } from '@/lib/mongodb'
import Principle from '@/models/Principle'
import { PrincipleInfoInterface } from '@/interfaces/Principle/Register/requestInterface'
import PrincipleInfoCard from '@/components/Principle/PrincipleInfoCard'
import SchoolCard from '@/components/School/SchoolCard'
import { TokenInterface } from '@/interfaces/Token/tokenInterface'
import SchoolCardSkeleton from '@/components/Skeleton/School/SchoolCardSkeleton'

const AdmingDashboard = async() => {
  const token = (await cookies()).get("smaToken")?.value
  if(!token){
    redirect('/login')
  }
  const decode  = jwt.verify(token, process.env.JWT_SECRET as string) as TokenInterface
  if(decode.role !=="principle"){
    redirect('/')
  }

  const isConnected = await mongoconnect()

  if(!isConnected){
    throw new Error("Internal server issue.")
  }
  const principle = await Principle.findOne({_id:decode._id}).select("fullName  contactNumber email profilePhoto").lean<PrincipleInfoInterface>()

  if(!principle){
    redirect('/principle-register')
  }
  return (
    <div className="flex flex-col gap-3">
      <PrincipleInfoCard {...principle} />

      <Suspense fallback={<SchoolCardSkeleton/>} >
        <SchoolCard />
      </Suspense>
    </div>
  );
}

export default AdmingDashboard