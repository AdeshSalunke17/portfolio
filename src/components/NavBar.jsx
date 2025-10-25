import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

const navList = [
  {
    label : 'Home',
    pathname : '/'
  },
  {
    label : 'About',
    pathname : '/about'
  },
  {
    label : 'Projects',
    pathname : '/projects'
  },
  {
    label : 'Contact',
    pathname : '/contact'
  }
]
export default function Navbar() {
  const {pathname} = useLocation();
  return (
<nav className="bg-transparent absolute top-0 z-50 w-100">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <div className="w-full block md:w-auto" id="navbar-default">
      <ul className="font-medium flex p-4 mt-1 rounded-lg flex-row md:space-x-8 rtl:space-x-reverse justify-between">
        {
            navList.map((nav, i) => (
                <li key={i}>
                    <Link to={nav.pathname} className={`block py-2 px-3 rounded-sm ${pathname === nav.pathname ? 'text-blue-700' : 'text-white '} hover:text-blue-700 md:p-0`}>{nav.label}</Link>
                </li>
            ))
        }
      </ul>
    </div>
  </div>
</nav>

  )
}
