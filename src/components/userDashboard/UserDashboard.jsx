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
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import PdfViewer from "../../gobalComponents/PdfViewer";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const globalUser = useSelector((state) => state?.auth?.user);
  const payload = {
    studentId: globalUser?.id,
  };

  const buttonLabels = {
    courses: "Add Course",
    materials: "Add Material",
    default: "New Course",
  };
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("materials");
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState("");

  const getUserStudymaterials = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/get-registerd-materials`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStudyMaterials(response.data.data.registerdStudyMaterials);
    } catch (err) {
      console.error("Error fetching study materials:", err);
    }
  };

  useEffect(() => {
    if (globalUser?.id) {
      getUserStudymaterials();
    }
  }, [globalUser]);

  const courses = [];

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
      return (
        <div className="rounded-lg p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
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

                <div className="p-4 border-t border-gray-700/50 flex justify-between items-center gap-3">
                  <button
                    className="bg-[#fdc700] hover:bg-[#ffde4d] text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center flex-grow shadow-md hover:shadow-[#fdc700]/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPdfViewer(material.id);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Material
                  </button>

                  <button
                    className="text-gray-300 hover:text-[#fdc700] bg-gray-700/30 hover:bg-gray-700/50 p-2 rounded-lg transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedView(`material-${material.id}`);
                    }}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <PdfViewer
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

      <aside className="w-0  z-100 md:w-64 flex-shrink-0 border-r border-[#fdc700] bg-gray-900">
        <div className="flexitems-center justify-between h-16 px-4 border-b border-[#fdc700]">
          <h1 className="text-xl font-bold text-[#fdc700]">StudyDash</h1>
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
              <span className="text-lg">Dashboard</span>
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
          <h1 className="text-xl font-bold text-[#fdc700]">StudyDash</h1>
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
        <main className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}
