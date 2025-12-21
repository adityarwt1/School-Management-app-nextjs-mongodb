'use client'
import { Months } from '@/enums/MonthEnut'
import { PaymentHistory } from '@/interfaces/PayMent/Payment'
import { PaymentServices } from '@/services/Payment/Payment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FeesHistoryComponent = () => {

  const [isLoding, setIsLoaind] = useState<boolean>(true)
  const [feesData , setFeesData] = useState<PaymentHistory[]>([])
  const [error, setError] = useState<string>()
  const [refresh,setRefresh] = useState<number>(0)
  const router = useRouter()

  useEffect(()=>{
    const fetchData = async ()=>{
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
      }
    }

    fetchData()
  },[refresh,router ])

  return (
    <div className='bg-green-500 w-[30%] px-2 py-1'>
      {feesData ? feesData.map((ele)=>(
        <div key={ele._id as string} className='w-full px-4 py-1'>
          <div>{Months[ele.month]}</div>
        </div>
      )):(
        <div>Payment History not found</div>
      )}
    </div>
  )
}

export default FeesHistoryComponent