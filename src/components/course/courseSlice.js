// src/redux/slices/courseMaterialsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL;

// ------------------ Thunks ------------------

// Fetch all materials
export const fetchCourseMaterials = createAsyncThunk(
  "materials/fetchCourseMaterials",
  async (params = {}) => {
    const { page = 1, limit = 5, search = "" } = params;
    const query = new URLSearchParams({ page, limit });
    if (search) query.append("search", search);

    const res = await fetch(
      `${BASE_URL}/course-materials/getCourseMaterials?${query.toString()}`
    );
    const data = await res.json();
    if (data.success !== 1) {
      throw new Error(data.message || "Failed to fetch course materials");
    }
    return data.data; // { page, limit, count, materials }
  }
);

// Fetch material by ID
export const fetchCourseMaterialById = createAsyncThunk(
  "materials/fetchCourseMaterialById",
  async (id) => {
    const res = await fetch(
      `${BASE_URL}/course-materials/getCourseMaterialById/${id}`
    );
    const data = await res.json();
    return data?.data || null;
  }
);

// Create new material
export const createCourseMaterial = createAsyncThunk(
  "materials/createCourseMaterial",
  async (materialData) => {
    const res = await fetch(
      `${BASE_URL}/course-materials/createCourseMaterial`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      }
    );
    const data = await res.json();
    return data?.data || data;
  }
);

// Update material
export const updateCourseMaterial = createAsyncThunk(
  "materials/updateCourseMaterial",
  async ({ id, materialData }) => {
    const res = await fetch(
      `${BASE_URL}/course-materials/updateCourseMaterial/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(materialData),
      }
    );
    const data = await res.json();
    return data?.data || data;
  }
);

// Delete material
export const deleteCourseMaterial = createAsyncThunk(
  "materials/deleteCourseMaterial",
  async (id) => {
    await fetch(`${BASE_URL}/course-materials/deleteCourseMaterial/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

// Register user to material
export const registerUserToCourseMaterial = createAsyncThunk(
  "materials/registerUserToCourseMaterial",
  async ({ courseMaterialId, userId }) => {
    const res = await fetch(
      `${BASE_URL}/course-materials/registerUserToCourseMaterial`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseMaterialId, userId }),
      }
    );
    const data = await res.json();
    return { courseMaterialId, userId, response: data };
  }
);

// ------------------ Slice ------------------

const courseMaterialsSlice = createSlice({
  name: "materials",
  initialState: {
    list: [],
    selectedMaterial: null,
    status: "idle",
    loadingMaterial: false,
    error: null,
    pagination: { page: 1, limit: 5, count: 0 },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchCourseMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.materials;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          count: action.payload.count,
        };
      })
      .addCase(fetchCourseMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // fetch by ID
      .addCase(fetchCourseMaterialById.pending, (state) => {
        state.loadingMaterial = true;
        state.selectedMaterial = null;
      })
      .addCase(fetchCourseMaterialById.fulfilled, (state, action) => {
        state.loadingMaterial = false;
        state.selectedMaterial = action.payload;
      })
      .addCase(fetchCourseMaterialById.rejected, (state, action) => {
        state.loadingMaterial = false;
        state.error = action.error.message;
      })

      // create
      .addCase(createCourseMaterial.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.push(action.payload);
          state.pagination.count += 1;
        }
      })

      // update
      .addCase(updateCourseMaterial.fulfilled, (state, action) => {
        const index = state.list.findIndex((m) => m.id === action.payload?.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // delete
      .addCase(deleteCourseMaterial.fulfilled, (state, action) => {
        state.list = state.list.filter((m) => m.id !== action.payload);
        state.pagination.count -= 1;
      })

      // register user
      .addCase(registerUserToCourseMaterial.fulfilled, (state, action) => {
        const { courseMaterialId, userId } = action.payload;
        const material = state.list.find((m) => m.id === courseMaterialId);
        if (material) {
          if (!material.registeredMembers) material.registeredMembers = [];
          if (!material.registeredMembers.includes(userId)) {
            material.registeredMembers.push(userId);
          }
        }
      });
  },
});

export default courseMaterialsSlice.reducer;
