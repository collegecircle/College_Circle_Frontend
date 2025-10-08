// CourseViewer.jsx
import React, { useState } from "react";
import PDFViewer from "../components/course/PDFViewer";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

import getUserFromStorage from "../components/helpers/helper";
const CourseViewer = ({
  course,
  formatDate,
  onEnroll,
  isEnrolled = false,
  className = "",
  setSelectedPdfUrl,
  setShowPdfViewer,
}) => {


  const [courseData, setCourseData] = useState(null)

  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const loggedInUser = user || getUserFromStorage();


  const handleEnroll = async () => {

    if (!loggedInUser) {
      navigate("/userlogin", { state: { from: window.location.pathname } });
      return;
    }

    try {

      // 🟧 Paid course flow
      const orderRes = await axios.post(
        `${BASE_URL}/online-courses/get-online-courses-access`,
        {
          courseId: course.id,
          studentId: user?.id,
          email: user?.email,
          name: user?.name,
        }
      );

      if (orderRes.data.message === "This course is free, no payment required") {
        setCourseData(orderRes.data.course)
        return;
      }

      if (orderRes.data.message === "You are already registered for this course") {
        setCourseData(orderRes.data.course)
        return;
      }


      if (orderRes.data.message === "You are already registered for this course") {
        alert("You have already registered for this course");
        // navigate(`/dashboard#`, { state: { tab: "courses" } });
        navigate(`/course/${course.id}`);
        return;
      }

      const { key, order_id, paymentId, amount, currency, prefill, theme } =
        orderRes.data.data;

      const options = {
        key,
        amount,
        currency,
        name: course.name,
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

            alert(verifyRes.data.message || "Payment Successful!");

            // After payment success → navigate to viewer
            navigate(`/course/${course.id}`);
          } catch (err) {
            console.error(err);
            alert(
              err.response?.data?.message ||
              "Payment verification failed. Contact support."
            );
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      if (
        err.response?.data?.message ===
        "You are already registered for this course"
      ) {
        navigate(`/course/${course.id}`);
      } else {
        alert(err.response?.data?.message || "Something went wrong!");
      }
    }
  };


  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);

  const toggleModuleExpansion = (index, e) => {
    e.preventDefault();
    setExpandedModuleIndex(expandedModuleIndex === index ? null : index);
  };

  if (!course) return null;

  return (
    <div className={`course-viewer ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Main Course Image */}
        <div className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-xl h-64 sm:h-80 lg:h-96">
          <img
            src={course.thumbnailImgUrl}
            alt={course.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          {/* Course ID Badge */}
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#fdc700] text-black">
              {course.courseId}
            </span>
          </div>

          {/* Course Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {course.name}
            </h1>
            <p className="text-sm text-gray-300">
              Posted on {formatDate(course.postedOn)} • Last updated{" "}
              {formatDate(course.updatedAt)}
            </p>
          </div>
        </div>

        {/* Course Action Card */}
        <div className="bg-black bg-opacity-80 rounded-xl p-6 border border-gray-800 shadow-lg flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="inline-block bg-gray-900 rounded-lg px-4 py-2 mb-2">
              <p className="text-sm text-gray-400 uppercase font-semibold">
                Course Price
              </p>
              <p className="text-3xl md:text-4xl font-bold text-[#fdc700]">
                ₹{course.price}
              </p>
            </div>

            <div className="text-gray-400 text-sm mb-4">
              <p>✓ Full lifetime access</p>
              <p>✓ All course materials included</p>
              <p>✓ Certificate of completion</p>
            </div>
          </div>

          <button
            className="w-full bg-[#fdc700] hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fdc700] focus:ring-opacity-50 shadow-lg"
            onClick={onEnroll}
          >
            {isEnrolled ? "Enrolled" : "Enroll Now"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>

      {/* Course Description */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">About This Course</h2>
        <p className="text-gray-300 mb-4">{course.description}</p>

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
            {course.modules
              ? `${course.modules.length} modules`
              : "No modules available"}
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
      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Course Content</h2>
        <div className="space-y-4">
          {course.modules &&
            course.modules.map((module, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                {/* Module Title & Toggle Button */}
                <div
                  className={`p-4 flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${expandedModuleIndex === index
                    ? "border-l-4 border-[#fdc700]"
                    : ""
                    }`}
                  onClick={(e) => toggleModuleExpansion(index, e)}
                >
                  <div className="flex items-center">
                    <span className="bg-[#fdc700] text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4">
                      {index + 1}
                    </span>
                    <h5 className="font-medium text-white text-lg capitalize">
                      {module.title}
                    </h5>
                  </div>
                  <button className="text-[#fdc700] px-3 py-1 rounded hover:bg-gray-600 flex items-center">
                    {expandedModuleIndex === index ? (
                      <>
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
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                        Hide
                      </>
                    ) : (
                      <>
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        View
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Module Content */}
                {expandedModuleIndex === index && (
                  <div className="bg-gray-800 p-4 border-t border-gray-700">
                    <div className="md:flex md:gap-6">
                      {/* Module Thumbnail */}
                      <div className="md:w-1/3 mb-4 md:mb-0">
                        <img
                          src={module.thumbnailImgUrl}
                          alt={module.title}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                      </div>

                      <div className="md:w-2/3">
                        <p className="text-gray-300 mb-4">{module.brief}</p>

                        <div className="mb-6">
                          <h5 className="text-sm font-medium text-white mb-3 flex items-center">
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
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Video Content
                          </h5>
                          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                              src={`https://www.youtube.com/embed/${module.videoId}`}
                              className="w-full h-56 sm:h-64"
                              title={module.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();

                              // Create an invisible iframe to handle the download
                              const iframe = document.createElement("iframe");
                              iframe.style.display = "none";
                              iframe.src = module.documentLink;
                              iframe.onload = function () {
                                // For some servers, just loading in an iframe will trigger download
                                // If not, we'll try to force it with a timeout
                                setTimeout(() => {
                                  document.body.removeChild(iframe);

                                  // Fallback - if iframe approach doesn't work, try direct navigation with download attribute
                                  const link = document.createElement("a");
                                  link.href = module.documentLink;
                                  link.download = `${module.title.replace(
                                    /\s+/g,
                                    "_"
                                  )}_materials.pdf`;
                                  link.target = "_blank"; // This helps with some security policies
                                  link.rel = "noopener noreferrer";
                                  link.click();
                                }, 1000);
                              };

                              document.body.appendChild(iframe);
                            }}
                            className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                          >
                            <svg
                              className="w-5 h-5 mr-2 text-[#fdc700]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"></path>
                            </svg>
                            Download Materials
                          </button>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedPdfUrl(module.documentLink);
                              setShowPdfViewer(true);
                            }}
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#fdc700] hover:bg-yellow-500 text-black rounded-lg transition-colors duration-300 text-sm font-bold shadow-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
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
                            View Document
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
