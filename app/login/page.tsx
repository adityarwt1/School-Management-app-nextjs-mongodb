<<<<<<< HEAD

"use client"
import React, {  ChangeEvent,useState } from 'react'



=======
"use client"
import React, { ChangeEvent, useState } from 'react'
>>>>>>> 782abed610289ac512b9500d291133ca7fef1ed2

const LoginPage = () => {
  const [role , setRole] = useState("")

<<<<<<< HEAD
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
=======
  const handleRoleSelect = (e:ChangeEvent<HTMLSelectElement>)=>{
    const role = e.target.value
    setRole(role)
  }
  console.log(role)
 
  return (
    <div className='w-full h-screen justify-center items-center'>
      <div>
        <select name="role" onChange={handleRoleSelect}>
>>>>>>> 782abed610289ac512b9500d291133ca7fef1ed2
          <option value="principle">Principle</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
    </div>
  )
}

export default LoginPage