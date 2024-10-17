import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios'; // Uncommented axios import
import LeaveRequestsTable from './LeaveRequestsTable';

const LeaveRequestsAdmin = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/leaverequests');
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  }, []);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  const handleApprove = useCallback(async (id) => {
    try {
      await axios.put(`/api/leaverequests/${id}/approve`);
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  }, [fetchLeaveRequests]);

  const handleReject = useCallback(async (id) => {
    try {
      await axios.put(`/api/leaverequests/${id}/reject`);
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  }, [fetchLeaveRequests]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <LeaveRequestsTable
        leaveRequests={leaveRequests}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
}

export default LeaveRequestsAdmin;
