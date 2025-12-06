"use server"
import { StudentInterfaceFor } from '@/interfaces/Student/SortInfo'
import { mongoconnect } from '@/lib/mongodb'
import Student from '@/models/Student'
import React from 'react'
import StudentCard from './StudentCard'


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
    <div>
        {
            students.map((student, index)=>(
                <StudentCard {...student} key={index}/>
            ))
        }
    </div>
  )
}

export default StudentSortInfoCard