import React from 'react';

const payslips = [
  { employee: 'EMP001', salary: 3000, tax: 300, period: { start: '2023-01-01', end: '2023-01-31' } },
  { employee: 'EMP002', salary: 3200, tax: 320, period: { start: '2023-02-01', end: '2023-02-28' } },
  { employee: 'EMP003', salary: 3100, tax: 310, period: { start: '2023-03-01', end: '2023-03-31' } },
  { employee: 'EMP001', salary: 3000, tax: 300, overtime: 200, period: { start: '2023-01-01', end: '2023-01-31' } },
  { employee: 'EMP002', salary: 3200, tax: 320, overtime: 250, period: { start: '2023-02-01', end: '2023-02-28' } },
  { employee: 'EMP003', salary: 3100, tax: 310, overtime: 300, period: { start: '2023-03-01', end: '2023-03-31' } },
  // Add more payslip data as needed
];

const formatPeriod = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleString('default', { month: 'long' })} - ${endDate.toLocaleString('default', { month: 'long' })} ${startDate.getFullYear()}`;
};

const EmployePayrollayout = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Payroll Table</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Employee ID</th>
            <th className="py-3 px-6 text-left">Salary</th>
            <th className="py-3 px-6 text-left">Tax</th>
            <th className="py-3 px-6 text-left">Overtime</th>
            <th className="py-3 px-6 text-left">Period</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {payslips.map((payslip, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{payslip.employee}</td>
              <td className="py-3 px-6">{payslip.salary}</td>
              <td className="py-3 px-6">{payslip.tax}</td>
              <td className="py-3 px-6">{payslip.overtime ? payslip.overtime : 0}</td>
              <td className="py-3 px-6">{formatPeriod(payslip.period.start, payslip.period.end)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployePayrollayout;
