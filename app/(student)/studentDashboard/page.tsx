import StudentCard from '@/components/Student/StudentCard'
import { StudentInterface } from '@/interfaces/Student/Student'
import { TokentInteface } from '@/interfaces/Token/tokenInterface'
import { mongoconnect } from '@/lib/mongodb'
import Student from '@/models/Student'
import { TokenServices } from '@/services/Token/token'
import { redirect } from 'next/navigation'
import React from 'react'

const StudentDashboard =async () => {
  const tokenServices =new TokenServices()
  const tokenInfo = await tokenServices.getTokenInfo() as TokentInteface
  console.log("token information",tokenInfo)

  if(!tokenInfo || !tokenInfo._id){
    redirect('/studentLogin')
  }
  
  const isConnected = await mongoconnect()

  if(!isConnected){
    throw new Error("Internal server issue.",{
      cause:"May be not provided uri or changed uri for now"
    })
  }

  const student = await Student.findOne({_id:tokenInfo}).lean<StudentInterface>().select('diseCode email fullName govt profilePicture')
  console.log(student)
  return (
    <>
      {student  && <StudentCard  student={student} key={student?.diseCode}/>}
    </>
  )
}

export default StudentDashboard