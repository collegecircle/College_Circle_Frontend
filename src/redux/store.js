// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../components/jobs/jobsSlice";
// import collegesReducer from "./slices/collegesSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    // colleges: collegesReducer,
  },
});
