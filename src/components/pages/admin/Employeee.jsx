import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { fetchAttendanceRecords } from '../../../store/attendanceSlice';
import { logout } from '../../../store/authSlice';
// import { clearConfigCache } from 'prettier';

const Employeee = () => {
  const employeeDets = useSelector(state => state.employee.employees);
  // console.log(employeeDets.map(employee => employee._id));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAttendanceRecords());
  }, [dispatch]);
  const attendance = useSelector(state => state.attendance.attendanceRecords);
  
  attendance.map(record => console.log(record.employee._id)
  );
  // console.log(attendedEmployees);

  const today = new Date().toISOString().split('T')[0];
  const employees = employeeDets
    .filter(employee => employee.department !== 'HR')
    .map(employee => ({
      id: employee._id,
      name: employee.user.name,
      team: employee.department,
      status: attendance.some(record => record.employee._id === employee._id) ? 'Active' : 'Inactive',
      manager: 'Richard Wilson',
      office: 'Delhi'
    }));

 
 
  return (
    <div className="container mx-auto bg-white p-6 mt-8 rounded-md shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Project Summary</h2>
        {/* <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">+ Add Person</button> */}
      </div>

      {/* Filter Options */}
      <div className="flex space-x-4 mb-6">
        {['All'].map((filter) => (
          <button 
            key={filter} 
            className={`py-2 px-4  bg-blue-500 text-white rounded hover:bg-blue-600`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md">
          <thead>
            <tr className="w-full bg-gray-100 text-left">
              {['Name', 'Line Manager', 'Team', 'Status'].map((header) => (
                <th key={header} className="py-4 px-6 font-semibold text-gray-700">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 flex items-center">
                  <NavLink to={`/admin-employee-profile/${employee.id}`} className=" hover:underline">{employee.name}</NavLink>
                </td>
                <td className="py-4 px-6">
                  <a href="#" className="text-blue-500 hover:underline">{employee.manager}</a>
                </td>
                <td className="py-4 px-6">
                  <span className="py-1 px-3 bg-orange-100 text-orange-600 rounded">{employee.team}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`py-1 px-3 ${employee.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded border-none`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default Employeee;