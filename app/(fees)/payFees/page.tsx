"use client"
import { Months } from '@/enums/MonthEnut'
import { PaymentAddInterface } from '@/interfaces/PayMent/Payment'
import { type PaymentMode } from '@/types/Payment'
import React, { useState } from 'react'

const PayFeesPage = () => {
  const [feesData, setFeesData]= useState<PaymentAddInterface>({
    amount:0,
    month:0,
    remains:0,
    year:new Date().getFullYear(),
    paymentMode:null
  })


  
  return (
    <div>PayFeesPage</div>
  )
}

export default PayFeesPage