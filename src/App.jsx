// // import { useEffect, useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// // import "./App.css";
// // import HomePage from "./components/HomePage";
// // import Footer from "./components/Footer";
// // import Splash from "./gobalComponents/SplashScreen";
// // const getLastSplashTime = () => {
// //   try {
// //     const lastTime = localStorage.getItem("lastSplashTime");
// //     if (lastTime) {
// //       const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
// //       if (Date.now() - parseInt(lastTime) > oneDay) {
// //         localStorage.removeItem("lastSplashTime"); // Remove if expired
// //         return null;
// //       }
// //       return lastTime;
// //     }
// //     return null;
// //   } catch (error) {
// //     console.error("Error getting last splash time from localStorage:", error);
// //     return null;
// //   }
// // };

// // const setLastSplashTime = () => {
// //   try {
// //     localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
// //   } catch (error) {
// //     console.error("Error setting last splash time in localStorage:", error);
// //   }
// // };

// // const shouldShowSplash = () => {
// //   const lastSplashTime = getLastSplashTime();
// //   if (!lastSplashTime) return true;

// //   const halfandHour = 60 * 30 * 1000; // 1 hour in milliseconds
// //   const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);

// //   return timeSinceLastSplash >= halfandHour;
// // };
// // function App() {
// //   const [showSplash, setShowSplash] = useState(true);
// //   const [isInitialLoad, setIsInitialLoad] = useState(true);

// //   useEffect(() => {
// //     const checkSplashScreen = () => {
// //       if (isInitialLoad) {
// //         setShowSplash(true);
// //         setIsInitialLoad(false);

// //         const timer = setTimeout(() => {
// //           setShowSplash(false);
// //           setLastSplashTime();
// //         }, 4000);

// //         return () => clearTimeout(timer);
// //       } else if (shouldShowSplash()) {
// //         setShowSplash(true);

// //         const timer = setTimeout(() => {
// //           setShowSplash(false);
// //           setLastSplashTime();
// //         }, 4000);

// //         return () => clearTimeout(timer);
// //       } else {
// //         setShowSplash(false);
// //       }
// //     };

// //     checkSplashScreen();
// //   }, [isInitialLoad]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       if (shouldShowSplash() && !showSplash) {
// //         setShowSplash(true);

// //         setTimeout(() => {
// //           setShowSplash(false);
// //           setLastSplashTime();
// //         }, 500);
// //       }
// //     }, 60000);

// //     return () => clearInterval(interval);
// //   }, [showSplash]);

// //   if (showSplash) return <Splash />;

// //   return (
// //     <>
// //       <HomePage />
// //       <Footer />
// //     </>
// //   );
// // }

// // export default App;



// // import { useEffect, useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// // import "./App.css";
// // import HomePage from "./components/home/HomePage";
// // import Footer from "./components/footer/Footer";
// // import Splash from "./gobalComponents/SplashScreen";
// // import CollegesPage from "./components/college/CollegesPage";
// // import CoursesPage from "./components/course/CoursesPage";
// // import JobsPage from "./components/jobs/JobsPage";
// // import Navigation from "./components/Navigation";

// // const getLastSplashTime = () => {
// //   try {
// //     const lastTime = localStorage.getItem("lastSplashTime");
// //     if (lastTime) {
// //       const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
// //       if (Date.now() - parseInt(lastTime) > oneDay) {
// //         localStorage.removeItem("lastSplashTime"); // Remove if expired
// //         return null;
// //       }
// //       return lastTime;
// //     }
// //     return null;
// //   } catch (error) {
// //     console.error("Error getting last splash time from localStorage:", error);
// //     return null;
// //   }
// // };

// // const setLastSplashTime = () => {
// //   try {
// //     localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
// //   } catch (error) {
// //     console.error("Error setting last splash time in localStorage:", error);
// //   }
// // };

