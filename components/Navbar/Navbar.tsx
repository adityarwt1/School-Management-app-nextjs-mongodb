import React from 'react'
import Link from 'next/link'
import { getRole } from '@/services/role/getRole';
import {NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu"

const NavBar =async () => {
  const role = await getRole()
  return (
    <div className="w-full bg--400 flex justify-between px-4 border-b shadow-2xl">
      <NavigationMenu className="flex w-full p-4 justify-between items-center ">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" className="text-2xl font-bold">
              SMA
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          {role === "guest" && (
            <NavigationMenuItem className="list-none">
              <NavigationMenuLink
                asChild
                className="rounded-full px-5 text-black hover:bg-zinc-900 hover:text-white duration-300 transition-all"
              >
                <Link href="/login" className="border rounded-full">
                  Sign UP
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}

          {role === "principle" && (
            <NavigationMenuItem className="list-none">
              <NavigationMenuLink
                asChild
                className="rounded-full px-5 text-black hover:bg-zinc-900 hover:text-white duration-300 transition-all"
              >
                <Link href="/principledashboard" className="border rounded-full">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {role === "student" && (
            <NavigationMenuItem className="list-none">
              <NavigationMenuLink
                asChild
                className="rounded-full px-5 text-black hover:bg-zinc-900 hover:text-white duration-300 transition-all"
              >
                <Link href="/principledashboard" className="border rounded-full">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          {role === "teacher" && (
            <NavigationMenuItem className="list-none">
              <NavigationMenuLink
                asChild
                className="rounded-full px-5 text-black hover:bg-zinc-900 hover:text-white duration-300 transition-all"
              >
                <Link href="/principledashboard" className="border rounded-full">
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}



   

export default NavBar