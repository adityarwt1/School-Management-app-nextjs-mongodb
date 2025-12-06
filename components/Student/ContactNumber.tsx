"use client"
import React, { useEffect, useState } from 'react'
interface PageProps{
    contactNumber:number
}
const ContactNumber :React.FC<PageProps>= ({contactNumber}) => {
    const [isCopied ,setIsCopied] = useState<boolean>()
    const [error, setError] = useState<string>("")

    const handleCopy = async ()=>{
        setIsCopied(true)
        try {
            await navigator.clipboard.writeText(String(contactNumber))
        } catch (error) {
            setError((error as Error).message)        
        }
    }

    useEffect(()=>{
        const timer = setTimeout(() => {
            setIsCopied(false)
        }, 1000);

        return ()=> clearTimeout(timer)
    },[isCopied])
  return (
    <div>
        <div>{contactNumber}</div>
        <button onClick={handleCopy}>{isCopied ? "Copied!":error ? error:"Copy"}</button>
    </div>
  )
}

export default ContactNumber