// // const shouldShowSplash = () => {
// //   const lastSplashTime = getLastSplashTime();
// //   if (!lastSplashTime) return true;
// //   const halfandHour = 60 * 30 * 1000; // 30 minutes in milliseconds
// //   const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);
// //   return timeSinceLastSplash >= halfandHour;
// // };

// // function App() {
// //   const [showSplash, setShowSplash] = useState(true);
// //   const [isInitialLoad, setIsInitialLoad] = useState(true);
// //   const [currentPage, setCurrentPage] = useState('home');

// //   // Navigation function
// //   const navigateTo = (page) => {
// //     setCurrentPage(page);

// //     // Scroll to top when navigating
// //     window.scrollTo({
// //       top: 0,
// //       behavior: 'smooth'
// //     });

// //     // Update URL hash for better UX
// //     if (page !== 'home') {
// //       window.history.pushState(null, '', `#${page}`);
// //     } else {
// //       window.history.pushState(null, '', '/');
// //     }
// //   };

// //   // Handle browser back/forward navigation
// //   useEffect(() => {
// //     const handlePopState = () => {
// //       const hash = window.location.hash.replace('#', '');
// //       if (hash && ['colleges', 'courses', 'jobs'].includes(hash)) {
// //         setCurrentPage(hash);
// //       } else {
// //         setCurrentPage('home');
// //       }
// //     };

// //     window.addEventListener('popstate', handlePopState);

// //     // Check initial URL
// //     const initialHash = window.location.hash.replace('#', '');
// //     if (initialHash && ['colleges', 'courses', 'jobs'].includes(initialHash)) {
// //       setCurrentPage(initialHash);
// //     }

// //     return () => window.removeEventListener('popstate', handlePopState);
// //   }, []);

// //   useEffect(() => {
// //     const checkSplashScreen = () => {
// //       if (isInitialLoad) {
// //         setShowSplash(true);
// //         setIsInitialLoad(false);
// //         const timer = setTimeout(() => {
// //           setShowSplash(false);
// //           setLastSplashTime();
// //         }, 4000);
// //         return () => clearTimeout(timer);
// //       } else if (shouldShowSplash()) {
// //         setShowSplash(true);
// //         const timer = setTimeout(() => {
// //           setShowSplash(false);
// //           setLastSplashTime();
// //         }, 4000);
// //         return () => clearTimeout(timer);
// //       } else {
// //         setShowSplash(false);
// //       }
// //     };
// //     checkSplashScreen();
// //   }, [isInitialLoad]);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       if (shouldShowSplash() && !showSplash) {
// //         setShowSplash(true);
// //         setTimeout(() => {
// //           setShowSplash(false);
// //           setLastSplashTime();
// //         }, 500);
// //       }
// //     }, 60000);
// //     return () => clearInterval(interval);
// //   }, [showSplash]);

// //   // Handle hash navigation for smooth scrolling on homepage
// //   useEffect(() => {
// //     const handleHashChange = () => {
// //       if (currentPage === 'home') {
// //         const hash = window.location.hash;
// //         if (hash && !['#colleges', '#courses', '#jobs'].includes(hash)) {
// //           const element = document.querySelector(hash);
// //           if (element) {
// //             element.scrollIntoView({ behavior: 'smooth' });
// //           }
// //         }
// //       }
// //     };

// //     window.addEventListener('hashchange', handleHashChange);
// //     return () => window.removeEventListener('hashchange', handleHashChange);
// //   }, [currentPage]);

// //   if (showSplash) return <Splash />;

// //   // Render current page
// //   const renderCurrentPage = () => {
// //     switch (currentPage) {
// //       case 'jobs':
// //         return <JobsPage navigateTo={navigateTo} />;
// //       case 'colleges':
// //         return <CollegesPage navigateTo={navigateTo} />;
// //       case 'courses':
// //         return <CoursesPage navigateTo={navigateTo} />;
// //       case 'home':
// //       default:
// //         return <HomePage navigateTo={navigateTo} />;
// //     }
// //   };

