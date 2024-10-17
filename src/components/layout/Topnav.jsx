import React from 'react'

const Topnav = () => {
  return (
    
    <div className='flex justify-between bg-[#F48401] items-center h-14 w-full px-4'>
        
        <h1 className='text-white text-2xl text-center font-bold'>Employee Management / <span className='text-lg font-medium'>loog</span></h1>
        <button className='bg-white text-[#F48401] py-1 px-4 rounded font-medium hover:bg-gray-200 duration-200'>Logout</button>

    </div>
  
  )
}

export default Topnav
