import React, { useState } from 'react';
import CustomeModal from '../CustomeModal';

function PayrollTable({ payrolls, onEdit, onDelete }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [hourlyRate, setHourlyRate] = useState('');

  const handleEditClick = (payroll) => {
    setCurrentEmployee(payroll);
    setHourlyRate(''); // Reset hourly rate input
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (currentEmployee) {
      onEdit(currentEmployee, hourlyRate);
      setCurrentEmployee(null);
      setModalOpen(false);
    }
  };

  return (
    <div className='mx-auto my-8 max-w-4xl'>
      <h2 className='mb-4 text-2xl font-semibold'>Employee Payroll Records</h2>
      <table className='min-w-full rounded-lg border border-gray-200 bg-white shadow-md'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'>Employee ID</th>
            <th className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'>Hourly Rate</th>
            <th className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'>Salary</th>
            <th className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'>Tax</th>
            <th className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'>Period Start</th>
            <th className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'>Period End</th>
            <th className='border-b px-4 py-3 text-center text-sm font-semibold text-gray-600'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map(payroll => (
            <tr key={payroll._id} className='hover:bg-gray-100'>
              <td className='border-b px-4 py-3'>{payroll.employee.user.name}</td>
              <td className='border-b px-4 py-3'>{payroll.employee.hourlyRate}</td>
              <td className='border-b px-4 py-3'>${payroll.salary}</td>
              <td className='border-b px-4 py-3'>${payroll.tax}</td>
              <td className='border-b px-4 py-3'>{new Date(payroll.period.start).toLocaleDateString()}</td>
              <td className='border-b px-4 py-3'>{new Date(payroll.period.end).toLocaleDateString()}</td>
              <td className='flex justify-center space-x-2 border-b px-4 py-3'>
                <button
                  onClick={() => handleEditClick(payroll?.employee)}
                  className='rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600'
                >
                  Edit Hourly Rate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomeModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setModalOpen(false)} 
        title="Edit Hourly Rate"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="hourlyRate" className="block mb-2">Hourly Rate</label>
          <input
            type="number"
            id="hourlyRate"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="border rounded-md w-full px-3 py-2"
            required
          />
        </div>
      </CustomeModal>
    </div>
  );
}

export default PayrollTable;
