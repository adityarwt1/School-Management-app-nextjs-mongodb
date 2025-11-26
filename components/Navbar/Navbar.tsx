import {NavigationMenu , NavigationMenuItem , NavigationMenuLink } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { ToggleTheme } from '../toggletheme'
const Navbar = () => {
  return (
    <NavigationMenu >
        <NavigationMenuItem>
            <NavigationMenuLink asChild>
                <Link href="/register">Login</Link>
            </NavigationMenuLink>
        </NavigationMenuItem>

        <ToggleTheme/>
    </NavigationMenu>
  )
}

export default Navbar