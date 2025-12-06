"use client"
import { PrincipleLoginRequest } from '@/interfaces/Principle/Register/Login/PrincipleRequestAndResponse'
import { loginPrinciple } from '@/services/Principle/PrincipleLogin'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'







const PrincipleLogin = () => {

    const[principalinfo, setprincipalinfo] = useState<PrincipleLoginRequest>({
        email: "", 
        password: ""
    })
    const router  = useRouter()
    const [error, setError] = useState<string>("")
    const [loading, setLoading] =  useState<boolean>(false)
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name , value} = e.target

        setprincipalinfo(prev=>({

        ...prev,
        [name]:value
        }))

    }


    const handleSubmit  = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        try {
            const response = await loginPrinciple({email:principalinfo.email, password:principalinfo.password});
            if(response.success){
                router.replace("/principledashboard")
            }else if(response.error){
                setError(response.error)
            }else{
                setError("Something went wrong!")
            }

        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='flex flex-col gap-3 w-full h-screen justify-center items-center' >

        <form onSubmit={handleSubmit} className='flex flex-col border text-center  w-fit p-5  justify-center items-center gap-5  rounded-2xl' >
            <div className='text-2xl font-bold'>Principle Login</div>
            <label htmlFor="email" >Email</label>
            <input onChange={handleChange} type="text" name='email' id='email'required placeholder='enter you email' className='border rounded-md px-4 py-2 '/>
            <label htmlFor="password">Password</label>
            <input onChange={handleChange} type="text" name='password' id='password' required placeholder='enter your password' className='border rounded-md px-4 py-2 '/>
            <button className='bg-[#e0e0e0] text-black px-10  py-1 rounded-lg active:scale-95 w-fit ' disabled={loading} >{loading?"Submit...":"Submit"}</button>
        </form>

        {error && (
            <div className='bg-red-500/50 text-white px-4 py-2 rounded-2xl w-fit'>{error}</div>
        )}
    </div>
  )
}

export default PrincipleLogin