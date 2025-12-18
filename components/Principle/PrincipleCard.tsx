import { PrincipleCardInterface } from '@/interfaces/Principle/PrincipleInfoInterface'
import Image from 'next/image'
import React from 'react'

const PrincipleCard : React.FC<PrincipleCardInterface> = (props) => {

  return (
    <div>
        <div>{props.bcCode}</div>
        <div>{props.email}</div>
        <div>{props.fullName}</div>
        <Image src={props.profilePicture} width={40} height={40} alt='profile piture' />
    </div>
  )
}

export default PrincipleCard