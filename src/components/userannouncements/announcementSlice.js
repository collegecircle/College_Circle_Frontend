// src/redux/slices/onlineCoursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const BASE_URL = import.meta.env.VITE_API_URL;

const BASE_URL = "http://127.0.0.1:5001/collegecircle-ce36d/us-central1/api";

// ------------------ Thunks ------------------

export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, search = "" } = params;
      const limit = 6;

      const query = new URLSearchParams({ page, limit });
      if (search) query.append("search", search);

      const res = await fetch(
        `${BASE_URL}/announcements/get-announcements?${query.toString()}`
      );

      const data = await res.json();

      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to fetch announcements");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch course by ID
export const fetchOnlineCourseById = createAsyncThunk(
  "onlineCourses/fetchOnlineCourseById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/online-courses/get-online-course-by-id/${id}`
      );
      const data = await res.json();
      return data?.data || null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new course
export const createAnnouncement = createAsyncThunk(
  "onlineCourses/createOnlineCourse",
  async (announcementData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/announcements/create-announcement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcementData),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update course
export const updateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
  async ({ id, values }, { rejectWithValue }) => {
    console.log("Updating announcement ID:", id, "with data:", values);
    try {
      const res = await fetch(
        `${BASE_URL}/announcements/update-announcement/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete course
export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${BASE_URL}/announcements/delete-announcement/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ------------------ Slice ------------------

const announcementsSlice = createSlice({
  name: "announcements",
  initialState: {
    list: [],
    selectedAnnouncement: null,
    status: "idle", // loading state for list
    loadingAnnouncement: false, // loading state for single announcement
    error: null,
    pagination: { page: 1, limit: 10, count: 0 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.announcements;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          count: action.payload.count,
        };
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      //   // Fetch by ID
      //   .addCase(fetchOnlineCourseById.pending, (state) => {
      //     state.loadingCourse = true;
      //     state.selectedCourse = null;
      //   })
      //   .addCase(fetchOnlineCourseById.fulfilled, (state, action) => {
      //     state.loadingCourse = false;
      //     state.selectedCourse = action.payload;
      //   })
      //   .addCase(fetchOnlineCourseById.rejected, (state, action) => {
      //     state.loadingCourse = false;
      //     state.error = action.payload || action.error.message;
      //   })

      // Create
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.push(action.payload);
          state.pagination.count += 1;
        }
      })

      // Update
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload?.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
        state.pagination.count -= 1;
      });
  },
});

export default announcementsSlice.reducer;
