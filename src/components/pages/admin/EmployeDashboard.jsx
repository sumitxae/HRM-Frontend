import React, { useState } from 'react'
import Employeee from './Employeee'
import { NavLink } from 'react-router-dom';
import AdminNavBar from '../../layout/AdminNavBar';

const EmployeDashboard = () => {
  const [showMenu, setShowMenu] = useState(false); // Define showMenu state


    const navItems = [
      { name: 'Dashboard', href: '/admin-dashboard', icon: 'ri-dashboard-line' },
      { name: 'Employees', href: '/admin-employees', icon: 'ri-user-line' },
      { name: 'Company', href: '/admin-company', icon: 'ri-building-line' },
      { name: 'Attendance', href: '/admin-attandance', icon: 'ri-time-line' },
      { name: 'Leave', href: '/admin-leave', icon: 'ri-plane-line' },
      { name: 'Review', href: '/admin-review', icon: 'ri-file-list-2-line' },
      { name: 'Settings', href: '/admin-settings', icon: 'ri-settings-2-line' },
      { name: 'Profile', href: '/admin-profile', icon: 'ri-user-3-line' },
    ];
  
  return (
    <div className="flex">
    <AdminNavBar/>

    <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Welcome Admin</h2>
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

    <Employeee/>
    

    </div>
  </div>
  )
}

export default EmployeDashboard
