// src/redux/slices/jobsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base URL
const BASE_URL = "http://127.0.0.1:5001/collegecircle-ce36d/us-central1/api";

// Thunks
export const fetchJobs = createAsyncThunk("/getJobs", async () => {
  const res = await fetch(`${BASE_URL}/jobs/getJobs`);
  return await res.json();
});

// fetchJobById
export const fetchJobById = createAsyncThunk("/getJobById", async (jobId) => {
  const res = await fetch(`${BASE_URL}/jobs/getJobById${jobId}`);
  return await res.json();
});



// Slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.loadingJob = true;
        state.selectedJob = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loadingJob = false;
        state.selectedJob = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loadingJob = false;
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
