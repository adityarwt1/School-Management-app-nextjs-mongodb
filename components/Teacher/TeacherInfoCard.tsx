import { TeacherInterface } from '@/interfaces/Teacher/TeacherInterface'
import { mongoconnect } from '@/lib/mongodb'
import Student from '@/models/Student'
import Image from 'next/image'
import React from 'react'


const TeacherInfoCard:React.FC<TeacherInterface> =async ({bcCode , classTeacher  , contactNumber, diseCode, fullName, profilePicture }) => {
     await mongoconnect()

    const student = await Student.countDocuments({diseCode, currentClass:classTeacher})
  return (
    <div>
        <Image src={profilePicture as string || "/images/profile.png"} width={50} height={50} alt='Profile'/>
        <div>Name: {fullName}</div>
        <div>BC Code: {bcCode}</div>
        <div>Class Teacher:{`Class ${classTeacher}`}</div>
        <div>Contact Number: {contactNumber}</div>
        <div>Dise Code: {diseCode}</div>
        <div>Total Studen Your Class: {student}</div>
    
    </div>
  )
}

export default TeacherInfoCard