import React from 'react'
import { Route, Routes } from 'react-router'
import Loginpage from '../components/pages/admin/Loginpage'
import IndexDashboard from '../components/pages/admin/IndexDashboard'
import AdminDashboard from '../components/pages/admin/AdminDashboard'
import EmployeDashboard from '../components/pages/admin/EmployeDashboard'
import AdminAttendance from '../components/pages/admin/AdminAttandance'
import PayrollAdminPanel from '../components/layout/PayrollAdminPanel'
import AdminProfile from '../components/pages/admin/AdminProfile'
import AdminLeave from '../components/pages/admin/AdminLeave'
import AdminEmployeProfile from '../components/pages/admin/AdminEmployeProfile'

const IndexRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<IndexDashboard/>}/>
        <Route path='/login-employee' element/>
        <Route path='/signin-employee' element/>
        <Route path='/admin-login' element={<Loginpage/>}/>
        <Route path='/signin-admin' element/>
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin-employees' element={<EmployeDashboard/>}/>
        <Route path='/admin-attandance' element={<AdminAttendance/>}/>
        <Route path='/admin-payroll' element={<PayrollAdminPanel/>}/>
        <Route path='/admin-profile' element={<AdminProfile/>}/>
        <Route path='/admin-leave' element={<AdminLeave/>}/>
        <Route path='/admin-employee-profile' element={<AdminEmployeProfile/>}/>

        
    </Routes>
  )
}

export default IndexRouter
