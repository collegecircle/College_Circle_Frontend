
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { sendOtp, verifyOtp, logout, resetMessages } from "./authSlice";
// const UserLogin = ({ navigateTo }) => {
//     const dispatch = useDispatch();

//     // ✅ Redux state
//     const { user, isOtpSent, loading, error, success } = useSelector(
//         (state) => state.auth
//     );
//     console.log("Auth state:", { user, isOtpSent, loading, error, success });
//     // ✅ Local input state
//     const [otp, setOtp] = useState("");

//     // Send OTP
//     const handleSendOtp = () => {
//         dispatch(sendOtp());
//     };

//     // Verify OTP
//     const handleVerifyOtp = (e) => {
//         e.preventDefault();
//         if (!otp || otp.length !== 6) return;
//         dispatch(verifyOtp(otp)).then((action) => {
//             if (action.type.endsWith("fulfilled")) {
//                 if (action.payload.role === "admin") {
//                     navigateTo("admin");
//                 } else {
//                     navigateTo("jobs");
//                 }
//             }
//         });
//     };

//     // Logout
//     const handleLogout = () => {
//         dispatch(logout());
//         navigateTo("/");
//     };

//     // Reset form
//     const resetForm = () => {
//         setOtp("");
//         dispatch(resetAuth());
//     };

//     // Resend OTP
//     const resendOtp = () => {
//         setOtp("");
//         dispatch(sendOtp());
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-yellow-1250 to-yellow-100 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
//                 <div className="bg-gradient-to-r from-yellow-100 to-yellow-300 p-6 text-white text-center">
//                     <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
//                     <p className="text-yellow-100">Verify with OTP sent to your email</p>
//                 </div>

//                 <div className="p-6">
//                     {/* Error */}
//                     {error && (
//                         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
//                             <div className="flex items-center">{error}</div>
//                         </div>
//                     )}

//                     {/* Success */}
//                     {success && (
//                         <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
//                             <div className="flex items-center">{success}</div>
//                         </div>
//                     )}

//                     {!isOtpSent ? (
//                         // 🔹 Send OTP Section
//                         <div className="text-center space-y-6">
//                             <div className="bg-green-50 border border-yellow-200 rounded-lg p-4">
//                                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                                     Get Your OTP
//                                 </h3>
//                                 <p className="text-sm text-gray-600 mb-4">
//                                     Click the button below to receive a 6-digit verification code
//                                     via email.
//                                 </p>
//                             </div>

//                             <button
//                                 onClick={handleSendOtp}
//                                 disabled={loading}
//                                 className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50"
//                             >
//                                 {loading ? "Sending OTP..." : "Send OTP to Email"}
//                             </button>
//                         </div>
//                     ) : (
//                         // 🔹 Verify OTP Section
//                         <div className="space-y-6">
//                             <div className="text-center">
//                                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
//                                     <h3 className="text-lg font-medium text-gray-900 mb-1">
//                                         OTP Sent Successfully!
//                                     </h3>
//                                     <p className="text-sm text-gray-600">
//                                         Please check your email for the 6-digit verification code
//                                     </p>
//                                 </div>
//                             </div>

//                             <form onSubmit={handleVerifyOtp} className="space-y-4">
//                                 <div>
//                                     <div className="flex justify-between items-center mb-2">
//                                         <label
//                                             className="block text-gray-700 text-sm font-medium"
//                                             htmlFor="otp"
//                                         >
//                                             Enter OTP
//                                         </label>
//                                         <button
//                                             type="button"
//                                             onClick={resendOtp}
//                                             disabled={loading}
//                                             className="text-xs text-yellow-600 hover:text-yellow-800"
//                                         >
//                                             Resend OTP
//                                         </button>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         id="otp"
//                                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 text-center text-xl tracking-widest font-mono"
//                                         placeholder="000000"
//                                         value={otp}
//                                         onChange={(e) =>
//                                             setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                                         }
//                                         maxLength="6"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-3">
//                                     <button
//                                         type="submit"
//                                         disabled={loading || !otp || otp.length !== 6}
//                                         className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
//                                     >
//                                         {loading ? "Verifying..." : "Verify & Login"}
//                                     </button>

//                                     <button
//                                         type="button"
//                                         onClick={resetForm}
//                                         disabled={loading}
//                                         className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                                     >
//                                         Start Over
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     )}