// //   return (
// //     <>
// //       {/* Show navigation only when not on home page */}
// //       {/* {currentPage !== 'home' && ( */}
// //       <Navigation
// //         currentPage={currentPage}
// //         navigateTo={navigateTo}
// //       />
// //       {/* )} */}

// //       {/* Add top padding when navigation is shown */}
// //       {/* <div className={currentPage !== 'home' ? 'pt-16' : ''}> */}
// //       <div className='pt-16'>
// //         {renderCurrentPage()}
// //       </div>

// //       {/* Footer - only show on home page */}
// //       {/* {currentPage === 'home' && <Footer />} */}
// //       <Footer />
// //     </>
// //   );
// // }

// // export default App;

// // src/App.js
// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import HomePage from "./components/home/HomePage";
// import Footer from "./components/footer/Footer";
// import Splash from "./gobalComponents/SplashScreen";
// import CollegesPage from "./components/college/CollegesPage";
// import CoursesPage from "./components/course/CoursesPage";
// import JobsPage from "./components/jobs/JobsPage";
// import Navigation from "./components/Navigation";
// import AdminDashboard from "./components/adminDashboard/AdminDashboard";
// import UserLogin from "./components/adminDashboard/UserLogin";
// import { useDispatch } from "react-redux";
// import { logout } from "./components/adminDashboard/authSlice";
// // localStorage helper functions with error handling
// const getLastSplashTime = () => {
//   try {
//     const lastTime = localStorage.getItem("lastSplashTime");
//     if (lastTime) {
//       const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
//       if (Date.now() - parseInt(lastTime) > oneDay) {
//         localStorage.removeItem("lastSplashTime"); // Remove if expired
//         return null;
//       }
//       return lastTime;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error getting last splash time from localStorage:", error);
//     return null;
//   }
// };

// const setLastSplashTime = () => {
//   try {
//     localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
//   } catch (error) {
//     console.error("Error setting last splash time in localStorage:", error);
//   }
// };

// const shouldShowSplash = () => {
//   const lastSplashTime = getLastSplashTime();
//   if (!lastSplashTime) return true;
//   const halfHour = 60 * 30 * 1000; // 30 minutes in milliseconds
//   const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);
//   return timeSinceLastSplash >= halfHour;
// };

// // User authentication helper functions
// const getUserFromStorage = () => {
//   try {
//     const userData = localStorage.getItem('userData');
//     const userRole = localStorage.getItem('userRole');

//     if (userData && userRole) {
//       const parsedUserData = JSON.parse(userData);
//       // Verify the stored data is valid
//       if (parsedUserData && parsedUserData.role === userRole) {
//         return parsedUserData;
//       }
//     }
//     return null;
//   } catch (error) {
//     console.error("Error getting user data from localStorage:", error);
//     // Clear corrupted data
//     try {
//       localStorage.removeItem('userData');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('authToken');
//     } catch (e) {
//       console.error("Error clearing corrupted user data:", e);
//     }
//     return null;
//   }
// };

// const clearUserFromStorage = () => {
//   try {
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userData');
//     localStorage.removeItem('authToken');
//   } catch (error) {
//     console.error("Error clearing user data from localStorage:", error);
//   }
// };

// function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [user, setUser] = useState(null);
//   const [isAuthLoaded, setIsAuthLoaded] = useState(false);



//   const hash = window.location.hash;

//   // hashes where footer should not be shown
//   const hideFooterHashes = ["#login", "#admin"];

//   const shouldHideFooter = hideFooterHashes.some(h => hash.startsWith(h));

//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     dispatch(logout());
//     setUserWithStorage(null); // clears in App.js + localStorage
//     navigateTo("home");       // back to homepage
//   };

//   // Load user from localStorage on app start
//   useEffect(() => {
//     const loadUserFromStorage = () => {
//       const storedUser = getUserFromStorage();
//       if (storedUser) {
//         setUser(storedUser);
//         console.log("User loaded from localStorage:", storedUser);
//       }
//       setIsAuthLoaded(true);
//     };

