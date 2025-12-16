"use client"
import { PrincipleRegisteredRequest } from "@/interfaces/ApiResponse/Principle/registerInterface";
import {  ImageServices } from "@/services/images/image";
import { PrincipleApi } from "@/services/Principle/Principle";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const PrincipleRegister = ()=>{
    const [data, setData] = useState<PrincipleRegisteredRequest>({
        bcCode:"",
        email:"",
        fullName:"",
        password:"",
        profilePicture:""
    })
    const imageServices = new ImageServices()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const router = useRouter()

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value}= e.target

        setData(prev=>({
            ...prev,
            [name]:value
        }))
    }

    const handleImageChange = async (e:ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]

        if(file){
            
            const url = await imageServices.convertToBase64(file);
            setData(prev => ({
                ...prev,
                profilePicture:url as string
            }))
        }
    }

    // hande the submit
    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsLoading(true)

        try {
            const prncipleApis = new PrincipleApi()
            const response = await prncipleApis.registerPrinciple(data)

            if(response.success){
                router.replace('/principleDashboard')
            }else{
                setError(response.error || "Something went wrogn.")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }

    }
    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="bcCode">Bc Code</label>
                <input type="text" name="bcCode" id="bcCode" required onChange={handleChange}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required onChange={handleChange}  />
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" id="fullName" required onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" required onChange={handleChange} />
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" name="profilePicture" id="profilePicture" required onChange={handleImageChange} />
                <button type="submit" disabled={isLoading} >{isLoading ? "Register...":"Register"}</button>
            </form>

            {error && (
                <div>{error}</div>
            )}
        </div>
    )
}

export default PrincipleRegister;