//                     {/* Logout Button */}
//                     {user && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <button
//                                 onClick={handleLogout}
//                                 className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-all font-medium text-sm"
//                             >
//                                 Clear Session & Logout
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserLogin;



// // src/components/adminDashboard/UserLogin.js
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { sendOtp, verifyOtp, logout, resetMessages } from "./authSlice";

// const UserLogin = ({ navigateTo, setUser }) => {
//     const dispatch = useDispatch();

//     // ✅ Redux state
//     const { user, isOtpSent, loading, error, success } = useSelector(
//         (state) => state.auth
//     );

//     // ✅ Local input state
//     const [otp, setOtp] = useState("");

//     // Send OTP
//     const handleSendOtp = () => {
//         dispatch(sendOtp());
//     };

//     // inside UserLogin.js

//     // Verify OTP
//     const handleVerifyOtp = (e) => {
//         e.preventDefault();
//         if (!otp || otp.length !== 6) return;

//         dispatch(verifyOtp(otp)).then((action) => {
//             if (action.type.endsWith("fulfilled")) {
//                 const verifiedUser = action.payload;
//                 console.log("Verified User:", verifiedUser);

//                 // ✅ Use setUserWithStorage (passed as prop from App.js)
//                 setUser(verifiedUser);

//                 // ✅ Navigate immediately after saving
//                 if (verifiedUser.role === "admin") {
//                     navigateTo("admin");
//                 } else {
//                     navigateTo("jobs");
//                 }
//             }
//         });
//     };


//     // Logout
//     const handleLogout = () => {
//         dispatch(logout());
//         setUser(null);        // clear in App.js + localStorage
//         navigateTo("home");   // back to homepage
//     };

//     // Reset form
//     const resetForm = () => {
//         setOtp("");
//         dispatch(resetMessages());
//     };

//     // Resend OTP
//     const resendOtp = () => {
//         setOtp("");
//         dispatch(sendOtp());
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-yellow-1250 to-yellow-100 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
//                 <div className="bg-gradient-to-r from-yellow-100 to-yellow-300 p-6 text-white text-center">
//                     <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
//                     <p className="text-yellow-100">Verify with OTP sent to your email</p>
//                 </div>

//                 <div className="p-6">
//                     {/* Error */}
//                     {error && (
//                         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
//                             <div className="flex items-center">{error}</div>
//                         </div>
//                     )}

//                     {/* Success */}
//                     {success && (
//                         <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
//                             <div className="flex items-center">{success}</div>
//                         </div>
//                     )}

//                     {!isOtpSent ? (
//                         // 🔹 Send OTP Section
//                         <div className="text-center space-y-6">
//                             <div className="bg-green-50 border border-yellow-200 rounded-lg p-4">
//                                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                                     Get Your OTP
//                                 </h3>
//                                 <p className="text-sm text-gray-600 mb-4">
//                                     Click the button below to receive a 6-digit verification code
//                                     via email.
//                                 </p>
//                             </div>

//                             <button
//                                 onClick={handleSendOtp}
//                                 disabled={loading}
//                                 className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50"
//                             >
//                                 {loading ? "Sending OTP..." : "Send OTP to Email"}
//                             </button>
//                         </div>
//                     ) : (
//                         // 🔹 Verify OTP Section
//                         <div className="space-y-6">
//                             <div className="text-center">
//                                 <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
//                                     <h3 className="text-lg font-medium text-gray-900 mb-1">
//                                         OTP Sent Successfully!
//                                     </h3>
//                                     <p className="text-sm text-gray-600">
//                                         Please check your email for the 6-digit verification code
//                                     </p>
//                                 </div>
//                             </div>

//                             <form onSubmit={handleVerifyOtp} className="space-y-4">
//                                 <div>
//                                     <div className="flex justify-between items-center mb-2">
//                                         <label
//                                             className="block text-gray-700 text-sm font-medium"
//                                             htmlFor="otp"
//                                         >
//                                             Enter OTP
//                                         </label>
//                                         <button
//                                             type="button"
//                                             onClick={resendOtp}
//                                             disabled={loading}
//                                             className="text-xs text-yellow-600 hover:text-yellow-800"
//                                         >
//                                             Resend OTP
//                                         </button>
//                                     </div>
//                                     <input
//                                         type="text"
//                                         id="otp"
//                                         className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 text-center text-xl tracking-widest font-mono"
//                                         placeholder="000000"
//                                         value={otp}
//                                         onChange={(e) =>
//                                             setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
//                                         }
//                                         maxLength="6"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-3">
//                                     <button
//                                         type="submit"
//                                         disabled={loading || !otp || otp.length !== 6}
//                                         className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all disabled:opacity-50"
//                                     >
//                                         {loading ? "Verifying..." : "Verify & Login"}
//                                     </button>

