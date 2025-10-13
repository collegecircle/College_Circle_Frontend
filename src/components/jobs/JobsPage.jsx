// // // components/JobsPage.js
// // import React from 'react';
// // import JobCard from './JobCard';

// // const JobsPage = () => {
// //   const jobs = [
// //     { title: 'Software Engineering Intern', company: 'TechCorp', type: 'Internship', location: 'Remote' },
// //     { title: 'Marketing Associate', company: 'BrandCo', type: 'Full-time', location: 'New York' },
// //     { title: 'Data Analyst', company: 'DataFirm', type: 'Part-time', location: 'San Francisco' },
// //     { title: 'UX Designer', company: 'DesignStudio', type: 'Contract', location: 'Los Angeles' },
// //     { title: 'Product Manager', company: 'StartupXYZ', type: 'Full-time', location: 'Austin' },
// //     { title: 'Research Assistant', company: 'University Lab', type: 'Part-time', location: 'Boston' }
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-3xl font-bold text-gray-800">Job Opportunities</h1>
// //         <div className="text-sm text-gray-600">{jobs.length} opportunities available</div>
// //       </div>
// //       <div className="space-y-4">
// //         {jobs.map((job, index) => (
// //           <JobCard key={index} {...job} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default JobsPage;


// import React, { useState } from 'react';
// import JobCard from './JobCard';
// import PageHeader from '../../gobalComponents/PageHeader';
// import FilterButtons from '../../gobalComponents/FilterButtons';
// import { jobsData, jobFilters } from './jobsData';
// import { Briefcase } from 'lucide-react';

// const JobsPage = () => {
//   const [activeFilter, setActiveFilter] = useState('All Jobs');

//   const filteredJobs = activeFilter === 'All Jobs'
//     ? jobsData
//     : jobsData.filter(job => job.category === activeFilter);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
//       <PageHeader
//         title="Find Your Dream"
//         highlightedWord="Job"
//         highlightColor="yellow-400"
//         underlineColor="yellow-400"
//         description="Discover amazing career opportunities with top companies across India"
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FilterButtons
//           filters={jobFilters}
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//           theme="yellow"
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//         {/* Stats Bar */}
//         {/* <div className="bg-gray-800/50 rounded-xl p-4 mb-8 border border-gray-700">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center space-x-6">
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-yellow-400">{filteredJobs.length}</p>
//                 <p className="text-xs text-gray-400">Available Jobs</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-blue-400">
//                   {jobsData.filter(job => job.remote).length}
//                 </p>
//                 <p className="text-xs text-gray-400">Remote Jobs</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-2xl font-bold text-yellow-400">
//                   {new Set(jobsData.map(job => job.company)).size}
//                 </p>
//                 <p className="text-xs text-gray-400">Companies</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-300">
//                 Updated: <span className="text-yellow-400 font-semibold">Today</span>
//               </p>
//             </div>
//           </div>
//         </div> */}

//         {/* Jobs Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//           {filteredJobs.map((job) => (
//             <JobCard
//               key={job.id}
//               job={job}
//             />
//           ))}
//         </div>

//         {/* No Jobs Found */}
//         {filteredJobs.length === 0 && (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
//               <Briefcase className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
//             <p className="text-gray-400">Try adjusting your filters to see more opportunities.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobsPage;




// import React, { useEffect, useState, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { JobCard, JobDetailsModal } from "./JobCard";
// import PageHeader from "../../gobalComponents/PageHeader";
// import FilterButtons from "../../gobalComponents/FilterButtons";
// import { AlertCircle, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
// import { fetchJobs, fetchJobById } from "./jobsSlice";

// const JobsPage = () => {
//   const dispatch = useDispatch();
//   const { list, status, error, selectedJob, loadingJob } = useSelector(
//     (state) => state.jobs
//   );

//   const [activeFilter, setActiveFilter] = useState("All Jobs");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Jobs list + total count from API
//   const jobsList = useMemo(() => {
//     return Array.isArray(list?.data?.jobs) ? list.data.jobs : [];
//   }, [list?.data?.jobs]);

//   const totalCount = list?.data?.count || 0;
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Fetch jobs with pagination + filter
//   const fetchJobsWithPagination = (page = 1) => {
//     dispatch({ type: "jobs/loading" }); // trigger loader
//     dispatch(fetchJobs({ page, limit: itemsPerPage, filter: activeFilter }));
//   };

//   useEffect(() => {
//     fetchJobsWithPagination(currentPage);
//   }, [dispatch, currentPage, activeFilter]);

//   // Filters (unique employment types)
//   const jobFilters = useMemo(() => {
//     if (!jobsList.length) return ["All Jobs"];
//     return ["All Jobs", ...new Set(jobsList.map((job) => job.employmentType))];
//   }, [jobsList]);

//   // Fetch job details
//   const handleViewDetails = async (job) => {
//     await dispatch(fetchJobById(job.id));
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => setIsModalOpen(false);

//   const handlePageChange = (newPage) => {

//     if (newPage >= 1 && newPage <= totalPages) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       setCurrentPage(newPage);
//     }
//   };


