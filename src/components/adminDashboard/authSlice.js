// // src/redux/authSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const API_BASE_URL = import.meta.env.VITE_API_URL;

// // 🔹 Send OTP
// export const sendOtp = createAsyncThunk("auth/sendOtp", async (_, thunkAPI) => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/admin/get-otp`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();
//     if (!res.ok || data.success !== 1) {
//       return thunkAPI.rejectWithValue(data.message || "Failed to send OTP");
//     }

//     return data.message; // "OTP already sent. Please check your email."
//   } catch (err) {
//     return thunkAPI.rejectWithValue(
//       "Network error. Please check your connection."
//     );
//   }
// });

// // 🔹 Verify OTP
// export const verifyOtp = createAsyncThunk(
//   "auth/verifyOtp",
//   async (otp, thunkAPI) => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ otp }),
//       });

//       const data = await res.json();
//       if (!res.ok || data.success !== 1) {
//         return thunkAPI.rejectWithValue(data.message || "Invalid OTP");
//       }

//       // ✅ your API returns { "data": { "role": "admin" } }
//       const userData = {
//         role: data.data?.role || null,
//         loginTime: new Date().toISOString(),
//       };

//       localStorage.setItem("userRole", userData.role);
//       localStorage.setItem("userData", JSON.stringify(userData));

//       return userData;
//     } catch (err) {
//       return thunkAPI.rejectWithValue("Network error. Please try again.");
//     }
//   }
// );

// // 🔹 Logout
// export const logout = createAsyncThunk("auth/logout", async () => {
//   localStorage.removeItem("userRole");
//   localStorage.removeItem("userData");
//   return null;
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: JSON.parse(localStorage.getItem("userData")) || null,
//     isOtpSent: false,
//     loading: false,
//     error: null,
//     success: null,
//   },
//   reducers: {
//     resetMessages: (state) => {
//       state.error = null;
//       state.success = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 🔹 Send OTP
//       .addCase(sendOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(sendOtp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isOtpSent = true;
//         state.success = action.payload; // success message
//       })
//       .addCase(sendOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🔹 Verify OTP
//       .addCase(verifyOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(verifyOtp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.success = "OTP verified successfully";
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🔹 Logout
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//         state.isOtpSent = false;
//         state.error = null;
//         state.success = null;
//       });
//   },
// });

// export const { resetMessages } = authSlice.actions;
// export default authSlice.reducer;

// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 Send OTP (Admin)
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

    return data.message;
  } catch {
    return thunkAPI.rejectWithValue(
      "Network error. Please check your connection."
    );
  }
});

// 🔹 Verify OTP (Admin)
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

      const userData = {
        role: data.data?.role || null,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("userData", JSON.stringify(userData));

      return userData;
    } catch {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }
  }
);

// 🔹 Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("userRole");
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
  return null;
});

// 🔹 Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Registration failed");
      }
      return data;
    } catch {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }
  }
);

// 🔹 Verify User OTP
export const verifyUserOtp = createAsyncThunk(
  "auth/verifyUserOtp",
  async (otpData, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-user-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(otpData),
      });

      const data = await res.json();
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Invalid OTP");
      }
      return data;
    } catch {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }
  }
);

// 🔹 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Login failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || data.success !== 1) {
        return thunkAPI.rejectWithValue(data.message || "Failed to send OTP");
      }
      return { email, message: data.message };
    } catch {
      return thunkAPI.rejectWithValue(
        "Network error. Please check your connection."
      );
    }
  }
);

// 🔹 Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password, otp }, thunkAPI) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });
      const data = await res.json();
      if (!res.ok || data.success !== 1) {
        return thunkAPI.rejectWithValue(data.message || "Password reset failed");
      }
      return { email, message: data.message };
    } catch {
      return thunkAPI.rejectWithValue("Network error. Please try again.");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    token: localStorage.getItem("token") || null,
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
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.isOtpSent = true;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isOtpSent = false;
      })

      // Register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify User OTP
      .addCase(verifyUserOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(verifyUserOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpSent = true;
        state.forgotEmail = action.payload.email;
        state.success = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isOtpSent = false;
        state.forgotEmail = null;
        state.success = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
export const { resetMessages } = authSlice.actions;

export default authSlice.reducer;
