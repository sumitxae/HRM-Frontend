import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavBar from '../../layout/admin/AdminNavBar';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/authSlice';
import numeral from 'numeral';
import moment from 'moment';
import { randomColor } from '../../../utils/generateColor';

const AdminDashboard = () => {
  const dispatch = useDispatch(); //
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.auth.employee);
  const employees = useSelector((state) => state.employee.employees);
  
  const leaveRequests = useSelector((state) => state.leave.requests);

  
  const records = useSelector(state => state.payroll.records);
  const payrolls = records.reduce((acc, record) => acc + record.salary, 1);
  
  // console.log(employees, leaveRequests, admin, user, records, payrolls);
  const stats = [
    { title: 'Employees', value: employees.length, bgColor: 'bg-blue-500' },
    { title: 'Payrolls this month', value: records.length, bgColor: 'bg-orange-500' },
    { title: 'Leave Requests', value: leaveRequests.length, bgColor: 'bg-red-500' },
    { title: 'Salary', value: `$${numeral(payrolls).format('0.0a')}`, bgColor: 'bg-green-500' },
  ];

  const employeesByDepartment = employees
    .filter(employee => employee.department !== 'HR')
    .map(employee => ({ name: employee.user.name, department: employee.department }));

    // console.log(employeesByDepartment)

  const upcomingLeaves = admin.leaveRecords
    .filter(record => new Date(record.startDate) > new Date())
    .map(record => {
      if (record.status === 'approved') {
        return {
          date: moment(record.startDate).format('MMM DD, YYYY'),
          color: 'bg-green-500',
          status: 'Approved',
        };
      } else if (record.status === 'pending') {
        return {
          date: moment(record.startDate).format('MMM DD, YYYY'),
          color: 'bg-yellow-500',
          status: 'Pending',
        };
      } else {
        return {
          date: moment(record.startDate).format('MMM DD, YYYY'),
          color: 'bg-red-500',
          status: 'Rejected',
        };
      }
    });
    
  
  
  return (
    <>
      <div className="flex">
        <AdminNavBar />

        <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Welcome {user.name}</h2>
            <div className="flex items-center space-x-4">
              <p>{moment(Date.now()).format('ddd, MMM DD, YYYY')}</p>
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
            <h1>Admin Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {stats.map((stat) => (
              <div key={stat.title} className={`${stat.bgColor} text-white p-6 rounded-md`}>
                <h3 className="text-lg">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">set Tax</button>
            <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">set location</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md transition-transform transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-4 text-blue-600">Employees by department</h3>
              <ul className="space-y-2">
                {employeesByDepartment.map((employee, index) => (
                  index < 5 ? <li key={employee.name} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition">
                    <div className="flex items-center">
                      <span className="px-4 py-2 rounded-full text-white" style={{ backgroundColor: randomColor() }}>{employee.name.charAt(0)}</span>
                      <span className="font-medium ml-2">{employee.name}</span>
                      <span className="ml-2 text-gray-500">{employee.department}</span>
                    </div>
                  </li> : null
                )) }
              </ul>
            </div>

            <div className="bg-white p-6 rounded-md shadow-md">
              <h3 className="text-lg font-semibold mb-4">Your Upcoming Leave</h3>
              <ul>
                {upcomingLeaves.map((leave, index) => (
                  index < 5 ? <li key={leave.date} className="flex items-center justify-between mt-2 mb-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`${leave.color} rounded-full px-2 py-1 text-white text-xl mr-3`}>
                        <i className="ri-calendar-line"></i>
                      </span>
                      <span>{leave.date}</span>
                      <span>{leave.status}</span>
                    </div>
                  </li> : null
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default AdminDashboard;
