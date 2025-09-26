// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../components/jobs/jobsSlice";
import authReducer from "../components/adminDashboard/authSlice";
import collegesReducer from "../components/college/collegeSlice";
import courseMaterialsReducer from "../components/course/courseSlice";
import onlineCoursesReducer from "../components/OnlineCourseUser/onlineCourseSlice";
import announcementsReducer from "../components/userannouncements/announcementSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    colleges: collegesReducer,
    materials: courseMaterialsReducer,
    onlineCourses: onlineCoursesReducer,
    announcements: announcementsReducer,
    auth: authReducer,
  },
});
