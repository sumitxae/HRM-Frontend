import React from 'react';

function PayrollTable({ payrolls, onEdit, onDelete }) {
  // Sample data for demonstration
  const samplePayrolls = [
    {
      _id: '1',
      employee: 'E001',
      salary: 5000,
      tax: 500,
      period: {
        start: '2023-01-01',
        end: '2023-01-31',
      },
    },
    {
      _id: '2',
      employee: 'E002',
      salary: 6000,
      tax: 600,
      period: {
        start: '2023-01-01',
        end: '2023-01-31',
      },
    },
    {
      _id: '3',
      employee: 'E003',
      salary: 5500,
      tax: 550,
      period: {
        start: '2023-01-01',
        end: '2023-01-31',
      },
    },
  ];

  const payrollData = payrolls.length > 0 ? payrolls : samplePayrolls;

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">Employee Payroll Records</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Employee ID</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Salary</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Tax</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Period Start</th>
            <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">Period End</th>
            <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((payroll) => (
            <tr key={payroll._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{payroll.employee}</td>
              <td className="py-3 px-4 border-b">${payroll.salary}</td>
              <td className="py-3 px-4 border-b">${payroll.tax}</td>
              <td className="py-3 px-4 border-b">{new Date(payroll.period.start).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{new Date(payroll.period.end).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b flex justify-center space-x-2">
                <button
                  onClick={() => onEdit(payroll)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(payroll._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PayrollTable;
