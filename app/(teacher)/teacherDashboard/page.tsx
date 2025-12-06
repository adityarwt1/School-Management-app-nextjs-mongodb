import { getTokenInfo } from '@/services/Token/getToken'
import React from 'react'

const TeacherPage =async () => {
  const tokeninfo = await getTokenInfo()
  console.log(tokeninfo)
  return (
    <div>TeacherPage</div>
  )
}

export default TeacherPage