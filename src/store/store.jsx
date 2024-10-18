import { configureStore } from '@reduxjs/toolkit';
import performanceReducer from './performanceSlice';
import payrollReducer from './payrollSlice';
import attendanceReducer from './attendanceSlice';
import documentReducer from './documentSlice';
import employeeReducer from './employeeSlice';
import authreducer from './authSlice';
import leaveReducer from './leaveSlice';

const store = configureStore({
  reducer: {
    auth: authreducer,
    employee: employeeReducer,
    document: documentReducer,
    attendance: attendanceReducer,
    payroll: payrollReducer,
    performance: performanceReducer,
    leave: leaveReducer,
  },
});

export default store;