// src/redux/slices/jobsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base URL
const BASE_URL = import.meta.env.VITE_API_URL;

// ------------------ Thunks ------------------

// Fetch all jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params = {}) => {
    const { page = 1, limit = 5, search = "" } = params;
    const query = new URLSearchParams({ page, limit });
    if (search) {
      query.append("search", search);
    }
    const res = await fetch(`${BASE_URL}/jobs/getJobs?${query.toString()}`);
    const data = await res.json();
    if (data.success !== 1) {
      throw new Error(data.message || "Failed to fetch jobs");
    }
    return data.data; // { page, limit, count, jobs }
  }
);

// Fetch single job by ID
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId) => {
    const res = await fetch(`${BASE_URL}/jobs/getJobById/${jobId}`);
    const data = await res.json();
    return data?.data || null; // ✅ unwrap from .data
  }
);

// Create new job
export const createJob = createAsyncThunk(
  "/jobs/createJob",
  async (jobData) => {
    const res = await fetch(`${BASE_URL}/jobs/createJob`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    const data = await res.json();
    return data?.data || data; // depends on API response
  }
);

// Update job
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }) => {
    const res = await fetch(`${BASE_URL}/jobs/updateJob/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });
    const data = await res.json();
    return data?.data || data;
  }
);

// Delete job
export const deleteJob = createAsyncThunk("/jobs/deleteJob", async (id) => {
  await fetch(`${BASE_URL}/jobs/deleteJob/${id}`, { method: "DELETE" });
  return id; // return deleted ID
});

// ------------------ Slice ------------------

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [],
    selectedJob: null,
    status: "idle",
    loadingJob: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // ✅ already array
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // fetchJobById
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
      })

      // createJob
      .addCase(createJob.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.push(action.payload);
        }
      })

      // updateJob
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (job) => job.id === action.payload?.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // deleteJob
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.list = state.list.filter((job) => job.id !== action.payload);
      });
  },
});

export default jobsSlice.reducer;
