import { TokenServices } from '@/services/Token/token'
import React from 'react'

const StudentDashboard =async () => {
  const tokenServices =new TokenServices()
  const tokenInfo = await tokenServices.getTokenInfo()
  console.log(tokenInfo)
  return (
    <div>StudentDashboard</div>
  )
}

export default StudentDashboard