//   // Loading state
//   if (status === "loading") {
//     return (
//       <div style={{ minHeight: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <div style={{ textAlign: 'center' }}>
//           <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '8rem', width: '8rem', borderBottom: '2px solid #facc15', marginBottom: '1rem' }}></div>
//             <img
//               src="/assets/cclogo.PNG"
//               alt="Logo"
//               style={{
//                 position: 'absolute',
//                 height: '5rem',
//                 width: '5rem',
//                 borderRadius: '50%',
//                 objectFit: 'cover',
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (status === "failed") {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-white mb-2">
//             Oops! Something went wrong
//           </h3>
//           <p className="text-gray-400 mb-4">{error}</p>
//           <button
//             onClick={() => fetchCollegesWithPagination(currentPage)}
//             className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
//       <PageHeader
//         title="Find Your Dream"
//         highlightedWord="Job"
//         description="Discover amazing career opportunities with top companies across India"
//       />

//       {/* Filters */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FilterButtons
//           filters={jobFilters}
//           activeFilter={activeFilter}
//           onFilterChange={(filter) => {
//             setActiveFilter(filter);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* Job Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//         {jobsList.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
//               <Briefcase className="w-12 h-12 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
//             <p className="text-gray-400">
//               Try adjusting your filters to see more opportunities.
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="text-center mb-8">
//               <p className="text-gray-400">
//                 Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                 {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
//                 {totalCount === 1 ? "job" : "jobs"}
//                 {activeFilter !== "All Jobs" && ` in ${activeFilter}`}
//               </p>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
//               {jobsList.map((job, index) => (
//                 <JobCard
//                   key={job.id}
//                   index={index}
//                   job={job}
//                   onViewDetails={handleViewDetails}
//                 />
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-4 sm:px-6 py-3  bg-gray-1500  border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
//                 <div className="text-sm text-gray-400 text-center sm:text-left">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//                   {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     disabled={currentPage === 1}
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     className="px-3 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
//                   >
//                     <ChevronLeft className="w-4 h-4 mr-1" />
//                     Previous
//                   </button>
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                     <button
//                       key={page}
//                       onClick={() => handlePageChange(page)}
//                       className={`px-3 py-1 border border-gray-600 rounded-lg text-sm font-medium ${currentPage === page
//                         ? "bg-yellow-500 text-black"
//                         : "text-gray-300 hover:bg-gray-800"
//                         }`}
//                     >
//                       {page}
//                     </button>
//                   ))}
//                   <button
//                     disabled={currentPage === totalPages}
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     className="px-3 py-2 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4 ml-1" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Job Modal */}
//       <JobDetailsModal
//         job={selectedJob}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         loading={loadingJob}
//       />
//     </div>
//   );
// };

// export default JobsPage;



import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JobCard } from "./JobCard";
import PageHeader from "../../gobalComponents/PageHeader";
import FilterButtons from "../../gobalComponents/FilterButtons";
import { AlertCircle, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchJobs } from "./jobsSlice";

const JobsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector((state) => state.jobs);

  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Jobs list + total count from API
  const jobsList = useMemo(() => {
    return Array.isArray(list?.data?.jobs) ? list.data.jobs : [];
  }, [list?.data?.jobs]);

  const totalCount = list?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Fetch jobs with pagination + filter
  const fetchJobsWithPagination = (page = 1) => {
    dispatch({ type: "jobs/loading" });
    dispatch(fetchJobs({ page, limit: itemsPerPage, filter: activeFilter }));
  };

  useEffect(() => {
    fetchJobsWithPagination(currentPage);
  }, [dispatch, currentPage, activeFilter]);

  // Filters (unique employment types)
  const jobFilters = useMemo(() => {
    if (!jobsList.length) return ["All Jobs"];
    return ["All Jobs", ...new Set(jobsList.map((job) => job.employmentType))];
  }, [jobsList]);

  // Navigate to job details page
  const handleViewDetails = (job) => {
    navigate(`/jobs/${job.id}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentPage(newPage);
    }
  };

  // Loading state
  // if (status === "loading") {
  //   return (
  //     <div className="min-h-screen bg-black flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="relative flex items-center justify-center">
  //           <div className="animate-spin h-32 w-32 border-4 border-yellow-500 border-t-transparent rounded-full mb-4"></div>
  //           <img
  //             src="/assets/cclogo.PNG"
  //             alt="Logo"
  //             className="absolute h-20 w-20 rounded-full object-cover"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
            onClick={() => fetchJobsWithPagination(currentPage)}
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
        title="Find Your Dream"
        highlightedWord="Job"
        description="Discover amazing career opportunities with top companies across India"
      />

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterButtons
          filters={jobFilters}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Job Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {jobsList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No jobs found
            </h3>
            <p className="text-gray-400">
              Try adjusting your filters to see more opportunities.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
                {totalCount} {totalCount === 1 ? "job" : "jobs"}
                {activeFilter !== "All Jobs" && ` in ${activeFilter}`}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {jobsList.map((job, index) => (
                <JobCard
                  key={job.id}
                  index={index}
                  job={job}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {/* Pagination */}
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
                        className={`px-3 py-1 border border-gray-600 rounded-lg text-sm font-medium ${currentPage === page
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
    </div>
  );
};

export default JobsPage;