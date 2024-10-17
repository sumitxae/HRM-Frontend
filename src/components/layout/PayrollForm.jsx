import React, { useEffect, useState } from 'react';

function PayrollForm({ addPayroll, selectedPayroll, updatePayroll }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    salary: '',
    tax: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (selectedPayroll) {
      setFormData({
        employeeId: selectedPayroll.employee,
        salary: selectedPayroll.salary,
        tax: selectedPayroll.tax,
        startDate: selectedPayroll.period.start,
        endDate: selectedPayroll.period.end,
      });
    }
  }, [selectedPayroll]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payrollData = {
      employee: formData.employeeId,
      salary: formData.salary,
      tax: formData.tax,
      period: { start: formData.startDate, end: formData.endDate },
    };

    if (selectedPayroll) {
      updatePayroll(payrollData);
    } else {
      addPayroll(payrollData);
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">{selectedPayroll ? 'Edit Payroll' : 'Add Payroll'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['employeeId', 'salary', 'tax', 'startDate', 'endDate'].map((field, index) => (
          <div className="flex flex-col" key={index}>
            <label htmlFor={field} className="mb-2 font-medium text-gray-700">
              {field === 'employeeId' ? 'Employee ID' : field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field.includes('Date') ? 'date' : 'text'}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          {selectedPayroll ? 'Update Payroll' : 'Add Payroll'}
        </button>
      </form>
    </div>
  );
}

export default PayrollForm;
