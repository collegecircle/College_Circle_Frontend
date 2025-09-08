// // Colleges Page
// import React, { useState } from 'react';
// import {
//     Bookmark, ArrowRight, MapPin, Clock, DollarSign, Star, Users,
//     GraduationCap, BookOpen, Play, Calendar, MessageCircle, Award,
//     Building, Timer, TrendingUp
// } from 'lucide-react';
// import CollegeCard from './CollegeCard';

// // Colleges Data
// const collegesData = [
//     {
//         id: 1,
//         name: "IIT Delhi",
//         location: "New Delhi, India",
//         fees: "₹2.5L/year",
//         ranking: "#2 Engineering",
//         students: "12,000+",
//         logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=50&h=50&fit=crop",
//         bgColor: "bg-yellow-100",
//         established: "1961"
//     },
//     {
//         id: 2,
//         name: "IISc Bangalore",
//         location: "Bangalore, India",
//         fees: "₹50K/year",
//         ranking: "#1 Research",
//         students: "3,500+",
//         logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=50&h=50&fit=crop",
//         bgColor: "bg-green-100",
//         established: "1909"
//     },
//     {
//         id: 3,
//         name: "AIIMS Delhi",
//         location: "New Delhi, India",
//         fees: "₹1.08L/year",
//         ranking: "#1 Medical",
//         students: "8,000+",
//         logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=50&h=50&fit=crop",
//         bgColor: "bg-red-100",
//         established: "1956"
//     },
//     {
//         id: 4,
//         name: "ISI Kolkata",
//         location: "Kolkata, India",
//         fees: "₹15K/year",
//         ranking: "#1 Statistics",
//         students: "2,000+",
//         logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=50&h=50&fit=crop",
//         bgColor: "bg-purple-100",
//         established: "1931"
//     },
//     {
//         id: 5,
//         name: "IIT Bombay",
//         location: "Mumbai, India",
//         fees: "₹2.3L/year",
//         ranking: "#3 Engineering",
//         students: "10,000+",
//         logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=50&h=50&fit=crop",
//         bgColor: "bg-orange-100",
//         established: "1958"
//     },
//     {
//         id: 6,
//         name: "BITS Pilani",
//         location: "Pilani, India",
//         fees: "₹4.2L/year",
//         ranking: "#4 Engineering",
//         students: "18,000+",
//         logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=50&h=50&fit=crop",
//         bgColor: "bg-teal-100",
//         established: "1964"
//     }
// ];

// const CollegesPage = () => (

//     <div id="colleges" className="min-h-screen bg-black">
//         <div className="pt-12 pb-8">
//             <div className="max-w-7xl mx-auto px-4 text-center">
//                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                     Discover Top <span className="text-yellow-400">Colleges</span>
//                 </h1>
//                 <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full mb-6"></div>
//                 <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
//                     Connect with premier educational institutions across India
//                 </p>

//                 <div className="flex flex-wrap justify-center gap-4 mb-8">
//                     {["All Colleges", "Engineering", "Medical", "Arts", "Commerce", "Science"].map((filter) => (
//                         <button
//                             key={filter}
//                             className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
//                         >
//                             {filter}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 pb-16">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {collegesData.map((college) => (
//                     <CollegeCard key={college.id} college={college} />
//                 ))}
//             </div>
//         </div>
//     </div>
// );

// export default CollegesPage;




// import React, { useState } from 'react';
// import CollegeCard from './CollegeCard';
// import PageHeader from '../../gobalComponents/PageHeader';
// import FilterButtons from '../../gobalComponents/FilterButtons';
// import { collegesData, collegeFilters } from './collegesData';

// const CollegesPage = () => {
//     const [activeFilter, setActiveFilter] = useState('All Colleges');

//     const filteredColleges = activeFilter === 'All Colleges'
//         ? collegesData
//         : collegesData.filter(college =>
//             college.type === activeFilter ||
//             college.ranking.toLowerCase().includes(activeFilter.toLowerCase())
//         );

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
//             <PageHeader
//                 title="Discover Top"
//                 highlightedWord="Colleges"
//                 highlightColor="yellow-400"
//                 underlineColor="yellow-400"
//                 description="Connect with premier educational institutions across India"
//             />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <FilterButtons
//                     filters={collegeFilters}
//                     activeFilter={activeFilter}
//                     onFilterChange={setActiveFilter}
//                     theme="yellow"
//                 />
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//                     {filteredColleges.map((college) => (
//                         <CollegeCard
//                             key={college.id}
//                             college={college}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CollegesPage;


// // CollegesPage.jsx
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchColleges } from "../college/collegeSlice";
// import CollegeCard from "./CollegeCard";
// import PageHeader from "../../gobalComponents/PageHeader";
// import FilterButtons from "../../gobalComponents/FilterButtons";
// import InquiryModal from "./InquiryModal";

