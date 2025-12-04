import { Role } from '@/types/role'
import Link from 'next/link'
import React from 'react'

interface RoleInterface{
    role:Role
}
const NavRoleBaseAccess:React.FC<RoleInterface> = ({role}) => {
  return (
    <div className='flex '>
        <Link href={role == "principle" ? "/principledashboard" :role== "teacher" ? "/teacherDashboard" :"/studentDashBoard"}>DashBoard</Link>
    </div>
  )
}

export default NavRoleBaseAccess