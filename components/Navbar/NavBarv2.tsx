import React from 'react'
import {NavigationMenu} from '@base-ui-components/react/navigation-menu'

const NavBarv2 = () => {
  return (
    <NavigationMenu.Root className="bg-[#e0e0e0] py-3 px-5 text-black flex justify-between items-center">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link href='/' className="font-bold text-xl ">SMA</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.List>
        <NavigationMenu.Item className="flex gap-2">
       
            <NavigationMenu.Link href='/login' className="border px-2 rounded-2xl py-1 hover:bg-zinc-900 transition-all duration-300 hover:text-white ">
                Get Start
            </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export default NavBarv2