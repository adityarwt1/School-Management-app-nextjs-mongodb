"use client"
import { PrincipleLoginRequest } from '@/interfaces/Principle/Register/Login/PrincipleRequestAndResponse'
import React, { ChangeEvent, FormEvent, useState } from 'react'







const PrincipleLogin = () => {

const[principalinfo, setprincipalinfo] = useState<PrincipleLoginRequest>({
email: "", 
password: ""
})


const handler=(e:ChangeEvent<HTMLInputElement>)=>{
  const {name , value} = e.target

setprincipalinfo(prev=>({

  ...prev,
  [name]:value
}))

 }
console.log(principalinfo)



// submithandler





// const handlesubmit= async (e:FormEvent<HTMLFormElement>)=>{
// e.preventDefault()
// const response = await 




// }











  return (
    <div className='flex  justify-center text center' >

        <form action="" className='flex flex-col border text-center rounded w-80 h-80 justify-center item-center gap-5' >
<label htmlFor="email" >Email</label>
          <input onChange={handler} type="text" name='email' id='email' />
          <label htmlFor="password">Password</label>
          <input onChange={handler} type="text" name='password' id='password' />
          <button className='bg-red-600 text-white active:scale-95 w-fit ' >Submit</button>

        </form>



    </div>
  )
}

export default PrincipleLogin