//     loadUserFromStorage();
//   }, []);

//   // Enhanced user setter that also handles localStorage
//   const setUserWithStorage = (userData) => {
//     if (userData) {
//       try {
//         localStorage.setItem('userRole', userData.role);
//         localStorage.setItem('userData', JSON.stringify(userData));
//         if (userData.token) {
//           localStorage.setItem('authToken', userData.token);
//         }
//         setUser(userData);
//         console.log("User data saved to localStorage:", userData);
//       } catch (error) {
//         console.error("Error saving user data to localStorage:", error);
//         setUser(userData); // Still set in state even if localStorage fails
//       }
//     } else {
//       clearUserFromStorage();
//       setUser(null);
//       console.log("User data cleared from localStorage");
//     }
//   };

//   // Navigation function (uses localStorage fallback to avoid race condition)
//   const navigateTo = (page) => {
//     // Use stored user as fallback because setState is async and may not reflect
//     // the most recent setUserWithStorage call yet.
//     const storedUser = getUserFromStorage();
//     const effectiveUser = user || storedUser;

//     // Protect admin page
//     if (page === 'admin' && !effectiveUser) {
//       setCurrentPage('login');
//       window.history.pushState(null, '', '#login');
//       return;
//     }

//     // Restrict admin page to admins only
//     if (page === 'admin' && effectiveUser?.role !== 'admin') {
//       console.warn("Access denied: User role is not admin");
//       setCurrentPage('login');
//       window.history.pushState(null, '', '#login');
//       return;
//     }

//     setCurrentPage(page);

//     // Scroll to top when navigating
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });

//     // Update URL hash for better UX
//     if (page !== 'home') {
//       window.history.pushState(null, '', `#${page}`);
//     } else {
//       window.history.pushState(null, '', '/');
//     }
//   };

//   // Handle browser back/forward navigation
//   useEffect(() => {
//     if (!isAuthLoaded) return; // Wait for auth to load

//     const handlePopState = () => {
//       const hash = window.location.hash.replace('#', '');
//       const storedUser = getUserFromStorage();
//       const effectiveUser = user || storedUser;

//       if (hash && ['colleges', 'courses', 'jobs', 'admin', 'login'].includes(hash)) {
//         if (hash === 'admin' && (!effectiveUser || effectiveUser.role !== 'admin')) {
//           setCurrentPage('login');
//           window.history.pushState(null, '', '#login');
//         } else {
//           setCurrentPage(hash);
//         }
//       } else {
//         setCurrentPage('home');
//       }
//     };

//     window.addEventListener('popstate', handlePopState);

//     // Check initial URL
//     const initialHash = window.location.hash.replace('#', '');
//     const storedUser = getUserFromStorage();
//     const effectiveUser = user || storedUser;

//     if (initialHash && ['colleges', 'courses', 'jobs', 'admin', 'login'].includes(initialHash)) {
//       if (initialHash === 'admin' && (!effectiveUser || effectiveUser.role !== 'admin')) {
//         setCurrentPage('login');
//         window.history.pushState(null, '', '#login');
//       } else {
//         setCurrentPage(initialHash);
//       }
//     }

//     return () => window.removeEventListener('popstate', handlePopState);
//   }, [user, isAuthLoaded]);

//   // Splash screen logic
//   useEffect(() => {
//     const checkSplashScreen = () => {
//       if (isInitialLoad) {
//         setShowSplash(true);
//         setIsInitialLoad(false);
//         const timer = setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 4000);
//         return () => clearTimeout(timer);
//       } else if (shouldShowSplash()) {
//         setShowSplash(true);
//         const timer = setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 4000);
//         return () => clearTimeout(timer);
//       } else {
//         setShowSplash(false);
//       }
//     };
//     checkSplashScreen();
//   }, [isInitialLoad]);

