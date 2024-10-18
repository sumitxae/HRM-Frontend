import React, { useState } from 'react'
import EmployeeNavBar from '../../layout/Employe/EmployeeNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/authSlice';

const EmployeDashboardM = () => {
  const [showMenu, setShowMenu] = useState(false); // Define showMenu state
  const user = useSelector((state) => state.auth.user); // Get user from redux store
  const employee = useSelector((state) => state.auth.employee); // Get employee from redux store
  const dispatch = useDispatch()

  const stats = [
    { title: 'Overtime Hours', value: employee.overtimeHours, bgColor: 'bg-blue-500' },
    { title: 'Department', value: employee.department, bgColor: 'bg-orange-500' },
    { title: 'Leave', value: employee.leaveRecords.length, bgColor: 'bg-red-500' },
    { title: 'Salary', value: '$5.8M', bgColor: 'bg-green-500' },
  ];

  const recentActivities = [
    { user: 'John Doe', time: '2 hours ago' },
    { user: 'Jane Smith', time: '3 hours ago' },
    { user: 'Alice Johnson', time: '4 hours ago' },
    { user: 'Bob Brown', time: '5 hours ago' },
  ];

  const upcomingLeaves = [
    { date: 'Mon, 16 Dec 2021', color: 'bg-red-500' },
    { date: 'Fri, 20 Dec 2021', color: 'bg-green-500' },
    { date: 'Wed, 25 Dec 2021', color: 'bg-red-500' },
    { date: 'Fri, 27 Dec 2021', color: 'bg-green-500' },
    { date: 'Tue, 31 Dec 2021', color: 'bg-green-500' },
  ];

  return (
    <div className="flex">
      <EmployeeNavBar />

      <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Welcome {user.name}</h2>
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
                    <li onClick={() => dispatch(logout())} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className='w-full h-20 flex items-center justify-between px-5 rounded-2xl mt-4 shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.3),0_4px_10px_rgba(0,0,0,0.3)]'>
          <h1 className='text-lg'><i className="ri-home-line"></i> home / Dashboard</h1>
          <h1>Employee Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {stats.map((stat) => (
            <div key={stat.title} className={`${stat.bgColor} text-white p-6 rounded-md`}>
              <h3 className="text-lg">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">

          <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Recent Activities</h3>
            <ul className="space-y-2">
              {recentActivities.map((activity) => (
                <li key={activity.time} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition">
                  <div className="flex items-center">
                    <img src="https://via.placeholder.com/40" alt="User" className="rounded-full w-10 h-10 mr-3" />
                    <span className="font-medium">{activity.user}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Upcoming Leave</h3>
            <ul>
              {upcomingLeaves.map((leave) => (
                <li key={leave.date} className="flex items-center justify-between mt-2 mb-2">
                  <div className="flex items-center">
                    <span className={`${leave.color} rounded-full p-2 text-white text-xl mr-3`}>
                      <i className="ri-calendar-line"></i>
                    </span>
                    <span>{leave.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>


      </div>
    </div>



  )
}

export default EmployeDashboardM
