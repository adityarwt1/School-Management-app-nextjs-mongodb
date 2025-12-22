'use client'
import { Months } from '@/enums/MonthEnut'
import { PaymentHistory } from '@/interfaces/PayMent/Payment'
import { PaymentServices } from '@/services/Payment/Payment'
import Link from 'next/link'
import { RefreshCcw } from "lucide-react"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface MonthFeeData {
  month: number
  amount: number
  remains: number
  isPaid: boolean
  paymentId?: string
}

const FeesHistoryComponent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [feesData, setFeesData] = useState<PaymentHistory[]>([])
  const [paidDocumentCount, setPaidDocumentCount] = useState(0)
  const [error, setError] = useState<string>()
  const [refresh, setRefresh] = useState(0)
  const router = useRouter()

  // Generate last 12 months data
  const getLast12MonthsData = (): MonthFeeData[] => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() // 0-11
    const last12Months: MonthFeeData[] = []

    for (let i = 0; i < 12; i++) {
      // Calculate month index (going backwards from current month)
      const monthIndex = (currentMonth - i + 12) % 12
      
      // Find if this month exists in feesData
      const monthData = feesData.find(fee => fee.month === monthIndex)
      
      if (monthData) {
        // Month has payment data
        last12Months.push({
          month: monthIndex,
          amount: monthData.amount,
          remains: monthData.remains,
          isPaid: monthData.remains === 0,
          paymentId: monthData._id as string
        })
      } else {
        // Month doesn't have payment data - unpaid
        last12Months.push({
          month: monthIndex,
          amount: 0,
          remains: 5000, // Default fee amount, adjust as needed
          isPaid: false
        })
      }
    }

    return last12Months
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const paymentServices = new PaymentServices()
        const response = await paymentServices.getPaymentHistory()
        
        if (response.status === 401) {
          router.replace('/studentLogin')
        } else if (response.paymentHistory) {
          setPaidDocumentCount(response.totalCount as number)
          setFeesData(response.paymentHistory)
        } else if (response.error) {
          setError(response.error)
        } else {
          setError(response.message || "Failed to fetch data")
        }
      } catch (error) {
        console.log(error)
        setError("Failed to fetch Payment history")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [refresh, router])

  const handleRefresh = () => {
    setRefresh(prev => prev + 1)
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-lg'>Loading...</div>
      </div>
    )
  }

  const last12MonthsData = getLast12MonthsData()

  return (
    <div className='w-[30%] max-w-4xl  p-4 border mx-2 rounded-sm border-black/15'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>
          Last Year: {paidDocumentCount}/12
        </h2>
        <button
          onClick={handleRefresh}
          className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          <RefreshCcw size={16} />
          Refresh
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse bg-white shadow-md rounded-lg'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='p-3 text-left border'>Month</th>
              <th className='p-3 text-left border'>₹Amount</th>
              <th className='p-3 text-left border'>Remaining</th>
              <th className='p-3 text-left border'>Pay</th>
            </tr>
          </thead>
          <tbody>
            {last12MonthsData.map((ele, index) => (
              <tr 
                key={`${ele.month}-${index}`}
                className={`hover:bg-gray-50 ${!ele.isPaid ? 'bg-red-50' : ''}`}
              >
                <td className='p-3 border font-medium'>
                  {Months[ele.month]}
                </td>
                <td className='p-3 border'>
                  {ele.amount > 0 ? `₹${ele.amount}` : '-'}
                </td>
                <td className='p-3 border'>
                  {ele.remains > 0 ? `₹${ele.remains}` : '₹0'}
                </td>
                <td className='p-3 border'>
                  {ele.remains > 0 ? (
                    <Link href={`/payFees?month=${ele.month}`}>
                      <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                        Pay ₹{ele.remains}
                      </button>
                    </Link>
                  ) : (
                    <span className='text-green-600 font-semibold'>
                      Paid ✓
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && (
        <div className='mt-4 p-4 bg-red-100 text-red-700 rounded'>
          {error}
        </div>
      )}
    </div>
  )
}

export default FeesHistoryComponent