//   // Periodic splash screen check
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (shouldShowSplash() && !showSplash) {
//         setShowSplash(true);
//         setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 500);
//       }
//     }, 60000);
//     return () => clearInterval(interval);
//   }, [showSplash]);

//   // Handle hash navigation for smooth scrolling on homepage
//   useEffect(() => {
//     const handleHashChange = () => {
//       if (currentPage === 'home') {
//         const hash = window.location.hash;
//         if (hash && !['#colleges', '#courses', '#jobs', '#admin', '#login'].includes(hash)) {
//           const element = document.querySelector(hash);
//           if (element) {
//             element.scrollIntoView({ behavior: 'smooth' });
//           }
//         }
//       }
//     };

//     window.addEventListener('hashchange', handleHashChange);
//     return () => window.removeEventListener('hashchange', handleHashChange);
//   }, [currentPage]);

//   // Show splash screen
//   if (showSplash) return <Splash />;

//   // Show loading until auth is loaded
//   if (!isAuthLoaded) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Render current page
//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case 'jobs':
//         return <JobsPage navigateTo={navigateTo} user={user} />;
//       case 'colleges':
//         return <CollegesPage navigateTo={navigateTo} user={user} />;
//       case 'courses':
//         return <CoursesPage navigateTo={navigateTo} user={user} />;
//       case 'admin':
//         return user?.role === 'admin' ? (
//           <AdminDashboard
//             navigateTo={navigateTo}
//             handleLogout={handleLogout}   // ✅ pass logout function
//           />
//         ) : (
//           <UserLogin setUser={setUserWithStorage} navigateTo={navigateTo} />
//         );

//       case 'login':
//         return <UserLogin setUser={setUserWithStorage} navigateTo={navigateTo} />;
//       case 'home':
//       default:
//         return <HomePage navigateTo={navigateTo} user={user} />;
//     }
//   };

//   return (
//     <>
//       {/* Navigation */}
//       {/* <Navigation
//         currentPage={currentPage}
//         navigateTo={navigateTo}
//         user={user}
//         onLogout={() => setUserWithStorage(null)}
//       /> */}


//       {!shouldHideFooter && <Navigation
//         currentPage={currentPage}
//         navigateTo={navigateTo}
//         user={user}
//         onLogout={() => setUserWithStorage(null)}
//       />}

//       {/* Main Content */}
//       {/* <div className='pt-0'>
//         {renderCurrentPage()}
//       </div> */}

//       <div className={window.location.hash === '#admin' || window.location.hash === '#login' ? 'pt-0' : 'pt-16'}>
//         {renderCurrentPage()}
//       </div>
//       {/* Footer */}
//       {/* <Footer /> */}
//       {!shouldHideFooter && <Footer />}
//     </>
//   );
// }

// export default App;




// import { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./components/home/HomePage";
// import Footer from "./components/footer/Footer";
// import Splash from "./gobalComponents/SplashScreen";
// import CollegesPage from "./components/college/CollegesPage";
// import CoursesPage from "./components/course/CoursesPage";
// import JobsPage from "./components/jobs/JobsPage";
// import Navigation from "./components/Navigation";
// import AdminDashboard from "./components/adminDashboard/AdminDashboard";
// import UserLogin from "./components/adminDashboard/UserLogin"; // Admin login (unchanged)
// import AuthContainer from "./components/auth/Login";// New user login component
// import { useDispatch } from "react-redux";
// import { logout } from "./components/adminDashboard/authSlice";
// import ForgotPassword from "./components/auth/ForgotPassword";

// // localStorage helper functions with error handling
// const getLastSplashTime = () => {
//   try {
//     const lastTime = localStorage.getItem("lastSplashTime");
//     if (lastTime) {
//       const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
//       if (Date.now() - parseInt(lastTime) > oneDay) {
//         localStorage.removeItem("lastSplashTime"); // Remove if expired
//         return null;
//       }
//       return lastTime;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error getting last splash time from localStorage:", error);
//     return null;
//   }
// };

// const setLastSplashTime = () => {
//   try {
//     localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
//   } catch (error) {
//     console.error("Error setting last splash time in localStorage:", error);
//   }
// };

// const shouldShowSplash = () => {
//   const lastSplashTime = getLastSplashTime();
//   if (!lastSplashTime) return true;
//   const halfHour = 60 * 30 * 1000; // 30 minutes in milliseconds
//   const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);
//   return timeSinceLastSplash >= halfHour;
// };

// // User authentication helper functions
// const getUserFromStorage = () => {
//   try {
//     const userData = localStorage.getItem('userData');
//     const userRole = localStorage.getItem('userRole');
//     const authToken = localStorage.getItem('token');

//     if (userData && userRole && authToken) {
//       const parsedUserData = JSON.parse(userData);
//       console.log("Parsed user data from localStorage:", parsedUserData); 
//       // Verify the stored data is valid and token exists
//       if (parsedUserData && parsedUserData.role === userRole) {
//         return { ...parsedUserData, token: authToken };
//       }
//     }
//     return null;
//   } catch (error) {
//     console.error("Error getting user data from localStorage:", error);
//     // Clear corrupted data
//     try {
//       localStorage.removeItem('userData');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('token');
//     } catch (e) {
//       console.error("Error clearing corrupted user data:", e);
//     }
//     return null;
//   }
// };

// const clearUserFromStorage = () => {
//   try {
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('userData');
//     localStorage.removeItem('token');
//   } catch (error) {
//     console.error("Error clearing user data from localStorage:", error);
//   }
// };

// // PrivateRoute component to protect routes (requires valid token)
// const PrivateRoute = ({ children }) => {
//   const user = getUserFromStorage();
//   return user && user.token ? children : <Navigate to="/userlogin" replace />;
// };

// console.log("getUserFromStorage:", getUserFromStorage(), PrivateRoute({ children: <div>Test</div> }));

// // PublicRoute component for unrestricted access
// const PublicRoute = ({ children }) => {
//   return children;
// };

// function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [user, setUser] = useState(null);
//   const [isAuthLoaded, setIsAuthLoaded] = useState(false);

//   const dispatch = useDispatch();

//   // Load user from localStorage on app start
//   useEffect(() => {
//     const loadUserFromStorage = () => {
//       const storedUser = getUserFromStorage();
//       if (storedUser) {
//         setUser(storedUser);
//         console.log("User loaded from localStorage:", storedUser);
//       }
//       setIsAuthLoaded(true);
//     };

//     loadUserFromStorage();
//   }, []);

//   // Enhanced user setter that also handles localStorage
//   const setUserWithStorage = (userData) => {
//     console.log("setUserWithStorage called with:", userData);
//     if (userData) {
//       try {
//         localStorage.setItem('userRole', userData.role);
//         localStorage.setItem('userData', JSON.stringify(userData));
//         if (userData.token) {
//           localStorage.setItem('token', userData.token);
//         }
//         setUser(userData);
//         console.log("User data saved to localStorage:", userData);
//       } catch (error) {
//         console.error("Error saving user data to localStorage:", error);
//         setUser(userData); // Still set in state even if localStorage fails
//       }
//     } else {
//       clearUserFromStorage();
//       setUser(null);
//       console.log("User data cleared from localStorage");
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logout());
//     setUserWithStorage(null); // Clear user in state and localStorage
//   };

