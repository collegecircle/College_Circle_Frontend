import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchColleges } from "../college/collegeSlice";
import CollegeCard from "./CollegeCard";
import PageHeader from "../../gobalComponents/PageHeader";
import FilterButtons from "../../gobalComponents/FilterButtons";
import InquiryModal from "./InquiryModal";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

const CollegesPage = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.colleges);

  // State
  const [activeCityFilter, setActiveCityFilter] = useState("All Cities");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Matches backend limit

  // Memoized colleges list
  const collegesList = useMemo(() => {
    return Array.isArray(list?.data?.colleges) ? list.data.colleges : [];
  }, [list?.data?.colleges]);

  const totalCount = list?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Fetch colleges
  const fetchCollegesWithPagination = (page = 1) => {
    dispatch({ type: "colleges/loading" });
    dispatch(fetchColleges({ page, limit: itemsPerPage }));
  };

  useEffect(() => {
    if (status === "idle" || (!collegesList.length && status !== "loading")) {
      fetchCollegesWithPagination(currentPage);
    }
  }, [status, collegesList.length, currentPage, dispatch]);

  // City filters
  const cityFilters = useMemo(() => {
    if (!collegesList.length) return ["All Cities"];
    const uniqueCities = new Set();

    collegesList.forEach((college) => {
      if (college.address?.city) {
        uniqueCities.add(college.address.city);
      }
    });

    return ["All Cities", ...Array.from(uniqueCities).sort()];
  }, [collegesList]);

  // Filtered colleges by city
  const filteredColleges = useMemo(() => {
    if (activeCityFilter === "All Cities") {
      return collegesList;
    }
    return collegesList.filter(
      (college) => college.address?.city === activeCityFilter
    );
  }, [collegesList, activeCityFilter]);

  // Handlers
  const handleKnowMore = (college) => {
    setSelectedCollege(college);
    setShowInquiryModal(true);
  };

  const handleCloseModal = () => {
    setShowInquiryModal(false);
    setSelectedCollege(null);
  };

  const handleCityFilterChange = (filter) => {
    setActiveCityFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchCollegesWithPagination(newPage);
    }
  };

  // Loading state
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
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
      <PageHeader
        title="Discover Top"
        highlightedWord="Colleges"
        highlightColor="yellow-400"
        underlineColor="yellow-400"
        description="Connect with premier educational institutions across India"
      />

      {/* City Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterButtons
          filters={cityFilters}
          activeFilter={activeCityFilter}
          onFilterChange={handleCityFilterChange}
          theme="yellow"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredColleges.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-2">
              {activeCityFilter === "All Cities"
                ? "No colleges available"
                : `No colleges found in "${activeCityFilter}"`}
            </div>
            {activeCityFilter !== "All Cities" && (
              <button
                onClick={() => handleCityFilterChange("All Cities")}
                className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
              >
                View all colleges
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
                {totalCount} {totalCount === 1 ? "college" : "colleges"}
                {activeCityFilter !== "All Cities" && ` in ${activeCityFilter}`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredColleges.map((college) => (
                <CollegeCard
                  key={college.id || college.collegeId || college._id}
                  college={college}
                  onKnowMore={() => handleKnowMore(college)}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="px-4 sm:px-6 py-3 bg-gray-1500 border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
                <div className="text-sm text-gray-400 text-center sm:text-left">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
                  {totalCount} results
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
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
                    )
                  )}
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
          </>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && selectedCollege && (
        <InquiryModal college={selectedCollege} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CollegesPage;
