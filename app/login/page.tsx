
"use client"
import PrincipleLogin from '@/components/Principle/Login/PrincipleLogin'
import StudentLogin from '@/components/Student/StudentLogin'
import TeacherLogin from '@/components/Teacher/TeacherLogin'
import { Role } from '@/types/role'
import React, {  ChangeEvent,useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const LoginPage = () => {
  const [role , setRole] = useState<Role>("principle")

  const handleRoleSelect = (value:string)=>{
    setRole(value as Role)
  }
  console.log(role)
 
  return (
    <>
      <div className=" w-full h-screen flex flex-col  justify-center items-center">
        <div className='border p-10 rounded-lg shadow-2xl gap-3 flex flex-col text-center items-center justify-center'>
        <div className='font-bold text-2xl'>LOGIN PAGE</div>
          <Select onValueChange={handleRoleSelect}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="principle">Principle</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="student">Student</SelectItem>
            </SelectContent>
          </Select>
          {role === "principle" && <PrincipleLogin/>}
        </div>
      </div>
    </>
    // <div className="w-full   h-screen items-center justify-center ">

    //   <div className='flex w-full justify-center itmes-center gap-3 h'>
    //     <div className='text-center'>Select Your Role</div>
    //     <div className="flex justify-center min-h-fit ">
    //       <select
    //         name="role"
    //         onChange={handleRoleSelect}
    //         className="text-black bg-white rounded-md px-4 py-2 "
    //       >
    //         <option value="principle" defaultChecked>
    //           Principle
    //         </option>
    //         <option value="teacher">Teacher</option>
    //         <option value="student">Student</option>
    //       </select>
    //     </div>
    //   </div>
    //   <div>
    //     {role === "student" ? (
    //       <StudentLogin />
    //     ) : role === "principle" ? (
    //       <PrincipleLogin />
    //     ) : (
    //       <TeacherLogin/>
    //     )}
    //   </div>
    // </div>
  );
}

export default LoginPage