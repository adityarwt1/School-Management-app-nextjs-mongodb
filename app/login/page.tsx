
"use client"
import PrincipleLogin from '@/components/Principle/Login/PrincipleLogin'
import StudentLogin from '@/components/Student/StudentLogin'
import { Role } from '@/types/role'
import React, {  ChangeEvent,useState } from 'react'

const LoginPage = () => {
  const [role , setRole] = useState<Role>("principle")

  const handleRoleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
    const role = e.target.value
    setRole(role as Role)
  }
  console.log(role)
 
  return (
    <div className="w-full   h-screen items-center justify-center ">
      
      <div className='flex w-full justify-center itmes-center gap-3 h'> 
        <div className='text-center'>Select Your Role</div>
        <div className="flex justify-center min-h-fit ">
          <select
            name="role"
            onChange={handleRoleSelect}
            className="text-black bg-white rounded-md px-4 py-2 "
          >
            <option value="principle" defaultChecked>
              Principle
            </option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
      </div>
      <div>
        {role === "student" ? (
          <StudentLogin />
        ) : role === "principle" ? (
          <PrincipleLogin />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default LoginPage