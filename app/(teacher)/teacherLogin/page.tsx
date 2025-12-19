"use client"
import { TeacherLoginInterface } from '@/interfaces/Teacher/TeacherInterfaces'
import { TeacherApi } from '@/services/Teacher/Teacherapi'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TeacherLoginPage = () => {
  const [data, setData] = useState<TeacherLoginInterface>({
    email:"",
    password:"",
    bcCode:"",
  })
  console.log(data)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const teacherServices = new TeacherApi()
  const router = useRouter()
  const finalModeForLogin  = (emailOrBccode:string):string=>{
    if(emailOrBccode.includes("@")){
      setData(prev=>({
        ...prev,
        bcCode:""
      }))
      return "email"
    }else{
      return "bcCode"
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const { name, value} = e.target

    setData(prev=> ({
      ...prev,
      [name  === "password" ? name : finalModeForLogin(value)]:value
    }))
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await teacherServices.loginTeacher(data)

      if(response.success){
        router.replace("/teacherDashboard")
      }else if(response.error) {
        setError(response.error || "Failed to Login!")
      }else{
        setError("Something went wrong!")
      }
    } catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="bcCodeorEmail">Email or Bccode</label>
          <input type="text" name='bcCodeorEmail' onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input type="text" onChange={handleChange} required name='password' />
          <button type='submit' disabled={isLoading}>{isLoading ? "Login...":"Login"}</button>
        </form>
        {error && (
          <div>{error}</div>
        )}
      </div>
    </>
  )
}

export default TeacherLoginPage