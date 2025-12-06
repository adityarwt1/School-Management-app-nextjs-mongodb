"use client"
import React, { useState } from 'react'

const StudentLogin = () => {


const [username, setuser] = useState("")

const [pass, setpass] = useState("")

//sername ka 
const user=(e)=>{


const fnc = e.target.value

setuser(username)
console.log(fnc)

}

//password
const password=(e)=>{


const val = e.target.value

setpass(pass)
console.log(val)

}







  return (
    <div className='gap-4'>

<input type="text"   className='bg-green-500 rounded text-red-600 p-5  gap-5 m-6'    onChange={user}  placeholder='Enter your user name' />
<input type="password"  className='bg-green-500 rounded text-red-600 p-5 gap-5 m-6 '   onChange={password}  placeholder='enter your password' />
<button className='bg-red-700 text-white p-5 gap-4'  > Submit</button>
    </div>
  )
}

export default StudentLogin