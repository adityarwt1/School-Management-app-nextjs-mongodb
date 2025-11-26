"use client"
import React, {  useState } from 'react'
import {Select , SelectContent , SelectGroup , SelectItem , SelectLabel , SelectTrigger , SelectValue } from "@/components/ui/select"
import { Role } from '@/types/role'
import Principle from '@/components/Register/Principle'



const LogingPage = () => {
  
  const [role, setRole] = useState<Role>("");

 
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-10 ">
      <div className="flex gap-3">
        
        {/* selectio for the role */}
        <Select onValueChange={(val) => setRole(val as Role)}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="select role (ex. student, teacher, principal)" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="principal">Principal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
      </div>
        {role == "principal" && (
          <Principle/>
        )}
    </div>
  );
}

export default LogingPage