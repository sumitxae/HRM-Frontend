import React from 'react'
import { NavLink } from 'react-router-dom'

const IndexDashboard = () => {
  return (
    <div className='w-screen h-screen z-50 absolute top-0 flex flex-col items-center justify-center'>
    <p className="mb-4 text-lg text-center">Please select an option below:</p>
    <NavLink 
    
        to="/admin-login" 
        className="bg-blue-600 text-white px-6 py-3 rounded-md mb-4 hover:bg-blue-700"
    >
        Admin Login
    </NavLink>
    <NavLink 
        to="/employee-login" 
        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
    >
        Employee Login
    </NavLink>
</div>
  )
}

export default IndexDashboard
