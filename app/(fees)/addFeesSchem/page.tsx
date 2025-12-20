"use client"
import { FeesSchema, UpdateFeesBody } from '@/interfaces/Fees/Fees'
import { FeesServices } from '@/services/Fees/FeesSchema'
import { FeesMode } from '@/types/FeesSchema'
import {  useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, FormEvent, Suspense, useEffect, useState } from 'react'

const AddFeesSchemaContent = () => {
    const [feesSchema, setFeesSchema] = useState<FeesSchema>({
        amount:0,
        class:0,
    })
    
    const [mode, setMode] = useState<FeesMode>("add")

    const searchParams  = useSearchParams()
    const router = useRouter()
    const [error,setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const feesServices = new FeesServices();
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target

        setFeesSchema(prev=>({
            ...prev,
            [name]:Number(value)
        }))
    }
    
    const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        const {name, value} = e.target

        setFeesSchema(prev=>({
            ...prev,
            [name]:Number(value)
        }))
    }
    const handleSubmit  = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(feesSchema.amount < 10){
            setError("Amoutn must be greater than 10!")
            return 
        }
        setIsLoading(true)
        try {
            let response;
            if(mode ==  "add"){
              response = await feesServices.addFeesSchema(feesSchema);
            }else{
                response = await feesServices.editFeesSchema(feesSchema as UpdateFeesBody)
            }
            if(response.success){
                router.replace('/feesManagement')
            } else{

            }
        } catch  {
            setError("Failed to add fees")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        const getCurrentMode = ()=>{
            const mode = searchParams.get("mode")|| "add"
            setMode(mode as FeesMode);

            const amount = searchParams.get("amount");
            const _id = searchParams.get("_id")
            const forClass  = searchParams.get("class")

            if(amount || _id || forClass ){
                setFeesSchema(prev=>({
                    ...prev,
                    amount:Number(amount),
                    class:Number(forClass),
                    _id:_id
                }))
            }
        }

        getCurrentMode()
    }, [searchParams])
  return (
    <div className='flex flex-col'>
        <form onSubmit={handleSubmit}>
            <label htmlFor="class">Class</label>
            <select name="class" id="class" value={feesSchema.class} onChange={handleSelectChange}>
                {[...new Array(12)].map((_, index)=>(
                    <option value={String(index +1) } key={100+index}>{index+1}</option>
                ))}
            </select>
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" id="amount"  defaultValue={feesSchema.amount} required onChange={handleChange}/>
            <button type='submit' disabled={isLoading}>{isLoading && mode == "add" ? "Adding...":isLoading && mode === "edit" ? "Updating...": !isLoading && mode == "add" ? "Add":"Update"}</button>
        </form>

        {error && (
            <div>{error}</div>
        )}
    </div>
  )
}


const AddFeesSchema = ()=>{
    return (
        <Suspense fallback={(
            <div>Loading...</div>
        )}>
            <AddFeesSchemaContent/>
        </Suspense>
    )
}
export default AddFeesSchema