//   // Splash screen logic
//   useEffect(() => {
//     const checkSplashScreen = () => {
//       if (isInitialLoad) {
//         setShowSplash(true);
//         setIsInitialLoad(false);
//         const timer = setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 4000);
//         return () => clearTimeout(timer);
//       } else if (shouldShowSplash()) {
//         setShowSplash(true);
//         const timer = setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 4000);
//         return () => clearTimeout(timer);
//       } else {
//         setShowSplash(false);
//       }
//     };
//     checkSplashScreen();
//   }, [isInitialLoad]);

//   // Periodic splash screen check
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (shouldShowSplash() && !showSplash) {
//         setShowSplash(true);
//         setTimeout(() => {
//           setShowSplash(false);
//           setLastSplashTime();
//         }, 500);
//       }
//     }, 60000);
//     return () => clearInterval(interval);
//   }, [showSplash]);

//   // Show splash screen
//   if (showSplash) return <Splash />;

//   // Show loading until auth is loaded
//   if (!isAuthLoaded) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (

//     <AppContent
//       user={user}
//       setUserWithStorage={setUserWithStorage}
//       handleLogout={handleLogout}
//     />
//   );
// }

// // Separate component to handle routing and location-based logic
// const AppContent = ({ user, setUserWithStorage, handleLogout }) => {
//   const location = useLocation();
//   const shouldHideFooter = ['/admin', '/adminlogin', '/userlogin'].includes(location.pathname);

//   // Handle hash-based scrolling for home page
//   useEffect(() => {
//     if (location.pathname === '/' && location.hash) {
//       const element = document.querySelector(location.hash);
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     } else {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [location]);

