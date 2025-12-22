"use client"

import { Months } from '@/enums/MonthEnut'
import { PaymentAddInterface } from '@/interfaces/PayMent/Payment'
import { PaymentServices } from '@/services/Payment/Payment'
import { PaymentMode } from '@/types/Payment'
import { useRouter } from 'next/navigation'
import React, { Suspense, useState } from 'react'

const PayFeesPage = () => {
  const [feesData, setFeesData]= useState<PaymentAddInterface>({
    amount:0,
    month:0,
    remains:0,
    year:new Date().getFullYear(),
    paymentMode:null
  })
  console.log(feesData)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const paymentServices = new PaymentServices()
  const router = useRouter()

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target

    setFeesData(prev=>({
      ...prev,
      [name]:Number(value)
    }))
  }

  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
    const {name,value} = e.target

    setFeesData(prev => ({
      ...prev,
      [name]:Number(value)
    }))
  }
  const handlePaymentMode = (e:React.ChangeEvent<HTMLSelectElement> )=>{
    const {name, value} = e.target;

    setFeesData(prev=> ({
      ...prev,
      [name]:Number(value)  == 0 ? PaymentMode.ONLINE :PaymentMode.OFFLINE
    }))
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> )=>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await paymentServices.payFees(feesData)

      if(response.success){
        router.replace('/studentDashboard')
      } else if(response.error){
        setError(response.error)
      } else {
        setError(response.message || "Something went wrong!")
      }
    } catch (error) {
      console.log(error)
      setError((error as Error).message)
    } finally {
      setIsLoading(true)
    }
  }

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          required
          onChange={handleInputChange}
          placeholder="enter amount"
        />
        <label htmlFor="month">Month</label>
        <select
          name="month"
          onChange={handleSelectChange}
          value={feesData.month}
        >
          {[...new Array(12)].map((_, index) => (
            <option value={index} key={_}>
              {Months[index]}
            </option>
          ))}
        </select>
        <label htmlFor="paymentMode">Payment Mode</label>
        <select name="paymentMode" onChange={handlePaymentMode}>
          {[...new Array(2)].map((_, ele) => (
            <option value={ele} key={String(ele + "PaymentModeKeys")}>
              {ele == 0 ? "Online" : "Offline"}
            </option>
          ))}
        </select>
        <label htmlFor="year">Year</label>
        <select name="year" onChange={handleSelectChange}>
          {[...new Array(10)].map((_, index) => (
            <option
              value={new Date().getFullYear() - index}
              key={index + 10 + 20}
            >
              {new Date().getFullYear() - index}
            </option>
          ))}
        </select>
        <label htmlFor="remains">Remains</label>
        <input
          type="number"
          name="remains"
          onChange={handleInputChange}
          placeholder="enter remaining amount"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Add Fees..." : "Add Fees"}
        </button>
      </form>

      {error && <div>{error}</div>}
    </div>
  );
}

const PayFeesPageContent = ()=>{
  return (
    <Suspense fallback={(
      <>
      <div>Loadin...</div>
      </>
    )}>
      <PayFeesPage/>
    </Suspense>
  )
}
export default PayFeesPageContent;