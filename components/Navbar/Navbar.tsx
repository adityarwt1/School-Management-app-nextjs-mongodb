import { TokentInteface } from '@/interfaces/Token/tokenInterface'
import { TokenServices } from '@/services/Token/token'
import React from 'react'
import StudentNav from '@/components/Navbar/StudentNav'
import Link from 'next/link'
import PrincipleNav from './PrincipleNav'
import { mongoconnect } from '@/lib/mongodb'
import LogOutButton from './LogOutButton'
import NavigationButton from './NavigationButton'

const Navbar = async () => {
    const tokeServices = new TokenServices()
    const tokenInfo = await tokeServices.getTokenInfo() as TokentInteface

    const isConnected = await mongoconnect()

    if(!isConnected){
        throw new Error("Internal server issue.")
    }
   
    return (
      <div className="flex px-6 py-3 items-center justify-between border border-black/15 bg-[#112A46] shadow-md ">
        <h1 className="text-2xl font-black text-white">SMA</h1>
        <div className='flex gap-1'>
          {tokenInfo && tokenInfo?.role == "student" && <StudentNav />}
            { tokenInfo && tokenInfo?.role === "principle" && <PrincipleNav govt={tokenInfo?.govt as boolean}/>}
            {!tokenInfo && (
            <Link href="/principleLogin" prefetch={true} className='text-white'>
              <NavigationButton title='SignIn'/>
            </Link>
            )}
           {!tokenInfo && (
            <Link href="/principleRegister" prefetch={true} className='text-white'>
              <NavigationButton  title='SignUp'/>
              </Link>
            )}{
             tokenInfo &&(
              <LogOutButton/>
              )
            }
        </div>
      </div>
    );
}

export default Navbar