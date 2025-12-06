"use client"
import { PrincipleLoginRequest } from '@/interfaces/Principle/Register/Login/PrincipleRequestAndResponse'
import { loginPrinciple } from '@/services/Principle/PrincipleLogin'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import {Label} from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'





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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          required
          placeholder="abcd@gmail.com"
          className="border rounded-md px-4 py-2 w-[300px] "
        />
        <Label htmlFor="password">Password</Label>
        <Input
          onChange={handleChange}
          type="text"
          name="password"
          id="password"
          required
          placeholder="ex. abcd@1234"
          className="border rounded-md px-4 py-2 "
        />
        <Button
          className=" px-10  py-1 rounded-lg active:scale-95 w-full  "
          disabled={loading}
          type='submit'
        >
          {loading ? "Submit..." : "Submit"}
        </Button>
      </form>

      {error && (
        <div className="bg-red-500/50 text-white px-4 py-2 rounded-2xl w-fit">
          {error}
        </div>
      )}
    </>
  );
}

export default PrincipleLogin