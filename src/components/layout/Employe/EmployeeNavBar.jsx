import React from 'react'
import { NavLink } from 'react-router-dom'

const EmployeeNavBar = () => {
    const navItems = [
        { name: 'Dashboard', href: '/employee-dashboard', icon: 'ri-dashboard-line' },
        { name: 'Attendance', href: '/employee-attendance', icon: 'ri-time-line' },
        { name: 'Leave', href: '/employee-leave', icon: 'ri-plane-line' },
        { name: 'Profile', href: '/employee-profile', icon: 'ri-user-3-line' },
        { name: 'Payroll', href: '/employee-payroll', icon: 'ri-money-dollar-circle-line' },
        
      ];

  return (
    <aside className="w-64 border-r-4 fixed bg-white h-screen shadow-2xl">
    <div className="p-4">
      <h1 className="text-xl font-bold text-blue-500">StarGame</h1>
    </div>
    <nav className="mt-8">
      {navItems.map((item) => (
        <NavLink  
          key={item.name} 
          to={item.href} 
          
          className={`block py-5 px-6 text-gray-700 text-2xl mr-5 rounded-r-full hover:bg-blue-100 active:bg-blue-200 ${item.isActive ? 'bg-blue-300' : ''}`}
        >
          <i className={`${item.icon} mr-2 bg-slate-400 p-1 rounded-lg`}></i>
          {item.name}
        </NavLink>
      ))}
    </nav>
  </aside>
  )
}

export default EmployeeNavBar
