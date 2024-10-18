import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';

// Fetch all performance reviews
export const fetchPerformanceReviews = createAsyncThunk('performance/fetchReviews', async () => {
  const response = await axios.get('/api/performance');
  return response.data;
});

// Add a new performance review
export const addPerformanceReview = createAsyncThunk('performance/addReview', async (reviewData) => {
  const response = await axios.post('/api/performance', reviewData);
  return response.data;
});

const performanceSlice = createSlice({
  name: 'performance',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPerformanceReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchPerformanceReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPerformanceReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload); // Add the newly created review
      });
  },
});

export default performanceSlice.reducer;
