"use client"
import { TeacherRegisterInterface } from '@/interfaces/Teacher/TeacherInterfaces'
import { TeacherApi } from '@/services/Teacher/Teacherapi'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TeacherRegisterPage = () => {
  const [data, setData] = useState<TeacherRegisterInterface>({
    bcCode:"",
    contactNumber:0,
    diseCode:0,
    email:"",
    fullName:"",
    password:""
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const teacherApiServices = new TeacherApi()
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;

    setData(prev=> ({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await teacherApiServices.registerTeacher(data);

      if(response.success){
        router.replace('/teacherDashboard')
      }else if(response.error){
        setError(response.error)
      }else if(response.message){
        setError(response.message)
      } else {
          setError("Somethign went Wrong.")
      }

    } catch (error) {
      setError((error as Error).message || "Something went wrong.") 
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="diseCode">Dise Code</label>
        <input type="number" name='diseCode' onChange={handleChange}/>
        <label htmlFor="bcCode">BcCode</label>
        <input type="text" onChange={handleChange} name='' />
      </form>
    </>
  )
}

export default TeacherRegisterPage