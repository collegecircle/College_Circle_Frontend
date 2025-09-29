import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Shield,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import {
  registerUser,
  verifyUserOtp,
  loginUser,
} from "../adminDashboard/authSlice";

// Logo - replace with actual College Circle logo
const Logo = "/assets/cclogo-Circle.png"; // Ensure this path is correct

import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${bgColor} ${textColor} shadow-lg max-w-sm animate-slide-in`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const LoginComponent = ({ onToggleMode, isVisible, onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || "/";

  const validate = () => {
    const newErrors = {};

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setNotification({
        type: "error",
        message: "Please fix the highlighted fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };

      const response = await dispatch(loginUser(payload)).unwrap();

      if (response?.success) {
        setNotification({
          type: "success",
          message: response?.message || "Login successful!",
        });

        // Store user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));

        setTimeout(() => {
          navigate(from, { replace: true });
          window.location.reload();
        }, 1000);
      } else {
        setNotification({
          type: "error",
          message: response?.message || "Login failed.",
        });
      }
    } catch (err) {
      const errorMessage = err?.message || "Login error";
      setNotification({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2 uppercase">Login</h1>
        <p className="text-gray-600">
          Sign in to access your College Circle account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Email <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your email"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <label className="block text-sm font-medium text-black mb-2">
            Password <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter your password"
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              // id="rememberMe"
              // checked={rememberMe}
              // onChange={handleRememberMeChange}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Forgot Password?
          </Link>
          {/* 
                    <div className="text-sm">
                        <a
                            href="/forgot-password"
                            className="text-yellow-600 hover:text-yellow-700 font-medium"
                        >
                            Forgot Password?
                        </a>
                    </div> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-400 text-black py-3 px-4 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6 uppercase"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>

      {/* Register Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Don't have an account?</p>
        <button
          onClick={onToggleMode}
          className="text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

const RegisterComponent = ({ onToggleMode, isVisible, onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isOtpSending, setIsOtpSending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setCanResendOtp(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        if (!value?.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (!/^[a-zA-Z\s]*$/.test(value))
          return "Name can only contain letters and spaces";
        return null;

      case "phone":
        if (!value?.trim()) return "Phone number is required";
        if (!/^\d{10}$/.test(value))
          return "Phone number must be exactly 10 digits";
        return null;

      case "email":
        if (!value?.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return null;

      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;

      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords must match";
        return null;

      case "otp":
        if (otpSent && !value?.trim()) return "OTP is required";
        if (otpSent && !/^\d{6}$/.test(value)) return "OTP must be 6 digits";
        return null;

      default:
        return null;
    }
  };

  const validateAll = () => {
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === "otp" && !otpSent) return; // Skip OTP validation if not sent
      const error = validateField(key, formData[key]);
      if (error) validationErrors[key] = error;
    });
    return validationErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Input restrictions
    if (name === "phone" && !/^\d*$/.test(value)) return;
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "otp" && !/^[0-9]*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setNotification(null);

    // Validate all fields except OTP
    const validationErrors = validateAll();
    delete validationErrors.otp; // Remove OTP validation for sending

    if (Object.keys(validationErrors).length > 0) {
      const touchedFields = {};
      Object.keys(formData).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched(touchedFields);
      setErrors(validationErrors);
      setNotification({
        type: "error",
        message: "Please fill all required fields correctly.",
      });
      return;
    }

    setIsOtpSending(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: parseInt(formData.phone),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      // const result = await registerUser(payload);
      const result = await dispatch(registerUser(payload)).unwrap();

      if (result?.success) {
        setOtpSent(true);
        setTimer(120);
        setCanResendOtp(false);
        setNotification({
          type: "success",
          message: result.message || "OTP sent to your email!",
        });
      }
    } catch (err) {
      if (err?.message?.includes("pending")) {
        try {
          const otpPayload = { email: formData.email.trim() };
          await OTP(otpPayload);
          setOtpSent(true);
          setTimer(120);
          setCanResendOtp(false);
          setNotification({
            type: "success",
            message: "OTP resent to your email!",
          });
        } catch (otpErr) {
          setNotification({
            type: "error",
            message: otpErr?.message || "Failed to send OTP",
          });
        }
      } else {
        setNotification({
          type: "error",
          message: err?.message || "Failed to register",
        });
      }
    } finally {
      setIsOtpSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(null);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const touchedFields = {};
      Object.keys(formData).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched(touchedFields);
      setNotification({
        type: "error",
        message: "Please correct the highlighted fields.",
      });
      return;
    }

    if (!otpSent) {
      setNotification({
        type: "error",
        message: "Please send OTP first.",
      });
      return;
    }

    setLoading(true);

    try {
      const verifyPayload = {
        email: formData.email.trim(),
        otp: formData.otp,
      };

      // const response = await verifyUserOtp(verifyPayload);
      const response = await dispatch(verifyUserOtp(verifyPayload)).unwrap();

      if (response?.success) {
        setNotification({
          type: "success",
          message: response?.message || "Registration completed successfully!",
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: err?.message || "Verification failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading && !isOtpSending) {
      e.preventDefault();
      if (!otpSent) {
        handleSendOTP(e);
      } else if (otpSent && formData.otp.trim()) {
        handleSubmit(e);
      }
    }
  };

  return (
    <div
      className={`w-full max-w-md mx-auto px-4 transition-all duration-500 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-black mb-2 uppercase">
          Register
        </h1>
        <p className="text-sm text-gray-600">
          Create your College Circle account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Full Name"
              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.name && touched.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs pl-1">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Phone Number"
              maxLength="10"
              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.phone && touched.phone
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs pl-1">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Email"
              className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.email && touched.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
          </div>
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs pl-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Password"
              className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.password && touched.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs pl-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder="Confirm Password"
              className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs pl-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* OTP Field */}
        <div className="space-y-1">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                className={`w-full pl-10 pr-3 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all duration-200 ${
                  errors.otp && touched.otp
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
            </div>
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={
                isOtpSending ||
                (otpSent && !canResendOtp) ||
                Object.keys(validateAll()).filter(
                  (key) => !["otp"].includes(key)
                ).length > 0
              }
              className={`px-3 py-2.5 text-sm rounded-lg font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                otpSent && !canResendOtp
                  ? "bg-green-100 text-green-700 cursor-default"
                  : isOtpSending
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : Object.keys(validateAll()).filter(
                      (key) => !["otp"].includes(key)
                    ).length > 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-yellow-400 text-black hover:bg-yellow-600 transform hover:scale-105"
              }`}
            >
              {isOtpSending
                ? "Sending..."
                : otpSent && !canResendOtp
                ? `Sent (${timer}s)`
                : canResendOtp
                ? "Resend"
                : "Send OTP"}
            </button>
          </div>
          {errors.otp && touched.otp && (
            <p className="text-red-500 text-xs pl-1">{errors.otp}</p>
          )}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={
            loading ||
            !otpSent ||
            !formData.otp.trim() ||
            Object.keys(validateAll()).length > 0
          }
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-400 text-black py-2.5 px-4 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm uppercase"
        >
          {loading ? "Verifying..." : "Register"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onToggleMode}
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

// Main Auth Container Component
const AuthContainer = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check for existing user session on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const toggleMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-50">
      {/* Desktop View */}
      <div className="hidden lg:flex w-full h-screen relative">
        {/* Left Section - Gradient Background */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-black transform transition-all duration-1000 ease-out ${
            isLogin ? "left-0 translate-x-0" : "left-1/2 translate-x-0"
          }`}
        >
          {/* Navigation Tabs */}
          <div className="absolute top-8 left-8 right-8 z-20">
            <div className="flex rounded-full p-2 shadow-xl border border-white/10 bg-white/10 backdrop-blur-md">
              <button
                onClick={() => setIsLogin(true)}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${
                  isLogin
                    ? "bg-yellow-400 shadow-2xl transform scale-105"
                    : "text-white hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsLogin(false)}
                disabled={isTransitioning}
                className={`flex-1 py-4 px-6 rounded-full text-black font-bold transition-all duration-500 ${
                  !isLogin
                    ? "bg-yellow-400 shadow-2xl transform scale-105"
                    : "text-white hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                REGISTER
              </button>
            </div>
          </div>

          {/* Icon Section */}
          <div className="relative text-center text-white px-8 py-4 flex flex-col items-center justify-center h-full">
            <div className="relative w-35 h-35 rounded-full flex items-center justify-center transform transition-all duration-700 hover:scale-110">
              <img
                src={Logo}
                alt="College Circle Logo"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="relative mt-6">
              <h2
                className={`text-2xl font-bold my-3 pt-4 transition-all duration-700 transform text-white ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </h2>
              <p
                className={`text-gray-300 text-lg leading-relaxed transition-all duration-700 transform ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin
                  ? "Access your College Circle account and continue your educational journey."
                  : "Create your College Circle account and unlock endless educational opportunities."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div
          className={`absolute inset-y-0 w-1/2 bg-white shadow-2xl transform transition-all duration-1000 ease-out ${
            isLogin ? "right-0 translate-x-0" : "right-1/2 translate-x-0"
          }`}
        >
          <div className="flex items-center justify-center w-full h-full p-12">
            <div className="w-full max-w-md">
              {isLogin ? (
                <LoginComponent
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                  onLogin={handleLogin}
                />
              ) : (
                <RegisterComponent
                  onToggleMode={toggleMode}
                  isVisible={!isTransitioning}
                  onRegister={handleRegister}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden w-full min-h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="bg-black relative overflow-hidden">
          {/* Mobile Navigation */}
          <div className="relative z-10 p-4">
            <div className="flex bg-white/20 backdrop-blur-md rounded-full p-0 shadow-xl border border-white/10">
              <button
                onClick={() => setIsLogin(true)}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${
                  isLogin
                    ? "bg-yellow-400 shadow-lg transform scale-105"
                    : "text-white hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                LOGIN
              </button>
              <button
                onClick={() => setIsLogin(false)}
                disabled={isTransitioning}
                className={`flex-1 py-3 px-4 rounded-full text-black font-bold transition-all duration-500 text-sm ${
                  !isLogin
                    ? "bg-yellow-400 shadow-lg transform scale-105"
                    : "text-white hover:bg-white/20"
                } ${isTransitioning ? "opacity-50" : ""}`}
              >
                REGISTER
              </button>
            </div>
          </div>

          {/* Mobile Icon Section */}
          <div className="relative z-10 py-8 text-center text-white">
            <div className="mb-6 relative">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl">
                <img
                  src={Logo}
                  alt="College Circle"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="px-4">
              <h2
                className={`text-2xl font-bold mb-2 transition-all duration-700 transform text-white ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin ? "Welcome Back!" : "Join Us Today!"}
              </h2>
              <p
                className={`text-gray-300 text-sm leading-relaxed transition-all duration-700 transform ${
                  isTransitioning
                    ? "opacity-0 translate-y-4"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {isLogin
                  ? "Access your College Circle account."
                  : "Create your College Circle account."}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Form Content */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto">
            {isLogin ? (
              <LoginComponent
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
                onLogin={handleLogin}
              />
            ) : (
              <RegisterComponent
                onToggleMode={toggleMode}
                isVisible={!isTransitioning}
                onRegister={handleRegister}
              />
            )}
          </div>
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
};

export default AuthContainer;
