import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';
import { fetchLeaveRequests } from './leaveSlice';
import { fetchEmployees } from './employeeSlice';
import { fetchPayrollRecords } from './payrollSlice';

// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data; // expecting { user, token }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      if (response.data.role === 'hr') {
        dispatch(fetchEmployees());
        dispatch(fetchLeaveRequests(Date.now()));
        dispatch(fetchPayrollRecords())
        // // console.log('hr');
      }
      return response.data; // expecting { user, token }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  employee: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        state.user = action.payload.details.user;
        state.employee = action.payload.details;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Dispatch actions to other slices if necessary
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.loading = false;
        state.employee = action.payload.details;
        state.user = action.payload.details.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // Dispatch actions to other slices if necessary
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
