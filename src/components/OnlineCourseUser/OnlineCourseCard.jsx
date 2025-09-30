import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

import getUserFromStorage from "../helpers/helper";

const OnlineCourseCard = ({ course }) => {
  const user = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const loggedInUser = user || getUserFromStorage();

  const handleEnroll = async () => {
    if (!loggedInUser) {
      navigate("/userlogin", { state: { from: window.location.pathname } });
      return;
    }
    try {
      if (course.price === 0) {
        navigate(`/course-viewer/${course.id}`, { state: { course } });
        return;
      }

      const orderRes = await axios.post(
        `${BASE_URL}/online-courses/get-online-courses-access`,
        {
          courseId: course.id,
          studentId: user?.id,
          email: user?.email,
          name: user?.name,
        }
      );

      // Check if user is already registered
      if (
        orderRes.data.message === "You are already registered for this course"
      ) {
        alert("You have already registered for this course");
        navigate(`/dashboard#`, {
          state: {
            tab: "courses",
          },
        });
        return;
      }

      const { key, order_id, paymentId, amount, currency, prefill, theme } =
        orderRes.data.data;

      const options = {
        key,
        amount,
        currency,
        name: course.name,
        description: "study material Payment",
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

            // Add registered flag to course object after successful payment
            const enrolledCourse = {
              ...course,
              registeredOnlineCourses: [{ courseId: course.id }], // Simulate the registered structure
            };

            // Navigate to the course details page where CourseViewer is rendered
            navigate(`/course-details/${course.id}`, {
              state: {
                activeCourse: enrolledCourse,
              },
            });
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
      // Check if the error is "already registered"
      if (
        err.response?.data?.message ===
        "You are already registered for this course"
      ) {
        // Add registered flag to course object
        const enrolledCourse = {
          ...course,
          registeredOnlineCourses: [{ courseId: course.id }], // Simulate the registered structure
        };

        // Navigate to the course details page where CourseViewer is rendered
        navigate(`/course-details/${course.id}`, {
          state: {
            activeCourse: enrolledCourse,
          },
        });
      } else {
        alert(err.response?.data?.message || "Something went wrong!");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 mb-4">
      <div className="relative rounded-md overflow-hidden shadow-md h-36 sm:h-44 lg:h-48">
        <img
          src={course.thumbnailImgUrl}
          alt={course.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Course ID Badge */}
        <div className="absolute top-1 left-1">
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#fdc700] text-black">
            {course.courseId || course.id}
          </span>
        </div>

        {/* Course Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
          <h1 className="text-lg sm:text-xl font-bold text-white mb-1">
            {course.name}
          </h1>
          <p className="text-[10px] text-gray-300">
            Posted on :
            {course?.postedOn
              ? new Date(course.postedOn._seconds * 1000).toLocaleDateString(
                  "en-IN",
                  { day: "2-digit", month: "short", year: "numeric" }
                )
              : "—"}
          </p>
        </div>
      </div>

      {/* Course Action Card */}
      <div className="bg-black bg-opacity-80 rounded-md p-3 border border-gray-800 shadow-md flex flex-col justify-center">
        <div className="text-center mb-3">
          <div className="inline-block bg-gray-900 rounded-lg px-2 py-1 mb-1">
            <p className="text-[9px] text-gray-400 uppercase font-semibold">
              Course Price
            </p>
            <p className="text-xl md:text-2xl font-bold text-[#fdc700]">
              {course.price === 0 ? "FREE" : `₹${course.price}`}
            </p>
          </div>

          <div className="text-gray-400 text-[10px] mb-1">
            <p>✓ Full lifetime access</p>
            <p>✓ All course materials included</p>
            {/* <p>✓ Certificate of completion</p> */}
          </div>
        </div>

        <button
          onClick={handleEnroll}
          className="w-full bg-[#fdc700] hover:bg-yellow-500 text-black font-bold py-1.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#fdc700] focus:ring-opacity-50 shadow-md"
        >
          {course.price === 0 ? "Enroll Now (Free)" : "Enroll Now"}
        </button>

        <div className="mt-1 text-center">
          <p className="text-[9px] text-gray-400">
            {course.price === 0
              ? "Free Forever"
              : "30-Day Money-Back Guarantee"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineCourseCard;
