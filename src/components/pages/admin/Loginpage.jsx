import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../../layout/Login';
// import Signin from '../../layout/Login';

const Loginpage = () => {
  return (
    <div className='h-full w-full flex bg-white'> {/* Changed bg color to white */}
      <div className='h-full w-[80%] p-9 overflow-hidden'>
        <img className='h-full w-[95%] rounded-3xl shadow-2xl object-cover object-center' src='https://images.unsplash.com/photo-1728588267038-9f36d7a74588?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="" />
      </div>
      <div className='h-full w-full flex items-center '>
        
         <Login title="Admin" root1="/admin-dashboard" root2={"/admin-dashboard"} />
          
      </div>
    </div>
  )
}

export default Loginpage
