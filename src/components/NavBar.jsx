const navList = ['Home', 'About', 'Projects', 'Technologies']
export default function Navbar({targetIndex, setTargetIndex}) {
  return (
<nav className="bg-transparent absolute top-0 z-10 w-100">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    
    <div className="w-full block md:w-auto" id="navbar-default">
      <ul className="font-medium flex p-4 mt-1 rounded-lg flex-row md:space-x-8 rtl:space-x-reverse justify-between">
        {
            navList.map((nav, i) => (
                <li onClick={() => setTargetIndex(i)} key={i}>
                    <a href="#" className={`block py-2 px-3 rounded-sm ${targetIndex === i ? 'text-blue-700' : 'text-white '} hover:text-blue-700 md:p-0`} aria-current="page">{nav}</a>
                </li>
            ))
        }
      </ul>
    </div>
  </div>
</nav>

  )
}
