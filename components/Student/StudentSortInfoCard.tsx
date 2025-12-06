"use server"
import { mongoconnect } from '@/lib/mongodb'
import Student from '@/models/Student'
import React from 'react'

interface StudentInterfaceFor{
    fullName:string
    profilePicture:string
    fatherName:string
    contactNumber:number
}
interface StudentInfoCardProps{
    diseCode:number
    currentClass:number
}
const StudentSortInfoCard:React.FC<StudentInfoCardProps> = async({diseCode, currentClass}) => {

    await mongoconnect()

    const students = await Student.find({
      diseCode,
      currentClass,
    })
      .select("fullName profilePicture fatherName contactNumber")
      .lean<StudentInterfaceFor[]>();

    console.log(students)



  return (
    <div>StudentSortInfoCard</div>
  )
}

export default StudentSortInfoCard