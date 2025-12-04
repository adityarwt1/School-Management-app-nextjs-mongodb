import { PrincipleInfoInterface } from '@/interfaces/Principle/Register/requestInterface'
import Image from 'next/image'
import React from 'react'

const PrincipleInfoCard:React.FC<PrincipleInfoInterface> = ({contactNumber, email , fullName ,profilePhoto}) => {
  return (
    <div className='flex p-4 rounded-2xl w-full justify-between'>
        <div className='flex gap-2'>
            <Image src={profilePhoto || "/images/profile.png"} width={50} height={10} alt='Principle dp ' className='rounded-full'/>
            <div className='flex flex-col'>
                <div>{fullName }</div>
                <div>{email}</div>
                <div>{contactNumber}</div>
            </div>
        </div>
        <div>:</div>
    </div>
  )
}

export default PrincipleInfoCard