'use client'
import { Months } from '@/enums/MonthEnut'
import { PaymentHistory } from '@/interfaces/PayMent/Payment'
import { PaymentServices } from '@/services/Payment/Payment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FeesHistoryComponent = () => {

  const [isLoding, setIsLoaind] = useState<boolean>(false)
  const [feesData , setFeesData] = useState<PaymentHistory[]>([])
  const [error, setError] = useState<string>()
  const [refresh,setRefresh] = useState<number>(0)
  const router = useRouter()

  useEffect(()=>{
    const fetchData = async ()=>{
      setIsLoaind(true)
      try {
        const paymentServices = new PaymentServices()
        const response = await paymentServices.getPaymentHistory()

        if(response.status ==  401){
          router.replace('/studentLogin')
        }else if(response.paymentHistory){
          setFeesData(response.paymentHistory)
        } else if(response.error){
            setError(response.error)
        } else{
          setError(response.message  || "Failed to fetch data")
        }
      } catch (error) {
        console.log(error)
        setError("Failed to fetch Payment history")
      } finally {
       setIsLoaind(false)
      }
    }

    fetchData()
  },[refresh,router ])

  const handleRefresh = ()=>{
    setRefresh(prev => prev +1)
  }
  if(isLoding){
    return (
      <div className='w-[30%] flex justify-between items-center px-2 py-5 '>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="border mx-2 border-black/15 rounded-xl w-[30%] px-2  gap-2 flex flex-col py-5">
      <div className='w-full flex justify-evenly items-center'>
        <div>{}</div>
      </div>
      <div className="w-full px-4 py-1 flex justify-evenly">
        <div className="w-full text-left">Month</div>
        <div className="w-full text-left">₹Amount</div>
        <div className="w-full text-left">Remaining</div>
        <div className="w-full text-left">Pay</div>
      </div>
      {feesData ? (
        feesData.map((ele) => (
          <>
            <div
              key={ele._id as string}
              className="w-full px-4 py-1 border border-black/20 rounded shadow flex justify-evenly"
            >
              <div className="flex w-[25%] text-center ">{Months[ele.month]}</div>
              <div className="text-green-500 w-[25%]">
                <span className="font-mono">{`₹${ele.amount}`}</span>
              </div>
              <div className="text-yellow-600 w-[25%] font-mono">{`₹${ele.remains}`}</div>
              {ele.remains > 0 ?  (
                <Link href={`/payFees?mode=payRemains&_id=${ele._id}&amount=${ele.remains}&month=${ele.month}`} className='w-[25%]'>
                  <button className='px-2 py-1 bg-yellow-600 text-nowrap text-white rounded-md cursor-pointer hover:opacity-95 w-full'>Pay {ele.remains}</button>
                </Link>
              ):(
                <button className='bg-green-600 text-white px-2 py-1 rounded-md  hover:opacity-95 w-[25%]' aria-disabled={true}>Paid</button>
              )}
            </div>
          </>
        ))
      ) : (
        <div>Payment History not found</div>
      )}
    </div>
  );
}

export default FeesHistoryComponent