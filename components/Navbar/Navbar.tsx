import React from 'react'
import Link from 'next/link'
import NavBarLeftDefault from '@/components/Navbar/NavBarLeftDefault'
import NavRoleBaseAccess from '@/components/Navbar/NavRoleBaseAccess';
import { getRole } from '@/services/role/getRole';


const NavBar =async () => {
  const role = await getRole()
  return (
    <div className="w-full flex justify-between gap-2 ">
      <Link href="/">SchoolManage</Link>
      <div className='flex gap-2'>
        <NavBarLeftDefault />
        <NavRoleBaseAccess role={role}/>
      </div>
    </div>
  );
}

export default NavBar