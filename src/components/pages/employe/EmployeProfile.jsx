import React, { useState } from 'react'
import EmployeeNavBar from '../../layout/Employe/EmployeeNavBar';

const EmployeProfile = () => {
        
    const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex">
    <EmployeeNavBar/>

    <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Welcome employee name</h2>
        <div className="flex items-center space-x-4">
          <p>Sun, 29 Nov 2019</p>
          <div className="relative">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User" 
              className="rounded-full cursor-pointer" 
              onClick={() => setShowMenu(!showMenu)} 
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

    



    

    </div>
  </div>
  )
}

export default EmployeProfile
