import React from 'react'
import Login from '../../layout/Login'

const EmplloyeLoginpage = () => {
      return (
    <div className='h-full w-full flex bg-white'>
      <div className='h-full w-[80%] p-9 overflow-hidden'>
        <img className='h-full w-[95%] rounded-3xl shadow-2xl object-cover object-center' src='https://images.unsplash.com/photo-1728588267038-9f36d7a74588?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="" />
      </div>
      <div className='h-full w-full flex items-center '>
        <Login title="employee" root1="/employee-dashboard" root2="/employee-dashboard" />
      </div>
    </div>
  )
}

export default EmplloyeLoginpage
