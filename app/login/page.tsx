"use client"
import { loginStudent } from '@/services/Student/Login/loginStudent'
import React, { ChangeEvent, useState } from 'react'

const LoginPage = () => {
  const [role , setRole] = useState("")

  const handleRoleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
    const role = e.target.value
    setRole(role)
  }
  console.log(role)
  const loginStude = async()=>{
    await loginStudent({ssmId: 141979665,password: "shivendra@123456789"})
  }
  loginStude()
  return (
    <div className='w-full h-screen justify-center items-center'>
      <div>
        <select name="role" onChange={handleRoleSelect}>
          <option value="principle">Principle</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
    </div>
  )
}

export default LoginPage