import React, { useEffect, useState } from "react";
import PageHeader from "../../gobalComponents/PageHeader";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseMaterials } from "../course/courseSlice";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import PDFViewer from "../../gobalComponents/PdfViewer";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { list, status, error, pagination } = useSelector(
    (state) => state.materials
  );

  const itemsPerPage = 6;
  const totalCount = pagination?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCourseMaterialsWithPagination = (page = 1, searchTerm = "") => {
    const params = { page, limit: itemsPerPage };
    if (searchTerm.trim()) {
      params.search = searchTerm;
    }
    dispatch(fetchCourseMaterials(params));
  };

  useEffect(() => {
    fetchCourseMaterialsWithPagination(currentPage);
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchCollegesWithPagination(newPage);
    }
  };

  //course free pdf page

  const [showPDF, setShowPDF] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  if (status === "loading") {
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

  // Error state
  if (status === "failed") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <button
            onClick={() => fetchCollegesWithPagination(currentPage)}
            className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex flex-col">
      <PageHeader
        title="Study"
        highlightedWord="Materials"
        highlightColor="yellow-400"
        underlineColor="yellow-400"
        description="Enhance your expertise with industry-relevant courses and Stuff"
      />
      {list.length <= 0 && (
        <div className="text-center p-6  rounded-lg border  w-fit mx-auto">
          <h2 className="text-xl font-bold text-gray-300 mb-2">
            No Study materials Data
          </h2>
          {/* <p className="mb-4 text-gray-400">
            Unable to load Study materials information.
          </p> */}
          {/* <button
            onClick={() => navigate("/study-materials")}
            className="text-[#fdc700] hover:underline"
          >
            Back to study-materials
          </button> */}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 sm:mb-6">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-8xl mx-auto">
        {list.map((material, index) => (
          <CourseCard
            key={material.id || material.collegeId || material._id || index}
            material={material}
            onKnowMore={() => handleKnowMore(material)}
            onOpenPDF={() => {
              setSelectedMaterial(material);
              setShowPDF(true);
            }}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className=" px-4 sm:px-6 py-3 bg-gray-1500 border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
          <div className="text-sm text-gray-400 text-center sm:text-left">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
            results
          </div>
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border border-gray-600 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {showPDF && selectedMaterial && (
        <PDFViewer
          pdfUrl={selectedMaterial.documentLink}
          onClose={() => {
            setShowPDF(false);
            setSelectedMaterial(null);
          }}
        />
      )}
    </div>
  );
};

export default CoursesPage;
