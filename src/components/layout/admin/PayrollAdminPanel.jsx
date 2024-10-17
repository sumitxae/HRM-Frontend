import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import PayrollForm from './PayrollForm';
import PayrollTable from './PayrollTable';
import AdminNavBar from './AdminNavBar';
// import axios from 'axios';

function PayrollAdminPanel() {
    const [showMenu, setShowMenu] = useState(false);
    // Define showMenu state
   
  
  const [payrolls, setPayrolls] = useState([]);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    const response = await axios.get('/api/payrolls');
    setPayrolls(response.data);
  };

  const addPayroll = async (payrollData) => {
    await axios.post('/api/payrolls', payrollData);
    fetchPayrolls();
  };

  const updatePayroll = async (payrollData) => {
    await axios.put(`/api/payrolls/${selectedPayroll._id}`, payrollData);
    setSelectedPayroll(null);
    fetchPayrolls();
  };

  const deletePayroll = async (payrollId) => {
    await axios.delete(`/api/payrolls/${payrollId}`);
    fetchPayrolls();
  };

  const handleEdit = (payroll) => {
    setSelectedPayroll(payroll);
  };

  return (
<div className="flex">
        <AdminNavBar/>

        <div className="flex-1 p-6 absolute top-0 right-0 w-[85%] bg-gray-50">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Welcome Admin</h2>
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
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </header>

       
        <div className="p-8 bg-gray-100 min-h-screen">
      <PayrollForm
        addPayroll={addPayroll}
        selectedPayroll={selectedPayroll}
        updatePayroll={updatePayroll}
      />
      <PayrollTable
        payrolls={payrolls}
        onEdit={handleEdit}
        onDelete={deletePayroll}
      />
    </div>
        

        </div>
      </div>

    
  );
}

export default PayrollAdminPanel;
