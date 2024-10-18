import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';
import { fetchPayrollRecords } from './payrollSlice';

// Fetch employees
export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/employees');
    return response.data; // expecting [{...employee1}, {...employee2}]
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchEmployeeDetails = createAsyncThunk('employee/fetchEmployeeDetails', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/employees/${id}`);
    return response.data; // expecting employee object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Add new employee
export const addEmployee = createAsyncThunk('employee/addEmployee', async (employeeData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/employees', employeeData);
    return response.data; // expecting newly created employee object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Update employee
export const updateEmployee = createAsyncThunk('employee/updateEmployee', async ({ hourlyRate, user, contactDetails, jobRole }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(`/api/employees/create-or-update`, {userName: user.name, contactDetails, jobRole, hourlyRate});
    dispatch(fetchPayrollRecords());
    return response.data; // expecting updated employee object
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Delete employee
export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/employees/${id}`);
    return { id }; // returning the deleted employee ID
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    currentEmployee: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchEmployeeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEmployee = action.payload;
      })
      .addCase(fetchEmployeeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update employee
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.employees.findIndex(emp => emp._id === action.payload._id);
        state.employees[index] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = state.employees.filter(emp => emp._id !== action.payload.id);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
