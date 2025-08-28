import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Splash from "./gobalComponents/SplashScreen";
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

  const halfandHour = 60 * 30 * 1000; // 1 hour in milliseconds
  const timeSinceLastSplash = Date.now() - parseInt(lastSplashTime);

  return timeSinceLastSplash >= halfandHour;
};
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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

  if (showSplash) return <Splash />;

  return (
    <>
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
