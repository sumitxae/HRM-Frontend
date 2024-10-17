import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

const Employeee = () => {
  

  const employees = [
    {
      name: 'Sean Black',
      manager: 'Richard Wilson',
      team: 'Design',
      office: 'Focus Technologies',
      permissions: 'Team Lead',
      status: 'Active',
    },
    {
      name: 'Linda Craver',
      manager: 'Richard Wilson',
      team: 'iOS',
      office: 'Focus Technologies',
      permissions: 'Team Lead',
      status: 'Inactive',
    },
    {
      name: 'Jenni Sims',
      manager: 'Richard Wilson',
      team: 'Android',
      office: 'Focus Technologies',
      permissions: 'Team Lead',
      status: 'Active',
    },
  ];

  return (
    <div className="container mx-auto bg-white p-6 mt-8 rounded-md shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Project Summary</h2>
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">+ Add Person</button>
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
              {['Name', 'Line Manager', 'Team', 'Office', 'Permissions', 'Status'].map((header) => (
                <th key={header} className="py-4 px-6 font-semibold text-gray-700">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 flex items-center">
                  <NavLink to="/admin-employee-profile" className=" hover:underline">{employee.name}</NavLink>
                </td>
                <td className="py-4 px-6">
                  <a href="#" className="text-blue-500 hover:underline">{employee.manager}</a>
                </td>
                <td className="py-4 px-6">
                  <span className="py-1 px-3 bg-orange-100 text-orange-600 rounded">{employee.team}</span>
                </td>
                <td className="py-4 px-6">{employee.office}</td>
                <td className="py-4 px-6">{employee.permissions}</td>
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