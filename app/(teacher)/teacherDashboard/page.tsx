import TeacherInfoCard from '@/components/Teacher/TeacherInfoCard'
import TeacherInfoCardSkeletonScreen from '@/components/Teacher/TeacherInfoCardSkeletonScreen'
import { TeacherInterface } from '@/interfaces/Teacher/TeacherInterface'
import { mongoconnect } from '@/lib/mongodb'
import Teacher from '@/models/Teacher'
import { getTokenInfo } from '@/services/Token/getToken'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

const TeacherPage =async () => {
  const tokeninfo = await getTokenInfo()
  console.log(tokeninfo)
  const isconnedted = await mongoconnect()

  if(tokeninfo.role !== "teacher"){
    redirect("/login?role=teacher")
  }
  if(!isconnedted){
    throw new Error("Failed to connect database!",{ cause:"URI not update"})
  }

  const teacher = await Teacher.findOne({_id:tokeninfo._id}).select("bcCode classTeacher contactNumber diseCode fullName profilePicture").lean<TeacherInterface>()
  console.log(teacher)
  
  if(!teacher){
    redirect("/login")
  }
  return (
    <div className="flex flex-col ">
      <Suspense fallback={<TeacherInfoCardSkeletonScreen/>}>
        <TeacherInfoCard {...teacher} />
      </Suspense>
    </div>
  );
}

export default TeacherPage

export const metadata :Metadata ={
  title:"Teacher DashBoard",
  description:"Teacher dashboard to handle your current class student efficiently.",
  keywords:["teacher dashboard" ,"teacher" ,"manage student"]
}