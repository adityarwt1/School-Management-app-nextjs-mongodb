
"use client"
import React, {  ChangeEvent,useState } from 'react'




const LoginPage = () => {

  const [role, setrole] = useState('')

const handler=(e)=>{

  const role = e.target.value
  setrole(role)

}

console.log(role)





  return (
    <div className='w-full h-screen justify-center items-center'>
      <div>
        <select name="role" onChange={handler}   >
          <option value="principle">Principle</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
    </div>
  )
}

export default LoginPage