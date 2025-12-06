import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { mongoconnect } from '@/lib/mongodb'
import Principle from '@/models/Principle'
import { PrincipleInfoInterface } from '@/interfaces/Principle/Register/requestInterface'
import PrincipleInfoCard from '@/components/Principle/PrincipleInfoCard'
import SchoolCard from '@/components/School/SchoolCard'
import SchoolCardSkeleton from '@/components/Skeleton/School/SchoolCardSkeleton'
import { getTokenInfo } from '@/services/Token/getToken'

const AdmingDashboard = async() => {

  const decode  =await getTokenInfo()
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