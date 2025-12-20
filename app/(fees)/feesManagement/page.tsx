import { mongoconnect } from '@/lib/mongodb'
import { Fees } from '@/models/FeesSchem'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import jwt from 'jsonwebtoken'
import { TokentInteface } from '@/interfaces/Token/tokenInterface'
import { FeesCardInterface } from '@/interfaces/Fees/Fees'
import FeesCard from '@/components/FeesSchema/FeesCard'

const FeesManagamentPage = async () => {
  const isConnected  = await mongoconnect()

  if(!isConnected){
    throw new Error("Internal server issue.")
  }

  const cookie = await cookies()
  const token = cookie.get("smaToken")?.value

  if(!token){
    return redirect("/principleLogin")
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokentInteface

  if(!decoded){
    throw new Error("Internal server issue.")
  }
  const fees = await Fees.find({schoolId: decoded?.schoolId}).lean()
 const totalFeesResult = await Fees.aggregate([
   {
     $match: {
       schoolId: decoded?.schoolId,
     },
   },
   {
     $group: {
       _id: null,
       totalAmount: { $sum: "$amount" },
     },
   },
 ]);
 console.log(totalFeesResult)
  console.log(fees)
  return (
    <div className='flex flex-col'>
      <div className='w-full flex justify-between items-center'>
        <div>{}</div>
      </div>
      <div className="flex flex-row flex-wrap gap-3 my-10 mx-10">
        {fees.map((fees: FeesCardInterface) => (
          <FeesCard {...fees} key={fees._id as string} />
        ))}
      </div>
    </div>
  );
}

export default FeesManagamentPage