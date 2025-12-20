import Link from 'next/link'
import React from 'react'
import NavigationButton from './NavigationButton'

interface PrincipleNavProps{
  govt:boolean
}
const PrincipleNav :React.FC<PrincipleNavProps> = ({govt}) => {
  return (
    <div className='flex gap-2 text-white'>
        {govt && <Link href="/feesManagement" ><NavigationButton title='Fees Management'/></Link>}
        <Link href="/teacherManagement"><NavigationButton title='Teacher Management'/></Link>
        <Link href="/studentManagement"><NavigationButton title='Student Management'/></Link>
        <Link href="/noticeManagement"><NavigationButton title='Notice Management'/></Link>
    </div>
  )
}

export default PrincipleNav