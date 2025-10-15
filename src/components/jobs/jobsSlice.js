// // src/redux/slices/jobsSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Base URL
// const BASE_URL = import.meta.env.VITE_API_URL;

// // ------------------ Thunks ------------------

// // Fetch all jobs
// export const fetchJobs = createAsyncThunk(
//   "jobs/fetchJobs",
//   async (params = {}) => {
//     const { page = 1, limit = 5, search = "" } = params;
//     const query = new URLSearchParams({ page, limit });
//     if (search) {
//       query.append("search", search);
//     }
//     const res = await fetch(`${BASE_URL}/jobs/getJobs?${query.toString()}`);
//     const data = await res.json();
//     if (data.success !== 1) {
//       throw new Error(data.message || "Failed to fetch jobs");
//     }
//     return data.data; // { page, limit, count, jobs }
//   }
// );

// // Fetch single job by ID
// export const fetchJobById = createAsyncThunk(
//   "jobs/fetchJobById",
//   async (jobId) => {
//     const res = await fetch(`${BASE_URL}/jobs/getJobById/${jobId}`);
//     const data = await res.json();
//     return data?.data || null; // ✅ unwrap from .data
//   }
// );

// // Create new job
// export const createJob = createAsyncThunk(
//   "/jobs/createJob",
//   async (jobData) => {
//     const res = await fetch(`${BASE_URL}/jobs/createJob`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(jobData),
//     });
//     const data = await res.json();
//     return data?.data || data; // depends on API response
//   }
// );

// // Update job
// export const updateJob = createAsyncThunk(
//   "jobs/updateJob",
//   async ({ id, jobData }) => {
//     const res = await fetch(`${BASE_URL}/jobs/updateJob/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(jobData),
//     });
//     const data = await res.json();
//     return data?.data || data;
//   }
// );

// // Delete job
// export const deleteJob = createAsyncThunk("/jobs/deleteJob", async (id) => {
//   await fetch(`${BASE_URL}/jobs/deleteJob/${id}`, { method: "DELETE" });
//   return id; // return deleted ID
// });

// // ------------------ Slice ------------------

// const jobsSlice = createSlice({
//   name: "jobs",
//   initialState: {
//     list: [],
//     selectedJob: null,
//     status: "idle",
//     loadingJob: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetchJobs
//       .addCase(fetchJobs.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchJobs.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.list = action.payload; // ✅ already array
//       })
//       .addCase(fetchJobs.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })

//       // fetchJobById
//       .addCase(fetchJobById.pending, (state) => {
//         state.loadingJob = true;
//         state.selectedJob = null;
//       })
//       .addCase(fetchJobById.fulfilled, (state, action) => {
//         state.loadingJob = false;
//         state.selectedJob = action.payload;
//       })
//       .addCase(fetchJobById.rejected, (state, action) => {
//         state.loadingJob = false;
//         state.error = action.error.message;
//       })

//       // createJob
//       .addCase(createJob.fulfilled, (state, action) => {
//         if (action.payload) {
//           state.list.push(action.payload);
//         }
//       })

//       // updateJob
//       .addCase(updateJob.fulfilled, (state, action) => {
//         const index = state.list.findIndex(
//           (job) => job.id === action.payload?.id
//         );
//         if (index !== -1) {
//           state.list[index] = action.payload;
//         }
//       })

//       // deleteJob
//       .addCase(deleteJob.fulfilled, (state, action) => {
//         state.list = state.list.filter((job) => job.id !== action.payload);
//       });
//   },
// });

// export default jobsSlice.reducer;

// src/redux/slices/jobsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Base URL
const BASE_URL = import.meta.env.VITE_API_URL;

// ------------------ Thunks ------------------

// Fetch all jobs
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 5, search = "" } = params;
      const query = new URLSearchParams({ page, limit });
      if (search) {
        query.append("search", search);
      }
      const res = await fetch(`${BASE_URL}/jobs/getJobs?${query.toString()}`);
      const data = await res.json();

      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to fetch jobs");
      }

      return data; // Return full response with data property
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Fetch single job by ID
export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/jobs/getJobById/${jobId}`);
      const data = await res.json();

      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to fetch job");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Create new job
export const createJob = createAsyncThunk(
  "jobs/createJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/jobs/createJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      const data = await res.json();

      // ✅ Check if the API call was successful
      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to create job");
      }

      return data.data; // Return the job data
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Update job
export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, jobData }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/jobs/updateJob/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      const data = await res.json();

      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to update job");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// Delete job
export const deleteJob = createAsyncThunk(
  "jobs/deleteJob",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/jobs/deleteJob/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to delete job");
      }

      return id; // Return deleted ID
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ------------------ Slice ------------------

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [], // Will store the full API response
    selectedJob: null,
    status: "idle", // idle | loading | succeeded | failed
    loadingJob: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchJobs
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // Store full response with data property
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // fetchJobById
      .addCase(fetchJobById.pending, (state) => {
        state.loadingJob = true;
        state.selectedJob = null;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loadingJob = false;
        state.selectedJob = action.payload;
        state.error = null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loadingJob = false;
        state.error = action.payload || action.error.message;
      })

      // createJob
      .addCase(createJob.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add new job to list if it exists
        if (action.payload && Array.isArray(state.list?.data?.jobs)) {
          state.list.data.jobs.push(action.payload);
          state.list.data.count = (state.list.data.count || 0) + 1;
        }
        state.error = null;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // updateJob
      .addCase(updateJob.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update job in list if it exists
        if (action.payload && Array.isArray(state.list?.data?.jobs)) {
          const index = state.list.data.jobs.findIndex(
            (job) => job.id === action.payload.id
          );
          if (index !== -1) {
            state.list.data.jobs[index] = action.payload;
          }
        }
        state.error = null;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // deleteJob
      .addCase(deleteJob.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        // Remove job from list
        if (Array.isArray(state.list?.data?.jobs)) {
          state.list.data.jobs = state.list.data.jobs.filter(
            (job) => job.id !== action.payload
          );
          state.list.data.count = Math.max((state.list.data.count || 1) - 1, 0);
        }
        state.error = null;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = jobsSlice.actions;
export default jobsSlice.reducer;
