import React from 'react'
import { StudentInterface } from '@/interfaces/Student/StudentInterface'
import { mongoconnect } from '@/lib/mongodb'
import Student from '@/models/Student'
import { getTokenInfo } from '@/services/Token/getToken'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const StudentPage = async () => {
  const isConnected  = await mongoconnect()

  if(!isConnected){
    throw new Error("Failed to connect database")
  }

  const tokenInfo =await getTokenInfo()

if(tokenInfo.role != "student"){
  redirect("/")
}

const student = await Student.findOne({_id:tokenInfo._id}).lean<StudentInterface>()

console.log(student)
  return (
    <div className='flex flex-col'>
      <Image src={student?.profilePicture as string || "/images/profile.png"} width={50} height={50} alt='Profile phote'/>
      <div>{student?.fullName}</div>
      <div>{student?.motherName}</div>
      <div>{student?.fatherName}</div>
      <div>{student?.currentClass}</div>
      <div>{student?.address}</div>
      <div>{student?.adharCardNumber}</div>
      <div>{student?.contactNumber}</div>
      <div>{student?.diseCode}</div>
      <div>{student?.ssmId}</div>
    </div>
  )
}

export default StudentPage
