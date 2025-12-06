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



const [option, setoption] = useState("")

const changevalue=(elem)=>{
const result= elem.target.value
setoption(option)
console.log(result)
}









  return (
    <div className='min-h-screen flex justify-center items-center bg-black'>
      <br />
<div className=' absolute left-10 top-14'>
  
<select name="" id="" className='flex' onChange={changevalue}>
  <option className='text-black' value="student">Student</option>
  <option className='text-black' value="Principal">Principal</option>
  <option className='text-black' value="Class Teacher">Class Teacher</option>
</select>

</div>


<div className='border-2 h-110 w-80 p-6 rounded-lg '>
  <h2 className='text-center boder-rounded font-bold text-2xl p-3'>Login</h2>
<input type="text"   className='bg-black rounded text-white p-5  gap-5 m-6'    onChange={user}  placeholder='Enter your user name' />
<input type="password"  className='bg-black rounded text-white p-5 gap-5 m-6 '   onChange={password}  placeholder='enter your password' />
<button className='bg-red-700 text-white p-3 rounded mx-auto block active:scale-95'  > Submit</button>
</div>
    </div>
  )
}

export default StudentLogin