import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';

// Fetch all leave requests
export const fetchLeaveRequests = createAsyncThunk('leave/fetchRequests', async () => {
  const response = await axios.get('/api/leave');
  return response.data;
});

// Request a new leave
export const requestLeave = createAsyncThunk('leave/requestLeave', async (leaveData) => {
  const response = await axios.post('/api/leave', leaveData);
  return response.data;
});

// Approve or Reject leave
export const updateLeaveStatus = createAsyncThunk('leave/updateStatus', async ({ leaveId, status }, {dispatch}) => {
  const response = await axios.patch(`/api/leave/${leaveId}/status`, {status});
  dispatch(fetchLeaveRequests());
  return response.data;
});

const leaveSlice = createSlice({
  name: 'leave',
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchLeaveRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestLeave.fulfilled, (state, action) => {
        state.requests.push(action.payload); // Add the newly requested leave
      })
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const index = state.requests.findIndex((leave) => leave._id === action.payload._id);
        if (index !== -1) {
          state.requests[index] = action.payload; // Update the leave request status
        }
      });
  },
});

export default leaveSlice.reducer;