//   return (
//     <>
//       {!shouldHideFooter && (
//         <Navigation user={user} onLogout={() => setUserWithStorage(null)} />
//       )}
//       <div className={shouldHideFooter ? 'pt-0' : 'pt-16'}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <PublicRoute>
//                 <HomePage user={user} />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/colleges"
//             element={
//               <PrivateRoute>
//                 <CollegesPage user={user} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/courses"
//             element={
//               <PrivateRoute>
//                 <CoursesPage user={user} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/jobs"
//             element={
//               <PrivateRoute>
//                 <JobsPage user={user} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/userlogin"
//             element={<AuthContainer setUser={setUserWithStorage} />}
//           />
//           <Route
//             path="/forgot-password"
//             element={<ForgotPassword setUser={setUserWithStorage} />}
//           />
//           {/* Admin routes unchanged */}
//           <Route
//             path="/adminlogin"
//             element={<UserLogin setUserWithStorage={setUserWithStorage} />}
//           />
//           <Route
//             path="/admin"
//             element={
//               user?.role === 'admin' ? (
//                 <AdminDashboard handleLogout={handleLogout} />
//               ) : (
//                 <UserLogin setUserWithStorage={setUserWithStorage} />
//               )
//             }
//           />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//       {!shouldHideFooter && <Footer />}
//     </>
//   );
// };

// export default App;



import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import Footer from "./components/footer/Footer";
import Splash from "./gobalComponents/SplashScreen";
import CollegesPage from "./components/college/CollegesPage";
import CoursesPage from "./components/course/CoursesPage";
import JobsPage from "./components/jobs/JobsPage";
import Navigation from "./components/Navigation";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import UserLogin from "./components/adminDashboard/UserLogin"; // Admin login
import AuthContainer from "./components/auth/Login"; // User login
import { useDispatch } from "react-redux";
import { logout } from "./components/adminDashboard/authSlice";
import ForgotPassword from "./components/auth/ForgotPassword";
import ContactForm from "./components/faqs/Contact";

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
    <AppContent user={user} setUserWithStorage={setUserWithStorage} handleLogout={handleLogout} />
  );
}

/* ---------------- ROUTING CONTENT ---------------- */
const AppContent = ({ user, setUserWithStorage, handleLogout }) => {
  const location = useLocation();
  const shouldHideFooter = ["/admin", "/adminlogin", "/userlogin"].includes(location.pathname);

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
      {!shouldHideFooter && <Navigation user={user} onLogout={() => setUserWithStorage(null)} />}
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
          <Route path="/colab"
            element={
              <PublicRoute>
                <ContactForm />
              </PublicRoute>
            }
          />
          <Route
            path="/colleges"
            element={
              // <PrivateRoute>
                <CollegesPage user={user} />
              // </PrivateRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <PrivateRoute>
                <CoursesPage user={user} />
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
