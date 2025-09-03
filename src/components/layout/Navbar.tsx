import Logo from "@/assets/icons/Logo"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/Button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { ModeToggler } from "./ModeToggler"
import { Link } from "react-router"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useDispatch } from "react-redux"
import { role } from "@/constants/role"


// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home",role:'PUBLIC' },
  { href: "/about", label: "About", role:'PUBLIC'},
  { href: "/admin", label: "Dashboard",role: role.admin},
  { href: "/user", label: "Dashboard", role:role.user},


]

export default function Navbar() {
  const[logout]=useLogoutMutation()

  const dispatch= useDispatch()

   const { data}=useUserInfoQuery(undefined)

    console.log('me',data)

   

     const handleLogout= async ()=>{

      await logout(undefined)
      dispatch(authApi.util.resetApiState())
       
       


     }

 

  return (
    <header className="border-b">
      <div className=" container  mx-auto  px-4   flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                       
                        className="py-1.5"
                       
                      >
                        <Link to={link.href}> {link.label}</Link>
                       
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <> 
                   {link.role==='PUBLIC'  &&  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                   
                     
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>
                        {link.label}
                      </Link>
                    
                    </NavigationMenuLink>
                  </NavigationMenuItem>}
                  
                   {link.role===data?.data?.role  &&  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                   
                     
                      className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                    >
                      <Link to={link.href}>
                        {link.label}
                      </Link>
                    
                    </NavigationMenuLink>
                  </NavigationMenuItem>}


                 
            
                   
                  </>
                  
                 
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">

        <ModeToggler/>

        { data?.data?.email?( <Button  variant="outline"  onClick={handleLogout} className="text-sm">
          Logout
          </Button>):( <Button asChild  className="text-sm">
           <Link to={'/login'}>Login</Link>
          </Button>)
         
        }
        
         
          
        </div>
      </div>
    </header>
  )
}
