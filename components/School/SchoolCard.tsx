import React from 'react'
import { mongoconnect } from '@/lib/mongodb'
import { getTokenInfo } from '@/services/Token/getToken'
import School from '@/models/School'
import { SchoolInterface } from '@/interfaces/School/SchoolInterface'
import Link from 'next/link'


const SchoolCard = async() => {
    const tokenInfo = await getTokenInfo()

    const isConnected = await mongoconnect()

    if(!isConnected){
        throw new Error("Failed to Connect Database");
    }
    const school = await School.findOne({principleId:tokenInfo._id}).lean<SchoolInterface>()
    
    console.log("School info" , school)
    console.log("compeonet is servwer or not")
  return (
    <div>
      {school ? (
        <>
          <div>{school.schoolName}</div>
          <div>{school.diseCode}</div>
          <div>{school.email}</div>
          <div>{school.from}-{school.to}</div>
          <div>{school.pinCode}</div>
        </>
      ) : (
        <Link href="/add-school">Add Your School here</Link>
      )}
    </div>
  );
}

export default SchoolCard