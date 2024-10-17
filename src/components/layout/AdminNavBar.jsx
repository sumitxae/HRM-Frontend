import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminNavBar = () => {
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

export default AdminNavBar
