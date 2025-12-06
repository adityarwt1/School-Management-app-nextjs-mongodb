
"use client"
import PrincipleLogin from '@/components/Principle/Login/PrincipleLogin'
import StudentLogin from '@/components/Student/StudentLogin'
import { Role } from '@/types/role'
import React, {  ChangeEvent,useState } from 'react'

const LoginPage = () => {
  const [role , setRole] = useState<Role>("guest")

  const handleRoleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
    const role = e.target.value
    setRole(role as Role)
  }
  console.log(role)
 
  return (
    <div className='w-full h-screen justify-center items-center'>
      <div>
        <select name="role" onChange={handleRoleSelect}>
          <option value="principle">Principle</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      {role === "student" ? <StudentLogin/> :role === "principle" ? <PrincipleLogin/>:""}

    </div>
  )
}

export default LoginPage