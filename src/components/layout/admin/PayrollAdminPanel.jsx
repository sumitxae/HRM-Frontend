import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import PayrollForm from './PayrollForm'
import PayrollTable from './PayrollTable'
import AdminNavBar from './AdminNavBar'
import { logout } from '../../../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayrollRecords } from '../../../store/payrollSlice'
import { updateEmployee } from '../../../store/employeeSlice'
// import axios from 'axios';

function PayrollAdminPanel() {
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch()
  const payroll = useSelector(state => state.payroll.records) || []
  // console.log(payroll)
  const payrolls = payroll.reduce((acc, record) => {
    const id = record.employee._id
    if (!acc.some(payroll => payroll.employee?._id === id)) {
      acc.push(record)
    }
    return acc
  }, [])

  useEffect(() => {
    dispatch(fetchPayrollRecords())
  }, [])

  
  const handleEdit = (employee, hourlyRate) => {
    console.log(employee, hourlyRate)
    dispatch(updateEmployee({ ...employee, hourlyRate }))
  }

  return (
    <div className='flex'>
      <AdminNavBar />

      <div className='absolute right-0 top-0 w-[85%] flex-1 bg-gray-50 p-6'>
        <header className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold'>Welcome Admin</h2>
          <div className='flex items-center space-x-4'>
            <p>Sun, 29 Nov 2019</p>
            <div className='relative'>
              <img
                src='https://via.placeholder.com/40'
                alt='User'
                className='cursor-pointer rounded-full'
                onClick={() => setShowMenu(!showMenu)}
              />
              {showMenu && (
                <div className='absolute right-0 z-10 mt-2 w-48 rounded-md border bg-white shadow-lg'>
                  <ul className='py-1'>
                    <li className='cursor-pointer px-4 py-2 hover:bg-gray-100'>
                      Profile
                    </li>
                    <li className='cursor-pointer px-4 py-2 hover:bg-gray-100'>
                      Settings
                    </li>
                    <li
                      onClick={() => dispatch(logout())}
                      className='cursor-pointer px-4 py-2 hover:bg-gray-100'
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className='min-h-screen bg-gray-100 p-8'>
          {/* <PayrollForm
        addPayroll={addPayroll}
        selectedPayroll={selectedPayroll}
        updatePayroll={updatePayroll}
      /> */}
          <PayrollTable
            payrolls={payrolls}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  )
}

export default PayrollAdminPanel
