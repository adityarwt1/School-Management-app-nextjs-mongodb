"use client"
import React, { useEffect, useState } from 'react'

interface SendInviteProps{
    diseCode:number
    currentClass:number
}
const SendInviteButton:React.FC<SendInviteProps> = ({ diseCode}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [error,setError] = useState<string>()

    const handleCopy = async ()=>{
        try {
            await navigator.clipboard.writeText(
              `${window.origin}/studentRegister?diseCode=${diseCode}`
            );
            setIsCopied(true)
        } catch (error) {
            console.log((error as Error).message)
            setError((error as Error).message)
        }
    }

    useEffect(()=>{
        const timeer = setTimeout(() => {
            setIsCopied(false)
        }, 1000);
        return ()=> clearTimeout(timeer)
    },[isCopied])
  return (
    <button onClick={handleCopy}>{!isCopied ? "Conpy Invite Link!":error ?error :"Copied!"}</button>
  )
}

export default SendInviteButton