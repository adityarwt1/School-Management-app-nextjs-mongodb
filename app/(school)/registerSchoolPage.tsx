import { SchoolRegisterRequest } from '@/interfaces/ApiResponse/School/registerSchool'
import { ImageServices } from '@/services/images/image'
import { SchoolApi } from '@/services/School/School'
import { BlobOptions } from 'buffer'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState, useTransition } from 'react'

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
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [imageLoading, setImageLoading] = useState<boolean>(false)
    const [logoUrl, setLogoUrl] = useState<string | ArrayBuffer >("")
    const [govtField, setGovtField] = useState<false>()
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
        setData(prev=> ({
            ...prev,
            [name]:numField.includes(name) ? Number(value):value
        }))
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setIsloading(true)
        try {
            const schoolApiServices = new SchoolApi()
            const response  = await schoolApiServices.registerSchool(data) 
            
            if(response.succuss){
                router.push('/principleDashboard')
            }else if (response.error){
                setError(response.error || "Failed to register school.")
            }else{
                setError("Failed to register school.")
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
        <input type="file" onChange={handleImageChange} name="logo" />
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
        <input type="text" onChange={handleChange} name="diseCode" />
        <label htmlFor="schoolName">School Name</label>
        <input type="text" onChange={handleChange} name="schoolName" />
        <label htmlFor="pinCode">Pin code</label>
        <input type="text" onChange={handleChange} name="pinCode" />
        <label htmlFor="address">Address</label>
        <input type="text" onChange={handleChange} name="address" />
        <label htmlFor="from">Class From</label>
        <select name="from" id="from" onChange={handleSelectChange}>
          {[...new Array(12)].map((ele, index) => (
            <>
              <option value={index+1}>{index +1}</option>
            </>
          ))}
        </select>
        <select name="to" id="to" onChange={handleSelectChange}>
          {[...new Array(12)].map((ele, index) => (
            <>
              <option value={index+1}>{index +1}</option>
            </>
          ))}
        </select>

      </form>
    </div>
  );
}

export default RegisterScholPage