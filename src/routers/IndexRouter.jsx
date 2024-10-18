import React from 'react'
import { Route, Routes } from 'react-router'
import Loginpage from '../components/pages/admin/Loginpage'
import IndexDashboard from '../components/pages/admin/IndexDashboard'
import AdminDashboard from '../components/pages/admin/AdminDashboard'
import EmployeDashboard from '../components/pages/admin/EmployeDashboard'
import AdminAttendance from '../components/pages/admin/AdminAttandance'
import PayrollAdminPanel from '../components/layout/admin/PayrollAdminPanel'
import AdminProfile from '../components/pages/admin/AdminProfile'
import AdminLeave from '../components/pages/admin/AdminLeave'
import AdminEmployeProfile from '../components/pages/admin/AdminEmployeProfile'
import EmployeDashboardM from '../components/pages/employe/EmployeDashboardM'
import EmployeAttendance from '../components/pages/employe/EmployeAttendance'
import EmployeProfile from '../components/pages/employe/EmployeProfile'
import EmployeLeave from '../components/pages/employe/EmployeLeave'
import EmployPayroll from '../components/pages/employe/EmployPayroll'
import EmplloyeLoginpage from '../components/pages/employe/EmplloyeLoginpage'
import ProtectedRoute from '../components/ProtectedRoute'


const IndexRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<IndexDashboard />} />
      <Route path='/employee-login' element={<EmplloyeLoginpage />} />
      <Route path='/signin-employee' element />
      <Route path='/admin-login' element={<Loginpage />} />
      <Route path='/signin-admin' element />

      {/* admin routes */}
      <Route path='/admin-dashboard' element={<ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>} />
      <Route path='/admin-employees' element={<ProtectedRoute><EmployeDashboard /></ProtectedRoute>} />
      <Route path='/admin-attandance' element={<ProtectedRoute><AdminAttendance /></ProtectedRoute>} />
      <Route path='/admin-payroll' element={<ProtectedRoute><PayrollAdminPanel /></ProtectedRoute>} />
      <Route path='/admin-profile' element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
      <Route path='/admin-leave' element={<ProtectedRoute><AdminLeave /></ProtectedRoute>} />
      <Route path='/admin-employee-profile/:id' element={<ProtectedRoute><AdminEmployeProfile /></ProtectedRoute>} />

      {/* employee routes */}
      <Route path='/employee-dashboard' element={<ProtectedRoute><EmployeDashboardM /></ProtectedRoute>} />
      <Route path='/employee-attendance' element={<ProtectedRoute><EmployeAttendance /></ProtectedRoute>} />
      <Route path='/employee-profile' element={<ProtectedRoute><EmployeProfile /></ProtectedRoute>} />
      <Route path='/employee-leave' element={<ProtectedRoute><EmployeLeave /></ProtectedRoute>} />
      <Route path='/employee-payroll' element={<ProtectedRoute><EmployPayroll /></ProtectedRoute>} />




    </Routes >
  )
}

export default IndexRouter
