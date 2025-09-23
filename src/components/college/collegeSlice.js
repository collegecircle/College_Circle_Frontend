// src/components/college/collegeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Fetch all colleges
// export const fetchColleges = createAsyncThunk(
//   "colleges/fetchColleges",
//   async (params, { rejectWithValue }) => {
//     try {
//       const { page = 1, limit = 10, search = "" } = params;
//       const queryParams = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//       });

//       if (search && search.trim()) {
//         queryParams.append("search", search.trim()); // Adjust to 'status' if needed
//       }

//       // Update this endpoint to match your backend route
//       // const url = `${API_BASE_URL}/colleges?${queryParams.toString()}`; // Try this first
//       // Alternatives:
//       const url = `${API_BASE_URL}/colleges/all-colleges-list?${queryParams.toString()}`;
//       // const url = `${API_BASE_URL}/getAllColleges?${queryParams.toString()}`;

//       console.log("Fetching colleges from:", url); // Debug log to verify URL

//       const res = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Add Authorization if required, e.g.:
//           // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
//         },
//       });

//       if (!res.ok) {
//         let errorMessage = "Unknown error";
//         try {
//           const errorData = await res.json();
//           errorMessage =
//             errorData.message || `HTTP ${res.status} ${res.statusText}`;
//         } catch {
//           errorMessage = `HTTP ${res.status} ${res.statusText}`;
//         }
//         throw new Error(`Failed to fetch colleges: ${errorMessage}`);
//       }

//       const response = await res.json();
//       if (!response.data || !response.success) {
//         throw new Error(
//           "Invalid response structure: Missing data or success field"
//         );
//       }

//       return response.data; // Returns { page, limit, count, colleges }
//     } catch (error) {
//       console.error("Error in fetchColleges:", error);
//       return rejectWithValue(error.message || "Failed to fetch colleges");
//     }
//   }
// );

export const fetchColleges = createAsyncThunk(
  "colleges/fetchColleges",
  async (params, { rejectWithValue }) => {
    try {
      const {
        page = 1,
        limit = 10,
        search = "",
        city = "",
        stream = "",
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search && search.trim()) {
        queryParams.append("search", search.trim());
      }

      if (city && city.trim() && city !== "All Cities") {
        queryParams.append("city", city.trim());
      }

      if (stream && stream.trim() && stream !== "All Streams") {
        queryParams.append("stream", stream.trim());
      }
      const url = `${API_BASE_URL}/colleges/all-colleges-list?${queryParams.toString()}`;

      console.log("Fetching colleges from:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        let errorMessage = "Unknown error";
        try {
          const errorData = await res.json();
          errorMessage =
            errorData.message || `HTTP ${res.status} ${res.statusText}`;
        } catch {
          errorMessage = `HTTP ${res.status} ${res.statusText}`;
        }
        throw new Error(`Failed to fetch colleges: ${errorMessage}`);
      }

      const response = await res.json();
      if (!response.data || !response.success) {
        throw new Error(
          "Invalid response structure: Missing data or success field"
        );
      }

      // ✅ Ensure cities always exists
      // return;
      // ...response,
      // cities: response.data.cities || [],
      return response.data;
    } catch (error) {
      console.error("Error in fetchColleges:", error);
      return rejectWithValue(error.message || "Failed to fetch colleges");
    }
  }
);

// Get college by ID
export const getCollegeById = createAsyncThunk(
  "colleges/getCollegeById",
  async (id) => {
    const res = await fetch(`${API_BASE_URL}/colleges/get-colleges/${id}`);
    if (!res.ok) throw new Error("Failed to fetch college");
    return await res.json();
  }
);

// Create college
export const createCollege = createAsyncThunk(
  "colleges/createCollege",
  async (collegeData) => {
    const res = await fetch(`${API_BASE_URL}/colleges/create-college`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collegeData),
    });
    if (!res.ok) throw new Error("Failed to create college");
    return await res.json();
  }
);

// Update college
export const updateCollege = createAsyncThunk(
  "colleges/updateCollege",
  async ({ id, collegeData }) => {
    const res = await fetch(`${API_BASE_URL}/colleges/update-college/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...collegeData }),
    });
    if (!res.ok) throw new Error("Failed to update college");
    return await res.json();
  }
);

// Delete college
export const deleteCollege = createAsyncThunk(
  "colleges/deleteCollege",
  async (id) => {
    const res = await fetch(`${API_BASE_URL}/colleges/delete-college/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete college");
    return { id };
  }
);

const collegesSlice = createSlice({
  name: "colleges",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColleges.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColleges.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchColleges.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Get College By ID
      .addCase(getCollegeById.pending, (state) => {
        state.current = null;
        state.error = null;
      })
      .addCase(getCollegeById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.error = null;
      })
      .addCase(getCollegeById.rejected, (state, action) => {
        state.current = null;
        state.error = action.payload;
      })

      .addCase(createCollege.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCollege.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteCollege.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload.id);
      })
      .addCase("colleges/loading", (state) => {
        state.status = "loading";
      });
  },
});

export default collegesSlice.reducer;
