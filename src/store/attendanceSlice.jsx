import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';


export const fetchAttendanceRecords = createAsyncThunk('attendance/fetchRecords', async () => {
  const response = await axios.get('/api/attendance');
  // console.log(response.data);
  return response.data;
});

// Check in with location
export const checkIn = createAsyncThunk('attendance/checkIn', async ({ employeeId, location }) => {
  const response = await axios.post(`/api/attendance/check-in`, {
    employeeId,
    location, // Send the location to the backend
  });
  return response.data;
});

// Check out with location
export const checkOut = createAsyncThunk('attendance/checkOut', async ({ employeeId, location }) => {
  const response = await axios.post(`/api/attendance/check-out`, {
    employeeId,
    location, // Send the location to the backend
  });
  return response.data;
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendanceRecords: [],
    myattendanceRecords: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords.push(action.payload);
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.attendanceRecords = action.payload;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceRecords = action.payload;
      })
      .addCase(fetchAttendanceRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
