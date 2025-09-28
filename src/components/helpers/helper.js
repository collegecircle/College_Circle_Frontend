// src/utils/getUserFromStorage.js
const getUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("userData");
    const userRole = localStorage.getItem("userRole");
    const authToken = localStorage.getItem("token");

    if (userData && authToken) {
      const parsedUserData = JSON.parse(userData);

      // ensure role exists
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

export default getUserFromStorage;
