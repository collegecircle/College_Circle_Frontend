// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 Send OTP
export const sendOtp = createAsyncThunk("auth/sendOtp", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/get-otp`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok || data.success !== 1) {
      return thunkAPI.rejectWithValue(data.message || "Failed to send OTP");
    }

    return data.message; // "OTP already sent. Please check your email."
  } catch (err) {
    return thunkAPI.rejectWithValue(
      "Network error. Please check your connection."
    );
  }
});

// 🔹 Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otp, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await res.json();
      if (!res.ok || data.success !== 1) {
        return thunkAPI.rejectWithValue(data.message || "Invalid OTP");
      }

      // ✅ your API returns { "data": { "role": "admin" } }
      const userData = {
        role: data.data?.role || null,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }
  }
);

// 🔹 Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    isOtpSent: false,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpSent = true;
        state.success = action.payload; // success message
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "OTP verified successfully";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isOtpSent = false;
        state.error = null;
        state.success = null;
      });
  },
});

export const { resetMessages } = authSlice.actions;
export default authSlice.reducer;
