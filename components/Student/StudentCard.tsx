import { StudentInterfaceFor } from '@/interfaces/Student/SortInfo'
import Image from 'next/image'
import React from 'react'
import ContactNumber from './ContactNumber';

const StudentCard :React.FC<StudentInterfaceFor>= ({contactNumber,fatherName ,fullName ,profilePicture}) => {
  return (
    <div className="flex flex-col p-2 border border-white/15 rounded-lg w-fit">
      <div className='w-40 h-40'>
        <Image src={profilePicture} width={40} height={40} alt={`${fullName} profile picture`} className='object-cover'/>
      </div>
      <div>{fullName}</div>
      <div>SO: {fatherName}</div>
      <ContactNumber contactNumber={contactNumber}/>
    </div>
  );
}

export default StudentCard