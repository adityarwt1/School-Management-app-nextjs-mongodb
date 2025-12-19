"use client"
import { TeacherRegisterInterface } from '@/interfaces/Teacher/TeacherInterfaces'
import { TeacherApi } from '@/services/Teacher/Teacherapi'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const TeacherRegisterPage = () => {
  const [data, setData] = useState<TeacherRegisterInterface>({
    diseCode:0,
    bcCode:"",
    email:"",
    fullName:"",
    contactNumber:0,
    password:""
  })
  console.log(data)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()
  const [showPassword, setSchowPassword] = useState<boolean>(false)
  const [numField, setNumField] = useState(['diseCode','contactNumber'])
  const teacherApiServices = new TeacherApi()
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;

    setData(prev=> ({
      ...prev,
      [name]:numField.includes(name) ? Number(value):value
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

  const handleShowPassword = ()=>{
    setSchowPassword(!showPassword)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="diseCode">Dise Code</label>
        <input type="number" name="diseCode" onChange={handleChange} />
        <label htmlFor="bcCode">BcCode</label>
        <input type="text" onChange={handleChange} name="bcCode" />
        <label htmlFor="email">Email</label>
        <input type="text" onChange={handleChange} name="email" />
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" onChange={handleChange} />
        <label htmlFor="contactNumber">ContactNumber</label>
        <input type="text" name="contactNumber" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <div>
          <input type="text" name="password" onChange={handleChange} />
          <button onClick={handleShowPassword}>{!showPassword ?"Show":"Hide"}</button>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Register..." : "Register"}
        </button>
      </form>
    </>
  );
}

export default TeacherRegisterPage