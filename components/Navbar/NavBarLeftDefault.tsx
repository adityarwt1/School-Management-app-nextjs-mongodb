import Link from 'next/link'
import React from 'react'

const NavBarLeftDefault = () => {
  return (
    <div className='flex gap-2'>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
    </div>
  )
}

export default NavBarLeftDefault