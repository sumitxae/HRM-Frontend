import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidenav = () => {

  const feedLinks = [
    { label: 'HR Management', iconClass: 'ri-briefcase-line' },
    { label: 'Employee Management', iconClass: 'ri-user-2-line' },
    { label: 'Report Management', iconClass: 'ri-file-list-line' },
    { label: 'Attendance', iconClass: 'ri-calendar-check-line' },
    // { label: 'Time Tracking', iconClass: 'ri-time-line' },
    { label: 'Report', iconClass: 'ri-bar-chart-box-line' },
    { label: 'Analytics', iconClass: 'ri-pie-chart-line' },
    { label: 'Onboarding', iconClass: 'ri-user-add-line' },
  ];



  return (
    <div className='w-[20%] h-full border-r-4 z-50 bg-white border-zinc-400  rounded-b-3xl '>
        <h1 className='text-4xl text-center pt-5'>
            <span className='text font-semibold '>Name logo</span>
        </h1>

        <div className='flex justify-center flex-col mt-5 items-center gap-3 '>
            <img src='https://i.pravatar.cc/150' alt='Profile Pic' className='rounded-full border-8 w-36 h-36'/>
            <div className='flex justify-center items-center flex-col'>
            <h1 className=' text-2xl font-semibold text-center'>Username </h1>
            <span className=' text-center text-sm font-semibold'>@Username</span>
            </div>
        </div>
        <hr className='border-none my-3 mx-4 h-1 bg-slate-500' />

    <div className=' overflow-hidden '>
        <nav className='flex flex-col text-xl text-zinc-500 gap-3'>
        {feedLinks.map((feed, index) => (
          <NavLink 
            key={index} 
            className='gello hover:bg-[#F48401] hover:text-white py-4 px-4 mr-5 rounded-r-full duration-200 font-medium'>
            <i className={`mr-2 ${feed.iconClass}`}></i>{feed.label}
          </NavLink>
        ))}
      </nav>

      

    </div>

    </div>
  )
}

export default Sidenav
