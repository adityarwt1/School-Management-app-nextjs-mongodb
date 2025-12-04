import React from 'react'
import { mongoconnect } from '@/lib/mongodb'
import { getTokenInfo } from '@/services/Token/getToken'
import School from '@/models/School'
import { SchoolInterface } from '@/interfaces/School/SchoolInterface'
import Link from 'next/link'
import Student from '@/models/Student'


const SchoolCard = async() => {
    const tokenInfo = await getTokenInfo()

    const isConnected = await mongoconnect()

    if(!isConnected){
        throw new Error("Failed to Connect Database");
    }
    const school = await School.findOne({principleId:tokenInfo._id}).lean<SchoolInterface >()

    const totalStudent = await Student.countDocuments({scoolId:school?.diseCode})

  return (
    <div>
      {school ? (
        <>
          <div>{school.schoolName}</div>
          <div>{school.diseCode}</div>
          <div>{school.email}</div>
          <div>{school.from}-{school.to}</div>
          <div>{school.pinCode}</div>
          <div>TotalStudent: {totalStudent}</div>
        </>
      ) : (
        <Link href="/add-school">Add Your School here</Link>
      )}
    </div>
  );
}

export default SchoolCard