"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const Principle = () => {
    const [diseCode  , setDisecode] = useState<string >("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleSchoolSearch = async ()=>{
        setLoading(true)
        if(diseCode.length < 11) {
            setError("Intervalid disecode")
            return ;
        }
        try {
            const response = await fetch(
              `https://kys.udiseplus.gov.in/webapp/api/search-schools?searchType=3&searchParam=${diseCode}`,
              {
                headers: {
                  "Access-Control-Allow-Origin": "https://kys.udiseplus.gov.in",
                },
              }
            );
            const data = await response.json()
            console.log(data)
        } catch (error) {
            setError((error as Error).message)
        }finally{
            setLoading(false)
        }


    }
  return (
    <div className='flex flex-col gap-2.5'>
        <div className='flex gap-2'>
            <Input placeholder='enter disecode' onChange={(e)=> setDisecode(e.target.value)}/>
            <Button onClick={handleSchoolSearch}>{isLoading? "Searching...":"Search"}</Button>
        </div>
        {error && <div>{error}</div>}
    </div>
  )
}

export default Principle