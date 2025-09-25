// src/redux/slices/onlineCoursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL;

// ------------------ Thunks ------------------

// Fetch all courses (with pagination + search)
export const fetchOnlineCourses = createAsyncThunk(
  "onlineCourses/fetchOnlineCourses",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, search = "" } = params; // no limit from params
      const limit = 6; // always 6 per page

      const query = new URLSearchParams({ page, limit });
      if (search) query.append("search", search);

      const res = await fetch(
        `${BASE_URL}/online-courses/get-online-courses?${query.toString()}`
      );
      const data = await res.json();

      if (data.success !== 1) {
        return rejectWithValue(data.message || "Failed to fetch courses");
      }
      return data.data; // { page, limit, count, courses }
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
export const createOnlineCourse = createAsyncThunk(
  "onlineCourses/createOnlineCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/online-courses/create-online-course`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update course
export const updateOnlineCourse = createAsyncThunk(
  "onlineCourses/updateOnlineCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    console.log("Updating course ID:", id, "with data:", courseData);
    try {
      const res = await fetch(
        `${BASE_URL}/online-courses/update-online-course/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
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
export const deleteOnlineCourse = createAsyncThunk(
  "onlineCourses/deleteOnlineCourse",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${BASE_URL}/online-courses/delete-online-course/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register user to a course
export const registerUserToOnlineCourse = createAsyncThunk(
  "onlineCourses/registerUserToOnlineCourse",
  async ({ courseId, userId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/online-courses/register-user-online-course`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, userId }),
        }
      );
      const data = await res.json();
      return { courseId, userId, response: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ------------------ Slice ------------------

const onlineCoursesSlice = createSlice({
  name: "onlineCourses",
  initialState: {
    list: [],
    selectedCourse: null,
    status: "idle", // loading state for list
    loadingCourse: false, // loading state for single course
    error: null,
    pagination: { page: 1, limit: 10, count: 0 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchOnlineCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOnlineCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.courses;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          count: action.payload.count,
        };
      })
      .addCase(fetchOnlineCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch by ID
      .addCase(fetchOnlineCourseById.pending, (state) => {
        state.loadingCourse = true;
        state.selectedCourse = null;
      })
      .addCase(fetchOnlineCourseById.fulfilled, (state, action) => {
        state.loadingCourse = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchOnlineCourseById.rejected, (state, action) => {
        state.loadingCourse = false;
        state.error = action.payload || action.error.message;
      })

      // Create
      .addCase(createOnlineCourse.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.push(action.payload);
          state.pagination.count += 1;
        }
      })

      // Update
      .addCase(updateOnlineCourse.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload?.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteOnlineCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
        state.pagination.count -= 1;
      })

      // Register user
      .addCase(registerUserToOnlineCourse.fulfilled, (state, action) => {
        const { courseId, userId } = action.payload;
        const course = state.list.find((c) => c.id === courseId);
        if (course) {
          if (!course.registeredUsers) course.registeredUsers = [];
          if (!course.registeredUsers.includes(userId)) {
            course.registeredUsers.push(userId);
          }
        }
      });
  },
});

export default onlineCoursesSlice.reducer;
