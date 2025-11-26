"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

const LogingPage = () => {
  const [diseCode  , setDisecode] = useState<string>()
  const [role, setRole] = useState<"principle" | "student" | "teacher">()

  useEffect(()=>{

  },[diseCode])
  return (
    <div className="flex flex-col">
      <div className='flex gap-3'>
        <Input
          placeholder="Enter your school disecode"
          onChange={(e) => setDisecode(e.target.value)}
          className='w-fit'
        />
        <Button>Search</Button>
      </div>
    </div>
  );
}

export default LogingPage