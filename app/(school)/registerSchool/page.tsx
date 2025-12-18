"use client"
import { SchoolRegisterRequest } from '@/interfaces/ApiResponse/School/school'
import { ImageServices } from '@/services/images/image'
import { SchoolApi } from '@/services/School/School'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const RegisterScholPage = () => {
    const [data, setData] = useState<SchoolRegisterRequest>({
        address:"",
        diseCode:0,
        from:0,
        govt:false,
        logo:"",
        pinCode:0,
        schoolName:"",
        to:12,
    })
    console.log(data)
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [imageLoading, setImageLoading] = useState<boolean>(false)
    const [logoUrl, setLogoUrl] = useState<string | ArrayBuffer >("")
    const [govtField] = useState<string>("govt")
    const [numField, setNumField] = useState<string[]>([
      "diseCode",
      "pinCode",
      "from",
      "to",
    ]);
    const router  = useRouter()
    // handle change function 
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        
        setData(prev => ({
            ...prev,
            [name]:numField.includes(name) ? Number(value): value
        }))
    }

    // image handle to convert into base 64 
    const handleImageChange = async (e:ChangeEvent<HTMLInputElement>)=>{
        const {files} = e.target

        if(files){
            const imageServices = new ImageServices()
            const url =await imageServices.convertToBase64(files[0])

            setData(prev=>({
                ...prev,
                logo:url as string
            }))

        }
    }

    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        const {name, value} = e.target
        console.log({name, value})
        console.log(name === govtField)
        setData(prev=> ({
            ...prev,
            [name]:numField.includes(name) ? Number(value): value == "false" ? false : true
        }))
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsloading(true)
        try {
            const schoolApiServices = new SchoolApi()
            const response  = await schoolApiServices.registerSchool(data) 
            console.log(response)
            if (response.success) {
              router.push("/principleDashboard");
            } else if (response.error) {
              setError(response.error || "Failed to register school.");
            } else {
              setError("Failed to register school.");
            }

        } catch (error) {
            setError((error as Error).message)
        }finally{
            setIsloading(false)
        }
    }

  return (
    <div className="flex w-full h-full py-10">
      <form onSubmit={handleSubmit}>
        <label htmlFor="logo">Logo</label>
        <input type="file" onChange={handleImageChange} name="logo" required />
        {logoUrl && (
          <Image
            src={logoUrl as string}
            alt="Logo image"
            width={400}
            height={400}
            className="rounded-full"
          />
        )}
        <label htmlFor="diseCode">Dise Code</label>
        <input type="text" onChange={handleChange} name="diseCode"  required/>
        <label htmlFor="schoolName">School Name</label>
        <input type="text" onChange={handleChange} name="schoolName" required />
        <label htmlFor="pinCode">Pin code</label>
        <input type="text" onChange={handleChange} name="pinCode" required />
        <label htmlFor="address">Address</label>
        <input type="text" onChange={handleChange} name="address"  required/>
        <label htmlFor="from">Class From</label>
        <select name="from" id="from" onChange={handleSelectChange} required>
          {[...new Array(12)].map((ele, index) => (
            <>
              <option value={index+1}>{index +1}</option>
            </>
          ))}
        </select>
        <label htmlFor="to">Class to</label>
        <select name="to" id="to" onChange={handleSelectChange} required>
          {[...new Array(12)].map((ele, index) => (
            <>
              <option value={index+1}>{index +1}</option>
            </>
          ))}
        </select>
        <label htmlFor="govt">School Type</label>
        <select name="govt" id="govt" onChange={handleSelectChange} required>
          <option value="true" >Government</option>
          <option value="false">Private</option>
        </select>
          <button type='submit' disabled={isLoading}>{ isLoading ? "Add School...":"Ad school"}</button>
      </form>
      {error && (
        <div>{error}</div>
      )}
    </div>
  );
}

export default RegisterScholPage