import React, { useEffect, useState } from 'react';
import LeaveRequestsTable from './LeaveRequestsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaveRequests, updateLeaveStatus } from '../../../store/leaveSlice';

const LeaveRequestsAdmin = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const leaveRequests = useSelector((state) => state.leave.requests) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        await dispatch(fetchLeaveRequests());
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
      setLoading(false); // Set loading to false after fetching is done
    };
    fetchData();
  }, [dispatch]);

  const handleApprove = async (id) => {
    try {
      await dispatch(updateLeaveStatus({ leaveId: id, status: 'approved' })).unwrap();
      dispatch(fetchLeaveRequests()); // Optionally re-fetch the requests
    } catch (error) {
      console.error('Error approving leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await dispatch(updateLeaveStatus({ leaveId: id, status: 'denied' })).unwrap();
      dispatch(fetchLeaveRequests()); // Optionally re-fetch the requests
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  // If loading, show loading message, otherwise show the table
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {loading ? (
        <p>Loading leave requests...</p>
      ) : leaveRequests.length > 0 ? (
        <LeaveRequestsTable
          leaveRequests={leaveRequests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ) : (
        <p>No leave requests found.</p>
      )}
    </div>
  );
};

export default LeaveRequestsAdmin;
