
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   useForgotMutation,
//   useVerifyMutation,
//   useVerifyOtpMutation,
// } from "./authApiSlice";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Lock, Shield } from "lucide-react";
const logo = "/assets/cclogo-Circle.png";

function Notification({ type = "success", message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bg = type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200";
    const text = type === "success" ? "text-green-800" : "text-red-800";
    const Icon = type === "success" ? CheckCircle : AlertCircle;

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bg} ${text} shadow-lg max-w-sm animate-slide-in`}>
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-medium">{message}</p>
                <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600">
                    ×
                </button>
            </div>
        </div>
    );
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [notification, setNotification] = useState(null);

    // const [forgot, { isLoading: loadingEmail }] = useForgotMutation();
    // const [verify, { isLoading: loadingOtp }] = useVerifyMutation();
    // const [verifyOtp, { isLoading: loadingReset }] = useVerifyOtpMutation();

    const showNotification = (type, message) =>
        setNotification({ type, message });

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return showNotification("error", "Email is required");

        try {
            const res = await forgot({ email }).unwrap();
            if (res?.success) {
                showNotification("success", res.message || "OTP sent!");
                setStep(2);
            } else {
                showNotification("error", res.message || "Failed to send OTP.");
            }
        } catch (err) {
            showNotification("error", err?.data?.message || "Something went wrong.");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) return showNotification("error", "OTP is required");

        try {
            const res = await verify({
                email,
                otp: Number(otp),
                otpType: "forgotPassword",
            }).unwrap();
            if (res?.success) {
                showNotification("success", res.message || "OTP verified!");
                setStep(3);
            } else {
                showNotification("error", res.message || "Invalid OTP.");
            }
        } catch (err) {
            showNotification("error", err?.data?.message || "OTP verification failed.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPwd)
            return showNotification("error", "Both password fields are required");
        if (password !== confirmPwd)
            return showNotification("error", "Passwords do not match");

        try {
            const res = await verifyOtp({ email, password }).unwrap();
            if (res?.success) {
                showNotification("success", res.message || "Password updated!");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                showNotification("error", res.message || "Failed to update password.");
            }
        } catch (err) {
            showNotification("error", err?.data?.message || "Reset failed.");
        }
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 flex flex-col lg:flex-row">
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            {/* Branding Section */}
            <div
                className={`w-full lg:w-1/2 bg-black flex flex-col items-center justify-center p-8 lg:p-12 transition-all duration-700 transform text-white`}
            >
                <div className="relative w-56 h-56 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110">
                    <img src={logo} alt="Logo" className="w-full h-full object-contain" loading="lazy" />
                </div>
                <div className="relative mt-6 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold uppercase text-white mb-4 transition-all duration-700">
                        Forgot Password?
                    </h2>
                    <p className="text-gray-300 text-base lg:text-lg max-w-xs">
                        We’ll send you a code to reset your password.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    {/* Back Button */}
                    <div
                        className="flex items-center gap-2 mb-8 text-yellow-600 cursor-pointer hover:text-yellow-700"
                        onClick={() => navigate("/login")}
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm font-semibold">Back to Login</span>
                    </div>

                    {/* Icon & Heading */}
                    <div className="text-center mb-8">
                        {step === 1 && <Mail className="w-12 h-12 text-yellow-600 mx-auto mb-2" />}
                        {step === 2 && <Shield className="w-12 h-12 text-yellow-600 mx-auto mb-2" />}
                        {step === 3 && <Lock className="w-12 h-12 text-yellow-600 mx-auto mb-2" />}
                        <h2 className="text-2xl font-bold text-black uppercase">
                            {step === 1 ? "Forgot Password" : step === 2 ? "Enter OTP" : "Set New Password"}
                        </h2>
                        <p className="text-gray-600 text-sm mt-2">
                            {step === 1 ? "Enter your email to receive an OTP" : step === 2 ? "Enter the OTP sent to your email" : "Set a new password for your account"}
                        </p>
                    </div>

                    {/* Forms */}
                    {step === 1 && (
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all duration-200"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingEmail}
                                className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 px-4 rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase`}
                            >
                                {loadingEmail ? "Sending..." : "Send OTP"}
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Shield className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all duration-200"
                                    maxLength="6"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingOtp}
                                className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 px-4 rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase`}
                            >
                                {loadingOtp ? "Verifying..." : "Verify OTP"}
                            </button>
                        </form>
                    )}

                    {step === 3 && (
                        <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={confirmPwd}
                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all duration-200"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingReset}
                                className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 px-4 rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed uppercase`}
                            >
                                {loadingReset ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}