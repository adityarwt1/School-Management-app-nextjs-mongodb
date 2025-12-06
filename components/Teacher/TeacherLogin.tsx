import { TeacherLoginRequest } from '@/interfaces/Teacher/login/TeacherLoginRequest'
import { loginTeacher } from '@/services/Teacher/Login/TeacherLoing'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent,  useState } from 'react'

const TeacherLogin = () => {
    const [teacherInfo, setTeacherInfo] = useState<TeacherLoginRequest>({
        bcCode:"",
        password:""
    })
    const router = useRouter()
    const [errror, setError] = useState<string>()
    const [isLoading, setIsloading] = useState<boolean>(false)

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target

        setTeacherInfo(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsloading(true)
        try {
            const response = await loginTeacher({  bcCode:teacherInfo.bcCode,password:teacherInfo.password})

            if(response.success){
                router.replace("/teacherDashboard")
            }else if(response.error){
                setError(response.error)
            }else{
                setError("Something went Wrong!")
            }
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setIsloading(true)
        }
    }
  return (
    <div className='flex flex-col justify-center items-center'>
        <form  className='flex flex-col' onSubmit={handleSubmit}>
            <label htmlFor="bcCode" className='text-left w-full'>BC Code/ID</label>
            <input type="text" name="bcCode" id="bcCode" onChange={handleInputChange} placeholder='enter your bccode/Teacher id' required/>
            <label htmlFor="password" className='text-left w-full'>Password</label>
            <input type="text" name="password" id="password" onChange={handleInputChange} placeholder='enter you password' required/>
            <button type='submit'>{isLoading ?"Loading...":"Login"}</button>
        </form>
        {errror && (
            <div className='bg-red-300 text-black'>{errror}</div>
        )}
    </div>
  )
}

export default TeacherLogin