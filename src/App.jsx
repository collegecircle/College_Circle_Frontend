import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import Footer from "./components/footer/Footer";
import Splash from "./gobalComponents/SplashScreen";
import CollegesPage from "./components/college/CollegesPage";
import MaterialPage from "./components/course/CoursesPage";
import JobsPage from "./components/jobs/JobsPage";
import Navigation from "./components/Navigation";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UserLogin from "./components/adminDashboard/UserLogin"; // Admin login
import AuthContainer from "./components/auth/Login"; // User login
import { useDispatch } from "react-redux";
import { logout } from "./components/adminDashboard/authSlice";
import ForgotPassword from "./components/auth/ForgotPassword";
import ContactForm from "./components/faqs/Contact";
import NewCoursePage from "./components/OnlineCourseUser/NewCoursePage";
import UserDashboard from "./components/userDashboard/UserDashboard";

import AuthorizedCourseViewer from "./gobalComponents/AuthorizedCourseViewer";
import Announcements from "./gobalComponents/Announcements";
/* ---------------- SPLASH SCREEN HELPERS ---------------- */
const getLastSplashTime = () => {
  try {
    const lastTime = localStorage.getItem("lastSplashTime");
    if (lastTime) {
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(lastTime) > oneDay) {
        localStorage.removeItem("lastSplashTime");
        return null;
      }
      return lastTime;
    }
    return null;
  } catch (error) {
    console.error("Error getting last splash time:", error);
    return null;
  }
};

const setLastSplashTime = () => {
  try {
    localStorage.setItem("lastSplashTime", Date.now().toString());
  } catch (error) {
    console.error("Error setting splash time:", error);
  }
};

const shouldShowSplash = () => {
  const lastSplashTime = getLastSplashTime();
  if (!lastSplashTime) return true;
  const halfHour = 30 * 60 * 1000;
  return Date.now() - parseInt(lastSplashTime) >= halfHour;
};

/* ---------------- AUTH HELPERS ---------------- */
const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData");
    const userRole = localStorage.getItem("userRole");
    const authToken = localStorage.getItem("token");

    if (userData && authToken) {
      const parsedUserData = JSON.parse(userData);

      // Ensure role always exists
      const role = parsedUserData.role || userRole || "user";

      return { ...parsedUserData, role, token: authToken };
    }
    return null;
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    return null;
  }
};

const clearUserFromStorage = () => {
  try {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

/* ---------------- ROUTE GUARDS ---------------- */
const PrivateRoute = ({ children }) => {
  const user = getUserFromStorage();
  return user && user.token ? children : <Navigate to="/userlogin" replace />;
};

const PublicRoute = ({ children }) => children;

// NEW: Prevent logged-in users from accessing login pages
const AuthRedirectRoute = ({ children }) => {
  const user = getUserFromStorage();
  if (user && user.token) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }
  return children;
};

/* ---------------- APP COMPONENT ---------------- */
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const dispatch = useDispatch();

  // Load user on start
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
      // console.log("User loaded from localStorage:", storedUser);
    }
    setIsAuthLoaded(true);
  }, []);

  // Sync user with localStorage
  const setUserWithStorage = (userData) => {
    // console.log("setUserWithStorage called:", userData);
    if (userData) {
      try {
        const role = userData.role || "user";
        localStorage.setItem("userRole", role);
        localStorage.setItem("userData", JSON.stringify({ ...userData, role }));
        if (userData.token) {
          localStorage.setItem("token", userData.token);
        }
        setUser({ ...userData, role });
        // console.log("User saved to localStorage:", userData);
      } catch (error) {
        // console.error("Error saving user to localStorage:", error);
        setUser(userData);
      }
    } else {
      clearUserFromStorage();
      setUser(null);
      // console.log("User cleared from localStorage");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserWithStorage(null);
  };

  // Splash screen
  useEffect(() => {
    const runSplash = () => {
      if (isInitialLoad) {
        setShowSplash(true);
        setIsInitialLoad(false);
        const t = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
        return () => clearTimeout(t);
      } else if (shouldShowSplash()) {
        setShowSplash(true);
        const t = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
        return () => clearTimeout(t);
      } else {
        setShowSplash(false);
      }
    };
    runSplash();
  }, [isInitialLoad]);

  // Periodic splash
  useEffect(() => {
    const interval = setInterval(() => {
      if (shouldShowSplash() && !showSplash) {
        setShowSplash(true);
        setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 500);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [showSplash]);

  if (showSplash) return <Splash />;

  if (!isAuthLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContent
      user={user}
      setUserWithStorage={setUserWithStorage}
      handleLogout={handleLogout}
    />
  );
}

const AppContent = ({ user, setUserWithStorage, handleLogout }) => {
  const location = useLocation();
  const shouldHideFooter = ["/admin", "/adminlogin", "/userlogin"].includes(
    location.pathname
  );

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      {!shouldHideFooter && (
        <Navigation
          user={user}
          onLogout={() => {
            setUserWithStorage(null);
            window.location.reload();
          }}
        />
      )}
      <div className={shouldHideFooter ? "pt-0" : "pt-16"}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage user={user} />
              </PublicRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <PublicRoute>
                <Announcements user={user} />
              </PublicRoute>
            }
          />
          <Route
            path="/colab"
            element={
              <PublicRoute>
                <ContactForm />
              </PublicRoute>
            }
          />
          {/* <Route
            path="/colleges"
            element={
              // <PrivateRoute>
              <CollegesPage user={user} />
              // </PrivateRoute>
            }
          />
          <Route
            path="/study-materials"
            element={
              <PrivateRoute>
                <MaterialPage user={user} />
              </PrivateRoute>
            }
          />
           <Route
            path="/courses"
            element={
              <PrivateRoute>
                <NewCoursePage user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsPage user={user} />
              </PrivateRoute>
            }
          /> */}

          <Route
            path="/study-materials"
            element={<MaterialPage user={user} />}
          />
          <Route path="/colleges" element={<CollegesPage user={user} />} />
          <Route path="/courses" element={<NewCoursePage user={user} />} />
          <Route path="/jobs" element={<JobsPage user={user} />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserDashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/course-viewer/:courseId"
            element={
              <PrivateRoute>
                <AuthorizedCourseViewer />
              </PrivateRoute>
            }
          />

          {/* 🚀 Prevent logged-in users from accessing login pages */}
          <Route
            path="/userlogin"
            element={
              <AuthRedirectRoute>
                <AuthContainer setUser={setUserWithStorage} />
              </AuthRedirectRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword setUser={setUserWithStorage} />}
          />

          <Route
            path="/adminlogin"
            element={
              <AuthRedirectRoute>
                <UserLogin setUserWithStorage={setUserWithStorage} />
              </AuthRedirectRoute>
            }
          />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminDashboard handleLogout={handleLogout} />
              ) : (
                <UserLogin setUserWithStorage={setUserWithStorage} />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

export default App;
