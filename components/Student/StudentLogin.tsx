import { StudentLoginRequest } from '@/interfaces/Student/Login/requstInterface'
import { loginStudent } from '@/services/Student/Login/loginStudent'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'


const StudentLogin = () => {
    const [studentInfo ,setStudenInfo ] = useState<StudentLoginRequest>({
        password:"",
        ssmId:0,
    })
    const [loading, setLoding] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const router = useRouter()
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name , value} = e.target

        setStudenInfo(prev=> ({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoding(true)
        try {
            const response = await loginStudent({ssmId:studentInfo.ssmId , password:studentInfo.password})

            if(response.success ){
                localStorage.setItem("smaToken" , response.token as string)
                router.replace("/studentDashBoard")
            }else if(response.error){
                setError(response.error)
            }else{
                setError("Something went wrong!")
            }
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoding(false)
        }
    }
  return (
    <div className='flex flex-col gap-3 justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col w-fit gap-3 '>
            <label htmlFor="ssmId">SSMID</label>
            <input type="number" name='ssmId' id='ssmId' onChange={handleChange} required className='px-4 py-2 border rounded-lg' placeholder='enter ssmid'/>
            <label htmlFor="password">Password</label>
            <input type="text" name='password' id='password' onChange={handleChange}  required className='px-4 py-2 border rounded-lg' placeholder='enter you password'/>
            <button type='submit' disabled={loading} className='py-2 px-4 bg-[#e0e0e0] text-black rounded-2xl'>{loading ? "Login...":"Login"}</button>
        </form>
        {error && (
            <div className='bg-red-400 text-white py-2 px-6 w-fit rounded-md '>{error}</div>
        )}
        <Link href="/studentRegister" className='underline '>Sudent Register</Link>
    </div>
  )
}

export default StudentLogin