import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';


// Fetch all payroll records
export const fetchPayrollRecords = createAsyncThunk('payroll/fetchRecords', async () => {
  const response = await axios.get('/api/payroll');
  return response.data;
});

// Generate payslip
export const generatePayslip = createAsyncThunk('payroll/generatePayslip', async (payslipData) => {
  const response = await axios.post('/api/payroll/generate', payslipData);
  return response.data;
});

const payrollSlice = createSlice({
  name: 'payroll',
  initialState: {
    records: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayrollRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayrollRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchPayrollRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generatePayslip.fulfilled, (state, action) => {
        state.records.push(action.payload); // Add the newly generated payslip
      });
  },
});

export default payrollSlice.reducer;
