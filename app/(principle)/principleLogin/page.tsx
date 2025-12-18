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
  const router = useRouter()
  const [isLoadin, setIsloading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const principleServices  = new PrincipleApi()
  const handleChange  = (e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target  

    setData(prev=> ({
      ...prev,
      [name]:value
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
        setError("Something went wrong.")
      }finally{
        setIsloading(false)
      }
  }
  
  return (
    <div>PrincipleLoginPage</div>
  )
}

export default PrincipleLoginPage