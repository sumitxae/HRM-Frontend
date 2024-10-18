import React, { useState } from 'react';
import EmployeDashboardM from '../pages/employe/EmployeDashboardM';
import { useSelector } from 'react-redux';

const Profile = () => {
  const employee = useSelector(state => state.auth.employee); 

  return (
    <div className="w-full h-full flex items-center justify-center mt-8">
      <div className="w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img 
            src="https://i.pravatar.cc/150" 
            alt="Profile" 
            className="rounded-full w-32 h-32 border-4 border-gray-300" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{employee.user.name}</label>
          <input 
            type="text" 
            value={employee.user.name} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            value={employee.user.email} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            value={employee.user.password} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input 
            type="text" 
            value={employee.department} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
          <input 
            type="text" 
            // value={userInfo.contact} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Leave Information</label>
          <input 
            type="text" 
            // value={userInfo.leaveInfo} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payroll</label>
          <input 
            type="text" 
            // value={userInfo.payroll} 
            readOnly 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
