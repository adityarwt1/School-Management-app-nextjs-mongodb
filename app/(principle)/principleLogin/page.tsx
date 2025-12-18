"use client"
import { PrincipleLoginRequest } from '@/interfaces/ApiResponse/Principle/loginprinciple'
import { PrincipleApi } from '@/services/Principle/Principle'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

const PrincipleLoginPage = () => {
  const [data, setData] = useState<PrincipleLoginRequest>({
    password:"",
    bcCode:"",
    email:""
  })
  console.log(data)
  const router = useRouter()
  const [isLoadin, setIsloading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const principleServices  = new PrincipleApi()

  const handleFinalMove = (emailorBccode:string):string=>{
    if(emailorBccode.includes("@")){
      setData(prev =>({
        ...prev,
        "bcCode":""
      }))
      return "email"
    }else{
      return "bcCode"
    }
  }
  const handleChange  =  (e:ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target  

    setData(prev=> ({
      ...prev,
      [name === "password" ? name :handleFinalMove(value)]:value
    }))
  }
  const hanldeSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setIsloading(true)
      try {
        const response = await principleServices.loginPrinciple(data)

        if(response.success){
            router.replace('/principleDashboard')
        }else if(response.error){
          setError(response.error || "Faild to login.")
        }else{
          setError("Something went wrong.")
        }
      } catch (error) {
        setError( (error as Error).message ||  "Something went wrong.")
      }finally{
        setIsloading(false)
      }
  }
  
  return (
    <div className='flex justify-center items-center w-full h-fit pt-10'>
      <form onSubmit={hanldeSubmit}>
        <label htmlFor="bcCode">Bc Code or Email</label>
        <input type="text" onChange={handleChange} required name='bcCode'/>
        <label htmlFor="password">Password</label>
        <input type="text" onChange={handleChange} required name='password'/>
        <button type='submit' disabled={isLoadin}>{isLoadin ? "Login...":"Login"}</button>
      </form>
    </div>
  )
}

export default PrincipleLoginPage