//                                     <button
//                                         type="button"
//                                         onClick={resetForm}
//                                         disabled={loading}
//                                         className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//                                     >
//                                         Start Over
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     )}

//                     {/* Logout Button */}
//                     {user && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <button
//                                 onClick={handleLogout}
//                                 className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-all font-medium text-sm"
//                             >
//                                 Clear Session & Logout
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserLogin;



import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendOtp, verifyOtp, logout, resetMessages } from "./authSlice";
import { useNavigate } from "react-router-dom";

const UserLogin = ({ setUserWithStorage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isOtpSent, loading, error, success } = useSelector(
        (state) => state.auth
    );

    const [otp, setOtp] = useState("");

    // Send OTP
    const handleSendOtp = () => {
        dispatch(sendOtp());
    };

    // Verify OTP
    const handleVerifyOtp = (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) return;

        dispatch(verifyOtp(otp)).then((action) => {
            // console.log("verifyOtp action:", action); // Debug action
            if (action.type.endsWith("fulfilled")) {
                const response = action.payload;
                // console.log("API Response:", response); // Debug response

                // Extract user data from nested response
                const verifiedUser = {
                    role: response?.role, // Default to "user" if role is missing
                    token: response?.token || "mock-token-" + Date.now(), // Mock token if not provided
                    email: response?.email || "admin@example.com" // Fallback email
                };
                // console.log("Verified User:", verifiedUser); // Debug user object

                // Verify setUserWithStorage is a function
                if (typeof setUserWithStorage === "function") {
                    setUserWithStorage(verifiedUser);
                } else {
                    // console.error("setUserWithStorage is not a function:", setUserWithStorage);
                    return;
                }

                // Navigate based on role
                // console.log("Navigating to:", verifiedUser.role === "admin" ? "/admin" : "/"); // Debug navigation
                if (verifiedUser.role === "admin") {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/", { replace: true });
                }
            } else {
                console.error("OTP verification failed:", action.error); // Debug failure
            }
        });
    };

    // Logout
    const handleLogout = () => {
        dispatch(logout());
        if (typeof setUserWithStorage === "function") {
            setUserWithStorage(null); // Clear user in state and localStorage
        } else {
            // console.error("setUserWithStorage is not a function during logout:", setUserWithStorage);
        }
        navigate("/", { replace: true }); // Navigate to homepage
    };

    // Reset form
    const resetForm = () => {
        setOtp("");
        dispatch(resetMessages());
    };

    // Resend OTP
    const resendOtp = () => {
        setOtp("");
        dispatch(sendOtp());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="bg-blue-600 p-6 text-white text-center border-b border-blue-300">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
                    <p>Verify with OTP sent to your email</p>
                </div>

                <div className="p-6">
                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm">
                            <div className="flex items-center">{error}</div>
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm">
                            <div className="flex items-center">{success}</div>
                        </div>
                    )}

                    {!isOtpSent ? (
                        // Send OTP Section
                        <div className="text-center space-y-6">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Get Your OTP
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Click the button below to receive a 6-digit verification code
                                    via email.
                                </p>
                            </div>

                            <button
                                onClick={handleSendOtp}
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
                            >
                                {loading ? "Sending OTP..." : "Send OTP to Email"}
                            </button>
                        </div>
                    ) : (
                        // Verify OTP Section
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                                        OTP Sent Successfully!
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Please check your email for the 6-digit verification code
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            className="block text-gray-700 text-sm font-medium"
                                            htmlFor="otp"
                                        >
                                            Enter OTP
                                        </label>
                                        <button
                                            type="button"
                                            onClick={resendOtp}
                                            disabled={loading}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        id="otp"
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-center text-xl tracking-widest font-mono"
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                                        }
                                        maxLength="6"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={loading || !otp || otp.length !== 6}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                                    >
                                        {loading ? "Verifying..." : "Verify & Login"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        disabled={loading}
                                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Logout Button */}
                    {user && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-200 text-red-800 py-2 px-4 rounded-lg hover:bg-red-300 transition-all font-medium text-sm"
                            >
                                Clear Session & Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserLogin;