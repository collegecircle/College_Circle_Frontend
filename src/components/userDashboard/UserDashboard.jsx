import React, { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Menu,
  X,
  Download,
  Clock,
  User,
  Eye,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import PdfViewer from "../../gobalComponents/PdfViewer";
import { useLocation, useNavigate } from "react-router-dom";
import CourseViewer from "../../gobalComponents/CourseViewer";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const globalUser = useSelector((state) => state?.auth?.user);
  const payload = {
    studentId: globalUser?.id,
  };

  const currentTab = useLocation();

  const [studyMaterials, setStudyMaterials] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(
    currentTab.state?.tab ?? "materials"
  );

  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState(null);

  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [courses, setCourses] = useState([]);

  const getUserCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/user/get-registerd-onlinecourses`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status_code === 200) {
        // Fix: Set courses directly from the data array
        setCourses(response.data.data || []);
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError(response.data.data.message || "Error fetching data");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Error fetching data");
    }
  };

  const getUserStudymaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/user/get-registerd-materials`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status_code === 200) {
        setLoading(false);
        setStudyMaterials(response.data.data.registerdStudyMaterials);
        setError(null);
      } else {
        setLoading(false);
        setError(response.data.data.messsage || "Error fetching data");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Error fetching data");
    }
  };
  const toggleCourseExpansion = (courseId) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
      setExpandedModuleIndex(null);
    } else {
      setExpandedCourseId(courseId);
      setExpandedModuleIndex(null);
    }
  };
  useEffect(() => {
    if (globalUser?.id) {
      getUserStudymaterials();
      getUserCourses();
    }
  }, [globalUser]);

  const openPdfViewer = (materialId) => {
    const material = studyMaterials.find((m) => m.id === materialId);

    if (material) {
      if (material.documentLink) {
        setSelectedPdfUrl(material.documentLink);
        setShowPdfViewer(true);
      } else {
        alert("PDF not available for this material.");
      }
    } else {
      alert("Material not found.");
    }
  };

  // Helper function to format date from seconds timestamp
  const formatDate = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price); // Assuming price is in cents
  };

  const navigate = useNavigate();

  const handleNavigation = (selectedView) => {
    if (selectedView == "materials") {
      navigate("/study-materials");
    } else if (selectedView == "courses") {
      navigate("/courses");
    }
  };

  const renderMainContent = () => {
    if (selectedView === "dashboard") {
      return (
        <>
          <div className=" rounded-lg p-4 md:p-6 mb-6"> profile</div>
        </>
      );
    } else if (selectedView === "courses") {
      const isAnyExpanded = expandedCourseId !== null;

      // Add this check to ensure courses is an array
      const coursesArray = Array.isArray(courses) ? courses : [];
      if (coursesArray.length === 0) {
        return (
          <div className=" backdrop-blur-sm rounded-xl p-8 md:p-10 text-center max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="bg-gray-700/50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-[#fdc700]"
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
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Start Your Learning Journey
              </h2>

              <p className="text-gray-300 max-w-lg mx-auto mb-8">
                You haven't enrolled in any courses yet. Discover our collection
                of expert-led courses to enhance your skills and advance your
                career.
              </p>

              <button
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#fdc700] to-[#ffb700] text-gray-900 rounded-lg text-base font-medium shadow-lg transform transition-all duration-200 hover:translate-y-[-2px]"
                onClick={() => handleNavigation("courses")}
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Browse Courses
              </button>
            </div>
          </div>
        );
      }

      // Use coursesArray instead of courses
      const activeCourse = coursesArray.find(
        (c) => c.courseId === expandedCourseId
      );
      return (
        <div className=" rounded-lg p-4 md:p-6">
          {/* Header */}
          <h2 className="text-xl font-semibold mb-6 text-white flex items-center justify-between">
            <span>My Learning Journey </span>
            {isAnyExpanded && (
              <button
                onClick={() => {
                  setExpandedCourseId(null);
                  setExpandedModuleIndex(null);
                }}
                className="text-sm font-normal bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full transition-all duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
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
                Go Back
              </button>
            )}
          </h2>

          {/* Expanded course view */}
          {activeCourse && (
            <div className="mb-8">
              <CourseViewer
                key={activeCourse.courseId}
                course={activeCourse}
                formatDate={formatDate}
                onEnroll={() => console.log("Enroll:", activeCourse.courseId)}
                isEnrolled={
                  activeCourse.registeredOnlineCourses?.length > 0 || false
                }
                setShowPdfViewer={setShowPdfViewer}
                setSelectedPdfUrl={setSelectedPdfUrl}
              />
            </div>
          )}

          {!isAnyExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-700/30"
                  onClick={() => navigate(`/course/${course.courseId}`)}
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                    <img
                      src={
                        course.thumbnailImgUrl || "/images/course-fallback.jpg"
                      }
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Course code badge */}
                    <div className="absolute top-3 right-3 z-20">
                      <div className="bg-gray-700/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                        {course.courseId}
                      </div>
                    </div>

                    {/* Course name */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <h3 className="text-lg font-bold text-white">
                        {course.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="bg-[#fdc700] text-gray-800 px-2 py-1 rounded-full text-sm font-medium">
                        ₹{course.price}
                      </div>
                      <div className="text-xs text-gray-400">
                        {formatDate(course.postedOn._seconds)}
                      </div>
                    </div>

                    {/* Course stats */}
                    <div className="flex justify-between mb-4 text-xs text-gray-300">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-[#fdc700]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {course.modules?.length || 0} Modules
                      </div>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-[#fdc700]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        {course.registeredMembers?.length || 0} Enrolled
                      </div>
                    </div>

                    {/* Minimal button */}
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-full flex items-center justify-center text-sm">
                      <span>View Details</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 text-[#fdc700]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else if (selectedView === "materials") {
      return (
        <div className=" rounded-xl p-5 md:p-8 ">
          <h2 className="text-2xl font-bold mb-8 text-white">
            <span className="text-[#fdc700]">Study</span> Materials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {studyMaterials?.map((material) => (
              <div
                key={material.id}
                className="group bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-[#fdc700]/20 transition-all duration-300 border border-gray-700 hover:border-[#fdc700]/40 flex flex-col transform hover:-translate-y-1"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={material.thumbnileImgUrl || "/assets/cclogo.PNG"}
                    alt={material.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute top-3 right-3 bg-black/80 text-[#fdc700] px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm">
                    {formatPrice(material.price)}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-[#fdc700] transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2 flex-grow">
                    {material.brief}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {new Date(
                        material.postedOn._seconds * 1000
                      ).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      {material.registeredMembers?.length} registerd
                    </span>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-700/50 flex justify-end items-center gap-3">
                  <button
                    className="bg-[#fdc700] hover:bg-[#ffde4d] text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center shadow-md hover:shadow-[#fdc700]/30"
                    onClick={() => {
                      navigate(`/study-materials/${material.materialId}`);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Open Material
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                animation: "spin 1s linear infinite",
                borderRadius: "50%",
                height: "8rem",
                width: "8rem",
                borderBottom: "2px solid #facc15",
                marginBottom: "1rem",
              }}
            ></div>
            <img
              src="/assets/cclogo.PNG"
              alt="Logo"
              style={{
                position: "absolute",
                height: "5rem",
                width: "5rem",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <PdfViewer
          key={selectedPdfUrl}
          pdfUrl={selectedPdfUrl}
          onClose={() => setShowPdfViewer(false)}
        />
      )}

      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-black  transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className="w-0 overflow-hidden md:w-64 md:overflow-visible flex-shrink-0 border-r border-[#fdc700] bg-gray-900 h-screen">
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#fdc700]">
          <h1 className="text-xl font-bold text-[#fff]">Student Dashboard</h1>
        </div>

        <div className="flex flex-col h-full p-4">
          {/* Main menu items */}
          <div className="space-y-3">
            <a
              href="#"
              className={`flex items-center p-3 rounded-md transition-colors duration-150 ${
                selectedView === "courses"
                  ? "bg-gray-700 text-[#fdc700]"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => setSelectedView("courses")}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              <span className="text-lg">Courses</span>
            </a>

            <a
              href="#"
              className={`flex items-center p-3 rounded-md transition-colors duration-150 ${
                selectedView === "materials"
                  ? "bg-gray-700 text-[#fdc700]"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => setSelectedView("materials")}
            >
              <FileText className="h-5 w-5 mr-3" />
              <span className="text-lg">Study Materials</span>
            </a>
          </div>

          <div className="mt-auto">
            <a
              href="#"
              className={`flex items-center p-3 rounded-md transition-colors duration-150 ${
                selectedView === "dashboard"
                  ? "bg-gray-700 text-[#fdc700]"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => setSelectedView("dashboard")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"
                />
              </svg>
              <span className="text-lg">Student Dashboard</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 md:hidden transition duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#fdc700]">
          <h1 className="text-xl font-bold text-[#fff]">Student Dashboard</h1>
          <button
            className="rounded-md p-2 text-gray-400 hover:text-[#fdc700] focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col h-full p-4">
          <div className="space-y-3">
            <a
              href="#"
              className={`flex items-center p-3 rounded-md transition-colors duration-150 ${
                selectedView === "courses"
                  ? "bg-gray-700 text-[#fdc700]"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => {
                setSelectedView("courses");
                setSidebarOpen(false);
              }}
            >
              <BookOpen className="h-5 w-5 mr-3" />
              <span className="text-lg">Courses</span>
            </a>

            <a
              href="#"
              className={`flex items-center p-3 rounded-md transition-colors duration-150 ${
                selectedView === "materials"
                  ? "bg-gray-700 text-[#fdc700]"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => {
                setSelectedView("materials");
                setSidebarOpen(false);
              }}
            >
              <FileText className="h-5 w-5 mr-3" />
              <span className="text-lg">Study Materials</span>
            </a>
          </div>

          <div className="mt-auto">
            <a
              href="#"
              className={`flex items-center p-3 rounded-md transition-colors duration-150 ${
                selectedView === "dashboard"
                  ? "bg-gray-700 text-[#fdc700]"
                  : "text-white hover:bg-gray-800"
              }`}
              onClick={() => {
                setSelectedView("dashboard");
                setSidebarOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"
                />
              </svg>
              <span className="text-lg">Dashboard</span>
            </a>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Add mobile header with menu button here */}
        <header className="bg-gray-900 border-b border-[#fdc700] md:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="rounded-md p-2 text-white hover:text-[#fdc700] focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-[#fff]">
              {" "}
              Student Dashboard
            </h1>
            <div className="w-6"></div> {/* Empty div for balanced spacing */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
