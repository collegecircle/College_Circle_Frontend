// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import HomePage from "./components/HomePage";
// import Footer from "./components/Footer";
// import Splash from "./gobalComponents/SplashScreen";
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

//   const halfandHour = 60 * 30 * 1000; // 1 hour in milliseconds
//   const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);

//   return timeSinceLastSplash >= halfandHour;
// };
// function App() {
//   const [showSplash, setShowSplash] = useState(true);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);

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

//   if (showSplash) return <Splash />;

//   return (
//     <>
//       <HomePage />
//       <Footer />
//     </>
//   );
// }

// export default App;



import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./components/home/HomePage";
import Footer from "./components/footer/Footer";
import Splash from "./gobalComponents/SplashScreen";
import CollegesPage from "./components/college/CollegesPage";
import CoursesPage from "./components/course/CoursesPage";
import JobsPage from "./components/jobs/JobsPage";
import Navigation from "./components/Navigation";

const getLastSplashTime = () => {
  try {
    const lastTime = localStorage.getItem("lastSplashTime");
    if (lastTime) {
      const oneDay = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      if (Date.now() - parseInt(lastTime) > oneDay) {
        localStorage.removeItem("lastSplashTime"); // Remove if expired
        return null;
      }
      return lastTime;
    }
    return null;
  } catch (error) {
    console.error("Error getting last splash time from localStorage:", error);
    return null;
  }
};

const setLastSplashTime = () => {
  try {
    localStorage.setItem("lastSplashTime", Date.now().toString()); // Stores the current timestamp
  } catch (error) {
    console.error("Error setting last splash time in localStorage:", error);
  }
};

const shouldShowSplash = () => {
  const lastSplashTime = getLastSplashTime();
  if (!lastSplashTime) return true;
  const halfandHour = 60 * 30 * 1000; // 30 minutes in milliseconds
  const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);
  return timeSinceLastSplash >= halfandHour;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);

    // Scroll to top when navigating
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Update URL hash for better UX
    if (page !== 'home') {
      window.history.pushState(null, '', `#${page}`);
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['colleges', 'courses', 'jobs'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Check initial URL
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && ['colleges', 'courses', 'jobs'].includes(initialHash)) {
      setCurrentPage(initialHash);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const checkSplashScreen = () => {
      if (isInitialLoad) {
        setShowSplash(true);
        setIsInitialLoad(false);
        const timer = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
        return () => clearTimeout(timer);
      } else if (shouldShowSplash()) {
        setShowSplash(true);
        const timer = setTimeout(() => {
          setShowSplash(false);
          setLastSplashTime();
        }, 4000);
        return () => clearTimeout(timer);
      } else {
        setShowSplash(false);
      }
    };
    checkSplashScreen();
  }, [isInitialLoad]);

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

  // Handle hash navigation for smooth scrolling on homepage
  useEffect(() => {
    const handleHashChange = () => {
      if (currentPage === 'home') {
        const hash = window.location.hash;
        if (hash && !['#colleges', '#courses', '#jobs'].includes(hash)) {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  if (showSplash) return <Splash />;

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'jobs':
        return <JobsPage navigateTo={navigateTo} />;
      case 'colleges':
        return <CollegesPage navigateTo={navigateTo} />;
      case 'courses':
        return <CoursesPage navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  return (
    <>
      {/* Show navigation only when not on home page */}
      {/* {currentPage !== 'home' && ( */}
      <Navigation
        currentPage={currentPage}
        navigateTo={navigateTo}
      />
      {/* )} */}

      {/* Add top padding when navigation is shown */}
      {/* <div className={currentPage !== 'home' ? 'pt-16' : ''}> */}
      <div className='pt-16'>
        {renderCurrentPage()}
      </div>

      {/* Footer - only show on home page */}
      {/* {currentPage === 'home' && <Footer />} */}
      <Footer />
    </>
  );
}

export default App;