// const CollegesPage = () => {
//     const dispatch = useDispatch();
//     const { list, status, error } = useSelector((state) => state.colleges);

//     // State management
//     const [activeFilter, setActiveFilter] = useState("All Colleges");
//     const [selectedCollege, setSelectedCollege] = useState(null);
//     const [showInquiryModal, setShowInquiryModal] = useState(false);

//     // Memoized colleges list extraction
//     const collegesList = useMemo(() => {
//         return Array.isArray(list?.data?.colleges) ? list.data.colleges : [];
//     }, [list?.data?.colleges]);

//     // Fetch colleges on mount
//     useEffect(() => {
//         if (status === "idle" || (!collegesList.length && status !== "loading")) {
//             dispatch(fetchColleges());
//         }
//     }, [dispatch, status, collegesList.length]);

//     // Memoized filter options
//     const collegeFilters = useMemo(() => {
//         if (!collegesList.length) return ["All Colleges"];

//         const uniqueStreams = new Set();
//         collegesList.forEach((college) => {
//             if (Array.isArray(college.streams)) {
//                 college.streams.forEach((stream) => {
//                     if (stream?.name) {
//                         uniqueStreams.add(stream.name);
//                     }
//                 });
//             }
//         });

//         return ["All Colleges", ...Array.from(uniqueStreams).sort()];
//     }, [collegesList]);

//     // Memoized filtered colleges
//     const filteredColleges = useMemo(() => {
//         if (activeFilter === "All Colleges") {
//             return collegesList;
//         }

//         return collegesList.filter((college) =>
//             Array.isArray(college.streams) &&
//             college.streams.some((stream) => stream?.name === activeFilter)
//         );
//     }, [collegesList, activeFilter]);

//     // Callbacks to prevent unnecessary re-renders
//     const handleKnowMore = useCallback((college) => {
//         setSelectedCollege(college);
//         setShowInquiryModal(true);
//     }, []);

//     const handleCloseModal = useCallback(() => {
//         setShowInquiryModal(false);
//         setSelectedCollege(null);
//     }, []);

//     const handleFilterChange = useCallback((filter) => {
//         setActiveFilter(filter);
//     }, []);

//     // Loading state
//     // if (status === "loading") {
//     //     return (
//     //         <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center">
//     //             <div className="flex flex-col items-center space-y-4">
//     //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
//     //                 <div className="text-yellow-400 text-xl">Loading colleges...</div>
//     //             </div>
//     //         </div>
//     //     );
//     // }

//     // // Error state
//     // if (error) {
//     //     return (
//     //         <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center">
//     //             <div className="text-center">
//     //                 <div className="text-red-500 text-xl mb-4">Failed to load colleges</div>
//     //                 <p className="text-gray-400 mb-6">{error}</p>
//     //                 <button
//     //                     onClick={() => dispatch(fetchColleges())}
//     //                     className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
//     //                 >
//     //                     Try Again
//     //                 </button>
//     //             </div>
//     //         </div>
//     //     );
//     // }

//     if (status === "loading") {
//         return (
//             <div style={{ minHeight: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <div style={{ textAlign: 'center' }}>
//                     <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '8rem', width: '8rem', borderBottom: '2px solid #facc15', marginBottom: '1rem' }}></div>
//                         <img
//                             src="/assets/cclogo.PNG" // Replace with your logo's path
//                             alt="Logo"
//                             style={{
//                                 position: 'absolute',
//                                 height: '5rem',
//                                 width: '5rem',
//                                 borderRadius: '50%', // Makes the logo circular
//                                 objectFit: 'cover', // Ensures the logo fills the circular space
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//     if (status === "failed") {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <div className="text-center">
//                     <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold text-white mb-2">
//                         Oops! Something went wrong
//                     </h3>
//                     <p className="text-gray-400 mb-4">{error}</p>
//                     <button
//                         onClick={() => dispatch(fetchJobs())}
//                         className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }


//     return (
//         <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
//             <PageHeader
//                 title="Discover Top"
//                 highlightedWord="Colleges"
//                 highlightColor="yellow-400"
//                 underlineColor="yellow-400"
//                 description="Connect with premier educational institutions across India"
//             />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <FilterButtons
//                     filters={collegeFilters}
//                     activeFilter={activeFilter}
//                     onFilterChange={handleFilterChange}
//                     theme="yellow"
//                 />
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//                 {filteredColleges.length === 0 ? (
//                     <div className="text-center py-16">
//                         <div className="text-gray-400 text-lg mb-2">
//                             {activeFilter === "All Colleges"
//                                 ? "No colleges available"
//                                 : `No colleges found for "${activeFilter}"`
//                             }
//                         </div>
//                         {activeFilter !== "All Colleges" && (
//                             <button
//                                 onClick={() => setActiveFilter("All Colleges")}
//                                 className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
//                             >
//                                 View all colleges
//                             </button>
//                         )}
//                     </div>
//                 ) : (
//                     <>
//                         <div className="text-center mb-8">
//                             <p className="text-gray-400">
//                                 Showing {filteredColleges.length}
//                                 {filteredColleges.length === 1 ? " college" : " colleges"}
//                                 {activeFilter !== "All Colleges" && ` in ${activeFilter}`}
//                             </p>
//                         </div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//                             {filteredColleges.map((college) => (
//                                 <CollegeCard
//                                     key={college.id || college.collegeId || college._id}
//                                     college={college}
//                                     onKnowMore={() => handleKnowMore(college)}
//                                 />
//                             ))}
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Inquiry Modal */}
//             {showInquiryModal && selectedCollege && (
//                 <InquiryModal
//                     college={selectedCollege}
//                     onClose={handleCloseModal}
//                 />
//             )}
//         </div>
//     );
// };

