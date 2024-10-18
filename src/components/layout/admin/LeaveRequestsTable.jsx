import React from 'react';

const LeaveRequestsTable = ({ leaveRequests, onApprove, onReject }) => {
  if (!leaveRequests || leaveRequests.length === 0) {
    return <p>Loading leave requests...</p>; 
  }

  const renderStatus = (status) => {
    const statusClasses = {
      pending: 'text-yellow-500',
      approved: 'text-green-500',
      denied: 'text-red-500',
    };
    return <span className={statusClasses[status] || ''}>{status}</span>;
  };

  const renderActions = (request) => (
    <div className='flex justify-center space-x-2'>
      <button
        onClick={() => onApprove(request._id)}
        disabled={request.status === 'approved'}
        className={`rounded-md px-3 py-1 ${
          request.status === 'approved'
            ? 'bg-gray-400'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        Approve
      </button>
      <button
        onClick={() => onReject(request._id)}
        disabled={request.status === 'denied'}
        className={`rounded-md px-3 py-1 ${
          request.status === 'denied'
            ? 'bg-gray-400'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        Reject
      </button>
    </div>
  );

  return (
    <div className='my-8 w-full'>
      <h2 className='mb-4 text-2xl font-semibold'>Leave Requests</h2>
      <table className='min-w-full rounded-lg border border-gray-200 bg-white shadow-md'>
        <thead className='bg-gray-50'>
          <tr>
            {[
              'Employee Name',
              'Leave Type',
              'Start Date',
              'End Date',
              'Reason',
              'Status',
              'Actions',
            ].map((header) => (
              <th
                key={header}
                className='border-b px-4 py-3 text-left text-sm font-semibold text-gray-600'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request._id} className='hover:bg-gray-100'>
              <td className='py-3 px-4 border-b'>
                {request.employee?.user?.name
                  ? request.employee.user.name.charAt(0).toUpperCase() +
                    request.employee.user.name.slice(1)
                  : 'Unknown'}
              </td>
              <td className='py-3 px-4 border-b capitalize'>
                {request.leaveType || 'N/A'}
              </td>
              <td className='py-3 px-4 border-b'>
                {request.startDate
                  ? new Date(request.startDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td className='py-3 px-4 border-b'>
                {request.endDate
                  ? new Date(request.endDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td className='py-3 px-4 border-b'>{request.reason || 'N/A'}</td>
              <td
                className={`py-3 px-4 border-b ${
                  request.status === 'pending'
                    ? 'text-yellow-500'
                    : request.status === 'approved'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {renderStatus(request.status)}
              </td>
              <td className='py-3 px-4 border-b'>{renderActions(request)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestsTable;
