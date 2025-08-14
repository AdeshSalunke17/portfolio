import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector(state => state.user);
  return (
    <nav className="bg-transparent text-white shadow-md fixed top-0 left-0 w-full z-50 h-21">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">{user?.userData?.userFullName}</h1>
          {/* <img 
            src={user?.userData?.profileURL}  // Replace with your image URL
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-white"
          /> */}
        </div>
      </div>
    </nav>
  )
}

export default Header