// export default CollegesPage;



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

    // State management
    const [activeFilter, setActiveFilter] = useState("All Colleges");
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Matches backend limit

    // Memoized colleges list and pagination info
    const collegesList = useMemo(() => {
        console.log("Colleges List from Redux:", list?.colleges);
        return Array.isArray(list?.data?.colleges) ? list.data.colleges : [];
    }, [list?.data?.colleges]);
    const totalCount = list?.data?.count || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    console.log("Pagination Info:", { totalCount, totalPages, currentPage });

    // Fetch colleges with pagination
    const fetchCollegesWithPagination = (page = 1) => {
        console.log("Fetching colleges with params:", { page, limit: itemsPerPage });
        // Trigger loading state
        dispatch({ type: "colleges/loading" });

        // dispatch(fetchColleges({ page, limit: itemsPerPage }));
        dispatch(fetchColleges({ page, limit: itemsPerPage }));
    };

    useEffect(() => {
        if (status === "idle" || (!collegesList.length && status !== "loading")) {
            fetchCollegesWithPagination(currentPage);
        }
    }, [status, collegesList.length, currentPage, dispatch]);

    // Memoized filter options
    const collegeFilters = useMemo(() => {
        if (!collegesList.length) return ["All Colleges"];

        const uniqueStreams = new Set();
        collegesList.forEach((college) => {
            if (Array.isArray(college.streams)) {
                college.streams.forEach((stream) => {
                    if (stream?.name) {
                        uniqueStreams.add(stream.name);
                    }
                });
            }
        });

        return ["All Colleges", ...Array.from(uniqueStreams).sort()];
    }, [collegesList]);

    // Memoized filtered colleges (client-side filtering)
    const filteredColleges = useMemo(() => {
        if (activeFilter === "All Colleges") {
            return collegesList;
        }
        return collegesList.filter((college) =>
            Array.isArray(college.streams) &&
            college.streams.some((stream) => stream?.name === activeFilter)
        );
    }, [collegesList, activeFilter]);

    // Handlers
    const handleKnowMore = (college) => {
        setSelectedCollege(college);
        setShowInquiryModal(true);
    };

    const handleCloseModal = () => {
        setShowInquiryModal(false);
        setSelectedCollege(null);
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to page 1 on filter change
        fetchCollegesWithPagination(1); // Fetch first page for new filter
    };

    const handlePageChange = (newPage) => {
        console.log("Changing to page:", newPage, "Total Pages:", totalPages, "Total Count:", totalCount);
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            fetchCollegesWithPagination(newPage);
        }
    };

    // Loading state
    if (status === "loading") {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '8rem', width: '8rem', borderBottom: '2px solid #facc15', marginBottom: '1rem' }}></div>
                        <img
                            src="/assets/cclogo.PNG"
                            alt="Logo"
                            style={{
                                position: 'absolute',
                                height: '5rem',
                                width: '5rem',
                                borderRadius: '50%',
                                objectFit: 'cover',
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FilterButtons
                    filters={collegeFilters}
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                    theme="yellow"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {filteredColleges.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-lg mb-2">
                            {activeFilter === "All Colleges"
                                ? "No colleges available"
                                : `No colleges found for "${activeFilter}"`}
                        </div>
                        {activeFilter !== "All Colleges" && (
                            <button
                                onClick={() => handleFilterChange("All Colleges")}
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
                                {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
                                {totalCount === 1 ? "college" : "colleges"}
                                {activeFilter !== "All Colleges" && ` in ${activeFilter}`}
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
                            <div className="px-4 sm:px-6 py-3 bg-gray-1500  border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
                                <div className="text-sm text-gray-400 text-center sm:text-left">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                                    {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
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
                                            className={`px-3 py-1 border border-gray-600 rounded-lg text-sm font-medium ${currentPage === page
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
                    </>
                )}
            </div>

            {/* Inquiry Modal */}
            {showInquiryModal && selectedCollege && (
                <InquiryModal
                    college={selectedCollege}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default CollegesPage;