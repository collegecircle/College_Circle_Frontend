import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PDFViewer from "../gobalComponents/PdfViewer";
const BASE_URL = import.meta.env.VITE_API_URL;
import getUserFromStorage from "../components/helpers/helper";
import axios from "axios";
import { ArrowRight } from "lucide-react";

const AuthorizedCourseViewer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const loggedInUser = user || getUserFromStorage();
  const { courseId } = useParams();

  // Local states
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  // Format date
  const formatDate = (dateObj) => {
    if (!dateObj) return "—";
    try {
      const date = dateObj._seconds
        ? new Date(dateObj._seconds * 1000)
        : new Date(dateObj);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "—";
    }
  };

  const toggleModuleExpansion = (index, e) => {
    e.preventDefault();
    setExpandedModuleIndex(expandedModuleIndex === index ? null : index);
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/userlogin", { state: { from: window.location.pathname } });
    }
  }, [loggedInUser, navigate]);

  const fetchMaterial = async () => {
    if (!loggedInUser) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/online-courses/online-course-verify-access/${courseId}`,
        { studentId: loggedInUser.id }
      );

      const data = res.data.data;
      setCourse(data);
      setHasAccess(data.isEnrolled);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch material");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterial();
  }, [courseId, loggedInUser]);

  const openPdfViewer = (url) => {
    setSelectedPdfUrl(url);
    setShowPdfViewer(true);
  };

  const handleEnroll = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderRes = await axios.post(
        `${BASE_URL}/online-courses/get-online-courses-access`,
        {
          courseId: courseId,
          studentId: user?.id,
          email: user?.email,
          name: user?.name,
        }
      );

      if (
        orderRes.data.message === "This course is free, no payment required"
      ) {
        setLoading(false);
        setError(null);
        fetchMaterial();
        return;
      }

      if (
        orderRes.data.message === "You are already registered for this course"
      ) {
        setLoading(false);
        setError(null);
        fetchMaterial();
        return;
      }

      const {
        key,
        order_id,
        paymentId,
        amount,
        currency,
        prefill,
        theme,
        name,
      } = orderRes.data.data;
      setLoading(false);
      const options = {
        key,
        amount,
        currency,
        name: name,
        description: "Study Material Payment",
        order_id,
        prefill,
        theme,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/online-courses/verify-payment-online-courses`,
              {
                paymentId,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            if (verifyRes?.data?.success === 1) {
              setLoading(false);
              setError(null);
              fetchMaterial();
            }
          } catch (err) {
            console.error(err);
            alert(
              err.response?.data?.message ||
              "Payment verification failed. Contact support."
            );
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            navigate("/courses");
            window.location.reload();
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setLoading(false);
      if (
        err.response?.data?.message ===
        "You are already registered for this course"
      ) {
        setCourse(err.response.data.data);
      } else {
        setError(
          err.response?.data?.message ||
          "Failed to load course. Please try again."
        );
      }
    }
  };
  // useEffect(() => {
  //   if (loggedInUser === undefined) return;

  //   // Only redirect if user is not logged in AND not already on login page
  //   if (!loggedInUser && window.location.pathname !== "/userlogin") {
  //     navigate("/userlogin", { state: { from: window.location.pathname } });
  //   } else if (loggedInUser) {
  //     handleEnroll();
  //   }
  // }, [courseId, loggedInUser, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800 max-w-md">
          <div className="bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
          <p className="mb-4 text-gray-300">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setError(null);
                handleEnroll();
              }}
              className="px-4 py-2 bg-[#fdc700] text-black rounded-md hover:bg-[#fdc700]/90 transition-colors font-medium"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return;
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center p-6 bg-gray-900 rounded-lg border border-gray-800">
        <h2 className="text-xl font-bold text-gray-300 mb-2">No Course Data</h2>
        <p className="mb-4 text-gray-400">Unable to load course information.</p>
        <button
          onClick={() => navigate("/courses")}
          className="text-[#fdc700] hover:underline"
        >
          Back to Courses
        </button>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container w-[95vw] md:w-[80vw] mx-auto px-4 py-8">
        {showPdfViewer && selectedPdfUrl && (
          <PDFViewer
            pdfUrl={selectedPdfUrl}
            onClose={() => setShowPdfViewer(false)}
          />
        )}

        <div className="mb-4">
          <button
            onClick={() => navigate("/courses")}
            className="text-[#fdc700] hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Courses
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Course Image */}
          <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-xl h-64 sm:h-80 lg:h-96 border border-gray-800">
            <img
              src={course.thumbnailImgUrl || "/assets/cclogo.PNG"}
              alt={course.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            {/* Course ID Badge */}
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fdc700] text-black">
                {course.courseId || course.id}
              </span>
            </div>

            {/* Course Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {course.name}
              </h1>
              <p className="text-sm text-gray-300">
                Posted on {formatDate(course.postedOn)}
                {course.updatedAt &&
                  ` • Last updated ${formatDate(course.updatedAt)}`}
              </p>
            </div>
          </div>

          {/* Course details card */}
          <div className="bg-black rounded-xl p-6 shadow-lg border border-gray-800">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white mb-2">
                Course Details
              </h2>
              <div className="border-b border-gray-800 pb-2 mb-2">
                <span className="text-gray-400 text-sm">Price:</span>
                <span className="float-right text-[#fdc700] font-bold">
                  ₹{course.price}
                </span>
              </div>
              {course.instructor && (
                <div className="border-b border-gray-800 pb-2 mb-2">
                  <span className="text-gray-400 text-sm">Instructor:</span>
                  <span className="float-right text-white">
                    {course.instructor}
                  </span>
                </div>
              )}
              <div className="border-b border-gray-800 pb-2 mb-2">
                <span className="text-gray-400 text-sm">Modules:</span>
                <span className="float-right text-white">
                  {hasAccess
                    ? course.modules?.length
                    : course.countOfModules || 0}
                </span>
              </div>
              <div className="pb-2">
                <span className="text-gray-400 text-sm">Course ID:</span>
                <span className="float-right text-white">
                  {course.courseId || course.id}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-white font-medium mb-2">What you'll get:</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#fdc700] flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Full lifetime access
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#fdc700] flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  All course materials included
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-[#fdc700] flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Online community access
                </li>
              </ul>

              {!hasAccess && (
                <div className="bg-yellow-500 float-right mt-8 w-fit mx-auto text-slate-900 px-4 py-2  font-semibold text-sm flex gap-2 justify-center items-center rounded-full">
                  <button onClick={() => handleEnroll()}>Enroll now </button>
                  <ArrowRight size={20} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-black rounded-xl p-6 mb-8 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">
            About This Course
          </h2>
          <p className="text-gray-300 mb-4">
            {course.description || "No description available."}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#fdc700]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span>
                {hasAccess
                  ? `${course.modules?.length || 0} modules`
                  : `${course.countOfModules || 0} modules`}
              </span>
            </div>

            {course.instructor && (
              <div className="flex items-center text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[#fdc700]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Instructor: {course.instructor}
              </div>
            )}

            <div className="flex items-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#fdc700]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Progress: {course.progress || 0}%
            </div>
          </div>
        </div>

        {/* Module List */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800 shadow-xl">
          <div className="flex items-center mb-8 pb-4 border-b border-gray-800">
            <svg
              className="w-6 h-6 text-[#fdc700] mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h2 className="text-xl font-bold text-white">Course Content</h2>
            <span className="ml-auto bg-gray-800 text-xs text-gray-300 px-2 py-1 rounded-full">
              {hasAccess ? course.modules?.length : course.countOfModules || 0}{" "}
              modules
            </span>
          </div>

          {hasAccess ? (
            <div className="space-y-5">
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((module, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${expandedModuleIndex === index
                      ? "from-gray-800 to-gray-900"
                      : "from-gray-900 to-gray-800"
                      } rounded-lg overflow-hidden border border-gray-800 shadow-md transition-all duration-300`}
                  >
                    <button
                      onClick={(e) => toggleModuleExpansion(index, e)}
                      className="w-full px-5 py-4 flex justify-between items-center hover:bg-black/30 transition-colors"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center mr-4 ${expandedModuleIndex === index
                            ? "bg-[#fdc700] text-black"
                            : "bg-black text-white border border-gray-700"
                            } transition-colors duration-300`}
                        >
                          <span className="text-sm font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-left">
                          <h3 className="text-white font-medium">
                            {module.title}
                          </h3>
                          {!expandedModuleIndex === index && (
                            <div className="flex mt-1 space-x-3">
                              {module.videoId && (
                                <span className="flex items-center text-xs text-red-400">
                                  <svg
                                    className="h-3 w-3 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  Video
                                </span>
                              )}
                              {module.documentLink && (
                                <span className="flex items-center text-xs text-blue-400">
                                  <svg
                                    className="h-3 w-3 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  PDF
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`mr-3 text-xs font-medium px-2 py-0.5 rounded-full ${expandedModuleIndex === index
                            ? "bg-[#fdc700] text-black"
                            : "bg-gray-800 text-gray-400"
                            }`}
                        >
                          {expandedModuleIndex === index
                            ? "Viewing"
                            : "Preview"}
                        </span>
                        <svg
                          className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 ${expandedModuleIndex === index ? "rotate-180" : ""
                            }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {expandedModuleIndex === index && (
                      <div className="px-5 py-4 bg-black/50 border-t border-gray-800 animate-fadeIn">
                        <div className="mb-5">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {module.brief}
                          </p>
                        </div>

                        {/* YouTube Video Embed */}
                        {module.videoId && (
                          <div className="mb-6 border border-gray-800 rounded-lg overflow-hidden shadow-lg">
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2 border-b border-gray-800 flex justify-between items-center">
                              <div className="flex items-center">
                                <svg
                                  className="h-4 w-4 text-red-500 mr-2"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                                <span className="text-gray-300 text-sm font-medium">
                                  Video Lesson
                                </span>
                              </div>
                              <a
                                href={`https://www.youtube.com/watch?v=${module.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#fdc700] hover:text-[#fdc700]/80 text-xs transition-colors"
                              >
                                Open in YouTube
                              </a>
                            </div>
                            <div className="relative pb-[56.25%] h-0 bg-black">
                              <iframe
                                src={`https://www.youtube.com/embed/${module.videoId}`}
                                title={`${module.title} video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                              ></iframe>
                            </div>
                          </div>
                        )}

                        {/* Resources & Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {/* Document Preview Card */}
                          {module.documentLink && (
                            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors shadow-md">
                              <div className="p-4 flex items-start">
                                <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                                  <svg
                                    className="h-6 w-6 text-blue-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1.5}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-white text-sm font-medium mb-1">
                                    Course Document
                                  </h4>
                                  <p className="text-gray-400 text-xs mb-3">
                                    Resource reference materials
                                  </p>
                                  <a
                                    href={module.documentLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-blue-900/50 hover:bg-blue-800 text-blue-300 hover:text-blue-200 px-3 py-1.5 rounded-md transition-colors inline-flex items-center"
                                  >
                                    <svg
                                      className="h-3.5 w-3.5 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                    View Document
                                  </a>

                                </div>
                              </div>
                            </div>
                          )}

                          {/* Video Info Card */}
                          {module.videoId && (
                            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-colors shadow-md">
                              <div className="p-4 flex items-start">
                                <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                                  <svg
                                    className="h-6 w-6 text-red-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                  </svg>
                                </div>
                                <div>
                                  <h4 className="text-white text-sm font-medium mb-1">
                                    Video Tutorial
                                  </h4>
                                  <p className="text-gray-400 text-xs mb-3">
                                    Full-screen HD quality
                                  </p>
                                  <a
                                    href={`https://www.youtube.com/watch?v=${module.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs bg-red-900/50 hover:bg-red-800 text-red-300 hover:text-red-200 px-3 py-1.5 rounded-md transition-colors inline-flex items-center"
                                  >
                                    <svg
                                      className="h-3.5 w-3.5 mr-1"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M10 6v12l10-6z" />
                                    </svg>
                                    Watch on YouTube
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-gray-400 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-gray-800 shadow-inner">
                  <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No Content Available
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    This course doesn't have any modules yet. Check back later
                    for updates.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-gray-400 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-gray-800 shadow-inner">
              <div className="bg-gray-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">
                No Access
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                You are not registered for this course. Please enroll to view
                the course materials.
              </p>
              <div className="bg-yellow-500 w-fit mx-auto text-slate-900 px-4 py-2  font-semibold text-sm flex gap-2 justify-center items-center rounded-full">
                <button onClick={() => handleEnroll()}>Enroll now </button>

                {/* <ArrowRight size={20} /> */}
                <ArrowRight size={20} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorizedCourseViewer;
