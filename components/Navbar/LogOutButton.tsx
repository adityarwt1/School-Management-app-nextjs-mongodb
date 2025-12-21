'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogOutButton = () => {
    const router  = useRouter()
    const handleLogount = async ()=>{
        try {
            const response = await fetch("/api/v1/auth/logout",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
            })            

            if(response.ok){
                router.refresh()
            }
        } catch (error)  {
            console.log(error)
        }
    }
  return (
      <button
        onClick={handleLogount}
        className='hover:bg-white  text-white px-2 py-1 duration-300 transition-all hover:text-black delay-100 cursor-pointer'
      >
        Logout
      </button>
  );
}

export default LogOutButton