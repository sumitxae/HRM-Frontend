import React, { useState } from 'react';

const Leave = () => {
  const [leaveType, setLeaveType] = useState('');
  const [toDate, setToDate] = useState('');
  const [halfDay, setHalfDay] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [reason, setReason] = useState(''); // Added state for reason
  console.log(leaveType);
  

  return (
    <div className="w-full h- flex items-center justify-center mt-8">
      <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Apply Leaves</h2>

        <div className="mb-4">
          <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
          <select 
            id="leaveType" 
            value={leaveType} 
            onChange={(e) => setLeaveType(e.target.value)} 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Select leave</option>
            <option>Casual leave</option>
            <option>Earned leave</option>
          </select>
        </div>

        <div className="flex justify-between mb-4">
          <InputField id="remainingLeaves" label="Remaining Leaves" value="10" readOnly />
          <InputField id="toDate" label="To" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>

        <div className="mb-4">
          <label htmlFor="halfDay" className="block text-sm font-medium text-gray-700 mb-2">Half Day</label>
          <select 
            id="halfDay" 
            value={halfDay} 
            onChange={(e) => setHalfDay(e.target.value)} 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Select</option>
            <option>First Half</option>
            <option>Second Half</option>
          </select>
        </div>

        <div className="flex justify-between mb-4">
          <InputField id="remainingLeavesAfter" label="Remaining Leaves" value="2" readOnly />
          <InputField id="fromDate" label="From" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
          <textarea 
            id="reason" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            rows="3" 
            placeholder="Enter the reason for leave"
          />
        </div>

        <div className="flex justify-between mt-6">
          <ActionButton label="Apply" color="green" />
          <ActionButton label="Cancel" color="red" />
        </div>
      </div>
    </div>
  );
};

const InputField = ({ id, label, value, readOnly, type = 'text', onChange }) => (
  <div className="w-1/2 px-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input 
      id={id} 
      type={type} 
      value={value} 
      readOnly={readOnly} 
      onChange={onChange} 
      className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
    />
  </div>
);

const ActionButton = ({ label, color }) => (
  <button className={`bg-${color}-500 text-white px-4 py-2 rounded-md hover:bg-${color}-600 focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-opacity-50`}>
    {label}
  </button>
);

export default Leave;
