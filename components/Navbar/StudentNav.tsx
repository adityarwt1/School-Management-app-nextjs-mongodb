import Link from 'next/link'
import React from 'react'
import NavigationButton from './NavigationButton'

const StudentNav = () => {
  return (
    <div className='text-white'>
      <Link href='/noticeManagement'>
        <NavigationButton  title='Notice Management'/>
      </Link>
    </div>
  );
}

export default StudentNav