import  React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
   
import { cn } from '@/lib/utils';
import { useToast } from './ui/use-toast';
 
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
export function Navbar() {
  const {toast} = useToast();
  const navigate = useNavigate()
  const userData = {
    name:"Test",

  }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the type of dropdownRef
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Specify the type of mobileMenuRef
  const mobileMenuRef2 = useRef<HTMLDivElement>(null); // Specify the type of mobileMenuRef2

  // Close dropdown when clicking outside of it
  useEffect(() => {



    function handleClickOutside(event: MouseEvent) { // Specify the type of event
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) { // Cast event.target to Node
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef2.current && !mobileMenuRef2.current.contains(event.target as Node)) { // Cast event.target to Node
        setIsMobileMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) { // Cast event.target to Node
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, mobileMenuRef, mobileMenuRef2]);

  return (
    <nav className='w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to='/' className='flex z-40 font-semibold'>
                <span className='ml-1'>Vidgrounds AI</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link to='/pricing' className='flex z-40 '>
                  <span className='ml-1 font-semibold my-auto'>Pricing</span>
                </Link>
                <Link to='/services' className='flex z-40 font-semibold'>
                  
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger><p className='ml-1 text-sm font-semibold my-auto'>Services</p></NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>


                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {userData? (
              <>
                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>
                
                <div className="relative ml-5" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    type="button" className="relative rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">{userData?.name}</span>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-7 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-1 focus:outline-none transition transform scale-100 opacity-100" role="menu" aria-orientation="vertical">
                      <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
                      <a href="/pricing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Pricing</a>
                      <a onClick={()=>{
                        localStorage.removeItem('auth')
                        toast({
                          title:"Signed Out"
                        })
                        navigate("/login")
                      }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                    </div>
                  )}
                </div> 
              </>
            ) : (
              <>
              <Link to='/register' className='flex z-40 sm:text-md text-sm'>
                 <span className='mr-1'>Register</span>
              </Link> 
              <Link to='/login' className='flex z-40 sm:text-md text-sm'>
                 <span className='mr-1'>Login</span>
              </Link> 
              </>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
}








const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"