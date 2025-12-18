
import { SchoolCardInterface } from '@/interfaces/School/SchoolInterface'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface SchoolCard{
    school?:SchoolCardInterface
}
const SchoolCard:React.FC<SchoolCard> = ({school}) => {
  return (
    <>
    { school ?(
    <>
    <Image src={school.logo} width={50} height={50} alt='School Logo'/>
      <div>{school.address}</div>
      <div>{school.diseCode}</div>
      <div>{school.from}</div>
      <div>{school.to}</div>
      <div>{school.govt}</div>
      <div>{school.schoolName}</div>
      <div>{school.pinCode}</div>
      </>
    ) :(
        <Link href="/registerSchool" className='px-6 py-2 border border-black/15 shadow-lg rounded-md'>Add Your School</Link>
    )     

      }
    </>
  );
}

export default SchoolCard