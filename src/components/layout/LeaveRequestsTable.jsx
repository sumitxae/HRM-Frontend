import React from 'react';

const LeaveRequestsTable = ({ leaveRequests, onApprove, onReject }) => {
  // Static data for demonstration
  const staticData = [
    {
      _id: '1',
      employee: 'E001',
      leaveType: 'Sick Leave',
      startDate: '2023-10-01',
      endDate: '2023-10-05',
      reason: 'Flu',
      status: 'approved',
    },
    {
      _id: '2',
      employee: 'E002',
      leaveType: 'Vacation',
      startDate: '2023-10-10',
      endDate: '2023-10-15',
      reason: 'Family trip',
      status: 'pending',
    },
    {
      _id: '3',
      employee: 'E003',
      leaveType: 'Casual Leave',
      startDate: '2023-10-20',
      endDate: '2023-10-22',
      reason: 'Personal work',
      status: 'denied',
    },
  ];

  const combinedRequests = [...leaveRequests, ...staticData];

  const renderStatus = (status) => {
    const statusClasses = {
      pending: 'text-yellow-500',
      approved: 'text-green-500',
      denied: 'text-red-500',
    };
    return <span className={statusClasses[status] || ''}>{status}</span>;
  };

  const renderActions = (request) => (
    <div className="flex justify-center space-x-2">
      <button
        onClick={() => onApprove(request._id)}
        disabled={request.status === 'approved'}
        className={`px-3 py-1 rounded-md ${request.status === 'approved' ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600 text-white'}`}
      >
        Approve
      </button>
      <button
        onClick={() => onReject(request._id)}
        disabled={request.status === 'denied'}
        className={`px-3 py-1 rounded-md ${request.status === 'denied' ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600 text-white'}`}
      >
        Reject
      </button>
    </div>
  );

  return (
    <div className="w-full my-8">
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            {['Employee ID', 'Leave Type', 'Start Date', 'End Date', 'Reason', 'Status', 'Actions'].map((header) => (
              <th key={header} className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-600">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {combinedRequests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{request.employee}</td>
              <td className="py-3 px-4 border-b capitalize">{request.leaveType}</td>
              <td className="py-3 px-4 border-b">{new Date(request.startDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{new Date(request.endDate).toLocaleDateString()}</td>
              <td className="py-3 px-4 border-b">{request.reason}</td>
              <td className={`py-3 px-4 border-b ${request.status === 'pending' ? 'text-yellow-500' : request.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                {renderStatus(request.status)}
              </td>
              <td className="py-3 px-4 border-b">
                {renderActions(request)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveRequestsTable;
