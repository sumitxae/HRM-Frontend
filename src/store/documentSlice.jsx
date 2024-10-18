import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/api';

export const fetchDocuments = createAsyncThunk('documents/fetchDocuments', async () => {
  const response = await axios.get('/api/documents');
  return response.data;
});

export const uploadDocument = createAsyncThunk('documents/uploadDocument', async (documentData) => {
  const response = await axios.post('/api/documents', documentData);
  return response.data;
});

export const updateDocument = createAsyncThunk('documents/updateDocument', async ({ id, updatedData }) => {
  const response = await axios.put(`/api/documents/${id}`, updatedData);
  return response.data;
});

export const deleteDocument = createAsyncThunk('documents/deleteDocument', async (id) => {
  await axios.delete(`/api/documents/${id}`);
  return id;
});

const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.documents.push(action.payload);
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.documents = state.documents.filter(doc => doc._id !== action.payload);
      });
  },
});

export default documentSlice.reducer;
