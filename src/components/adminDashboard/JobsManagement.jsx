// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     fetchJobs,
//     createJob,
//     updateJob,
//     deleteJob,
// } from "../jobs/jobsSlice";
// import { Search, Plus, Edit, Trash2, Building, MapPin, DollarSign, Clock, Calendar } from "lucide-react";

// const JobsManagement = () => {
//     const dispatch = useDispatch();
//     const { list: jobs, status } = useSelector((state) => state.jobs);

//     const [search, setSearch] = useState("");
//     const [currentJob, setCurrentJob] = useState(null);
//     const [viewMode, setViewMode] = useState("table");
//     const [error, setError] = useState("");

//     const [formData, setFormData] = useState({
//         title: "",
//         description: "",
//         companyName: "",
//         location: "",
//         employmentType: "Full-time",
//         ctcMin: "",
//         ctcMax: "",
//         experienceMin: "",
//         experienceMax: "",
//         noticePeriod: "",
//         skillsRequired: "",
//         deadline: "",
//         status: "Open",
//         companyUrl: "",
//         companyLogoUrl: "",
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     useEffect(() => {
//         dispatch(fetchJobs());
//     }, [dispatch]);

//     const handleAdd = () => {
//         setCurrentJob(null);
//         setFormData({
//             title: "",
//             description: "",
//             companyName: "",
//             location: "",
//             employmentType: "Full-time",
//             ctcMin: "",
//             ctcMax: "",
//             experienceMin: "",
//             experienceMax: "",
//             noticePeriod: "",
//             skillsRequired: "",
//             deadline: "",
//             status: "Open",
//             companyUrl: "",
//             companyLogoUrl: "",
//         });
//         setError("");
//     };

//     const handleEdit = (job) => {
//         setCurrentJob(job);
//         setFormData({
//             title: job.title || "",
//             description: job.description || "",
//             companyName: job.companyName || "",
//             location: job.location || "",
//             employmentType: job.employmentType || "Full-time",
//             ctcMin: job.ctcMin || job.ctc?.min || "",
//             ctcMax: job.ctcMax || job.ctc?.max || "",
//             experienceMin: job.experienceMin || job.experience?.min || "",
//             experienceMax: job.experienceMax || job.experience?.max || "",
//             noticePeriod: job.noticePeriod || "",
//             skillsRequired: job.skillsRequired?.join(", ") || "",
//             deadline: job.deadline || "",
//             status: job.status || "Open",
//             companyUrl: job.companyUrl || "",
//             companyLogoUrl: job.companyLogoUrl || "",
//         });
//         setError("");
//     };

//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this job?")) {
//             dispatch(deleteJob(id));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validation
//         if (!formData.title || !formData.companyName || !formData.location || !formData.status) {
//             setError("Please fill in all required fields (Job Title, Company Name, Location, Status).");
//             return;
//         }

//         const ctcMin = Number(formData.ctcMin);
//         const ctcMax = Number(formData.ctcMax);
//         const experienceMin = Number(formData.experienceMin);
//         const experienceMax = Number(formData.experienceMax);

//         if (formData.ctcMin && formData.ctcMax && ctcMax < ctcMin) {
//             setError("Maximum CTC must be greater than or equal to Minimum CTC.");
//             return;
//         }

//         if (formData.experienceMin && formData.experienceMax && experienceMax < experienceMin) {
//             setError("Maximum Experience must be greater than or equal to Minimum Experience.");
//             return;
//         }

//         const jobPayload = {
//             title: formData.title,
//             description: formData.description,
//             companyName: formData.companyName,
//             location: formData.location,
//             employmentType: formData.employmentType,
//             ctcMin: formData.ctcMin,
//             ctcMax: formData.ctcMax,
//             experienceMin: formData.experienceMin,
//             experienceMax: formData.experienceMax,
//             ctc: { min: ctcMin || 0, max: ctcMax || 0 },
//             experience: { min: experienceMin || 0, max: experienceMax || 0 },
//             noticePeriod: formData.noticePeriod,
//             skillsRequired: formData.skillsRequired ? formData.skillsRequired.split(",").map((s) => s.trim()).filter(s => s) : [],
//             deadline: formData.deadline,
//             status: formData.status,
//             companyUrl: formData.companyUrl,
//             companyLogoUrl: formData.companyLogoUrl,
//         };

//         if (currentJob) {
//             dispatch(updateJob({ id: currentJob.id, jobData: jobPayload }));
//         } else {
//             dispatch(createJob(jobPayload));
//         }

//         handleAdd();
//     };

//     const filteredJobs = Array.isArray(jobs)
//         ? jobs.filter((job) => {
//             if (!job || typeof job !== "object") {
//                 console.warn("Invalid job entry:", job);
//                 return false;
//             }
//             const title = job.title || "";
//             const companyName = job.companyName || "";
//             const searchTerm = search.toLowerCase();
//             return (
//                 title.toLowerCase().includes(searchTerm) ||
//                 companyName.toLowerCase().includes(searchTerm)
//             );
//         })
//         : [];

//     const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
//     const paginatedJobs = filteredJobs.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const JobCard = ({ job }) => (
//         <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-center space-x-3 min-w-0 flex-1">
//                     {job.companyLogoUrl && (
//                         <img
//                             src={job.companyLogoUrl}
//                             alt="Company logo"
//                             className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover flex-shrink-0"
//                         />
//                     )}
//                     <div className="min-w-0 flex-1">
//                         <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{job.title || "Untitled Job"}</h3>
//                         <a
//                             href={job.companyUrl || "#"}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 truncate block"
//                         >
//                             {job.companyName || "Unknown Company"}
//                         </a>
//                     </div>
//                 </div>
//                 <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${job.status === "Open" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                         }`}
//                 >
//                     {job.status || "Unknown"}
//                 </span>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs sm:text-sm text-gray-600">
//                 <div className="flex items-center">
//                     <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
//                     <span className="truncate">{job.location || "N/A"}</span>
//                 </div>
//                 <div className="flex items-center">
//                     <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
//                     <span className="truncate">
//                         {(job.ctc?.min && job.ctc?.max) ? `${job.ctc.min} - ${job.ctc.max} LPA` : "N/A"}
//                     </span>
//                 </div>
//                 <div className="flex items-center">
//                     <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
//                     <span className="truncate">
//                         {(job.experience?.min && job.experience?.max) ? `${job.experience.min} - ${job.experience.max} yrs` : "N/A"}
//                     </span>
//                 </div>
//                 <div className="flex items-center">
//                     <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
//                     <span className="truncate">{job.deadline || "N/A"}</span>
//                 </div>
//             </div>
//             <div className="flex items-center justify-end space-x-2">
//                 <button
//                     className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm rounded-md transition-colors duration-200"
//                     onClick={() => handleEdit(job.id)}
//                 >
//                     <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                     Edit
//                 </button>
//                 <button
//                     className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm rounded-md transition-colors duration-200"
//                     onClick={() => handleDelete(job.id)}
//                 >
//                     <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );

//     return (
//         <div className="w-full p-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
//                 <div className="relative flex-1 max-w-md">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
//                     <input
//                         type="text"
//                         placeholder="Search jobs or companies..."
//                         className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                 </div>
//                 <div className="flex items-center gap-2 sm:gap-3">
//                     <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
//                         <button
//                             className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${viewMode === "table"
//                                 ? "bg-white text-gray-900 shadow-sm"
//                                 : "text-gray-600 hover:text-gray-900"
//                                 }`}
//                             onClick={() => setViewMode("table")}
//                         >
//                             Table
//                         </button>
//                         <button
//                             className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${viewMode === "cards"
//                                 ? "bg-white text-gray-900 shadow-sm"
//                                 : "text-gray-600 hover:text-gray-900"
//                                 }`}
//                             onClick={() => setViewMode("cards")}
//                         >
//                             Cards
//                         </button>
//                     </div>
//                     <button
//                         className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 shadow-sm"
//                         onClick={handleAdd}
//                     >
//                         <Plus className="w-4 h-4 mr-1 sm:mr-2" />
//                         <span className="hidden xs:inline">Add Job</span>
//                         <span className="xs:hidden">Add</span>
//                     </button>
//                 </div>
//             </div>

//             {status === "loading" ? (
//                 <div className="flex justify-center items-center py-12">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                     <span className="ml-3 text-gray-600">Loading jobs...</span>
//                 </div>
//             ) : (
//                 <>
//                     <div className="md:hidden">
//                         {paginatedJobs.length === 0 ? (
//                             <div className="text-center py-12">
//                                 <Building className="w-12 h-12 mx-auto mb-3" />
//                                 <p className="text-gray-600">No jobs found</p>
//                             </div>
//                         ) : (
//                             <div className="space-y-3">
//                                 {paginatedJobs.map((job) => (
//                                     <JobCard key={job.id} job={job} />
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                     <div className="hidden md:block">
//                         {viewMode === "table" ? (
//                             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                         <thead className="bg-gray-50 border-b border-gray-200">
//                                             <tr>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Job
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Company
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Location
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     CTC
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Experience
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Deadline
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Status
//                                                 </th>
//                                                 <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                     Actions
//                                                 </th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200">
//                                             {paginatedJobs.map((job) => (
//                                                 <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                                         <div className="text-sm font-medium text-gray-900">{job.title || "Untitled Job"}</div>
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                                         <div className="flex items-center">
//                                                             {job.companyLogoUrl && (
//                                                                 <img
//                                                                     src={job.companyLogoUrl}
//                                                                     alt="Company logo"
//                                                                     className="w-8 h-8 rounded-md object-cover mr-3"
//                                                                 />
//                                                             )}
//                                                             <a
//                                                                 href={job.companyUrl || "#"}
//                                                                 target="_blank"
//                                                                 rel="noreferrer"
//                                                                 className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
//                                                             >
//                                                                 {job.companyName || "Unknown Company"}
//                                                             </a>
//                                                         </div>
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                         {job.location || "N/A"}
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                         {(job.ctc?.min && job.ctc?.max) ? `${job.ctc.min} - ${job.ctc.max} LPA` : "N/A"}
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                         {(job.experience?.min && job.experience?.max) ? `${job.experience.min} - ${job.experience.max} yrs` : "N/A"}
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                                                         {job.deadline || "N/A"}
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
//                                                         <span
//                                                             className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${job.status === "Open"
//                                                                 ? "bg-green-100 text-green-800"
//                                                                 : "bg-red-100 text-red-800"
//                                                                 }`}
//                                                         >
//                                                             {job.status || "Unknown"}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                                                         <div className="flex justify-end space-x-2">
//                                                             <button
//                                                                 className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200"
//                                                                 onClick={() => handleEdit(job)}
//                                                             >
//                                                                 <Edit className="w-3 h-3 mr-1" />
//                                                                 Edit
//                                                             </button>
//                                                             <button
//                                                                 className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-colors duration-200"
//                                                                 onClick={() => handleDelete(job.id)}
//                                                             >
//                                                                 <Trash2 className="w-3 h-3 mr-1" />
//                                                                 Delete
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 {paginatedJobs.length === 0 && (
//                                     <div className="text-center py-12">
//                                         <Building className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                                         <p className="text-gray-600">No jobs found</p>
//                                     </div>
//                                 )}
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
//                                 {paginatedJobs.length === 0 ? (
//                                     <div className="col-span-full text-center py-12">
//                                         <Building className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                                         <p className="text-gray-600">No jobs found</p>
//                                     </div>
//                                 ) : (
//                                     paginatedJobs.map((job) => <JobCard key={job.id} job={job} />)
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </>
//             )}

//             {totalPages > 1 && (
//                 <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
//                     <div className="flex items-center space-x-2">
//                         <button
//                             className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                             disabled={currentPage === 1}
//                             onClick={() => setCurrentPage(currentPage - 1)}
//                         >
//                             Previous
//                         </button>
//                         <button
//                             className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//                             disabled={currentPage === totalPages}
//                             onClick={() => setCurrentPage(currentPage + 1)}
//                         >
//                             Next
//                         </button>
//                     </div>
//                     <div className="flex items-center text-sm text-gray-700">
//                         <span>
//                             Page <span className="font-medium">{currentPage}</span> of{" "}
//                             <span className="font-medium">{totalPages}</span>
//                         </span>
//                     </div>
//                 </div>
//             )}

//             <div className="mt-10 bg-white border rounded-lg p-3 sm:p-6 shadow-sm">
//                 <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
//                     {currentJob ? "Edit Job" : "Add New Job"}
//                 </h2>
//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//                         {error}
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. Software Engineer"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.title}
//                             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
//                         <textarea
//                             placeholder="Describe the job requirements, responsibilities, and benefits..."
//                             rows={4}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-vertical"
//                             value={formData.description}
//                             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. Tech Corp"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.companyName}
//                             onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. Hyderabad"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.location}
//                             onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
//                         <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.employmentType}
//                             onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
//                         >
//                             <option value="Full-time">Full-time</option>
//                             <option value="Part-time">Part-time</option>
//                             <option value="Contract">Contract</option>
//                             <option value="Internship">Internship</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">CTC Range (LPA)</label>
//                         <input
//                             type="number"
//                             placeholder="Min CTC"
//                             className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.ctcMin}
//                             onChange={(e) => setFormData({ ...formData, ctcMin: e.target.value })}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Max CTC"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.ctcMax}
//                             onChange={(e) => setFormData({ ...formData, ctcMax: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Experience Required (Years)</label>
//                         <input
//                             type="number"
//                             placeholder="Min Exp"
//                             className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.experienceMin}
//                             onChange={(e) => setFormData({ ...formData, experienceMin: e.target.value })}
//                         />
//                         <input
//                             type="number"
//                             placeholder="Max Exp"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.experienceMax}
//                             onChange={(e) => setFormData({ ...formData, experienceMax: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. Immediate, 30 days"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.noticePeriod}
//                             onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Skills Required</label>
//                         <input
//                             type="text"
//                             placeholder="e.g. JavaScript, Python, SQL (comma separated)"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.skillsRequired}
//                             onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
//                         <input
//                             type="date"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.deadline}
//                             onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Job Status *</label>
//                         <select
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.status}
//                             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                             required
//                         >
//                             <option value="Open">Open</option>
//                             <option value="Closed">Closed</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Company URL</label>
//                         <input
//                             type="url"
//                             placeholder="e.g. https://company.com"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.companyUrl}
//                             onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
//                         />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
//                         <input
//                             type="url"
//                             placeholder="e.g. https://company.com/logo.png"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
//                             value={formData.companyLogoUrl}
//                             onChange={(e) => setFormData({ ...formData, companyLogoUrl: e.target.value })}
//                         />
//                     </div>
//                     <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
//                         <button
//                             type="submit"
//                             className="w-full sm:flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                         >
//                             {currentJob ? "Update Job" : "Create Job"}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={handleAdd}
//                             className="w-full sm:w-auto px-4 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm sm:text-base font-medium rounded-md transition-colors duration-200"
//                         >
//                             Reset
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default JobsManagement;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, createJob, updateJob, deleteJob } from "../jobs/jobsSlice";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const JobsManagement = () => {
  const dispatch = useDispatch();
  const {
    list,
    status,
    error: reduxError,
  } = useSelector((state) => state.jobs);

  // Extract jobs and pagination info from API response
  const jobs = Array.isArray(list?.data?.jobs) ? list.data.jobs : [];
  const totalCount = list?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / 5);
  const itemsPerPage = 5;

  const [search, setSearch] = useState("");
  const [currentJob, setCurrentJob] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    location: "",
    employmentType: "Full-time",
    ctcMin: "",
    ctcMax: "",
    experienceMin: "",
    experienceMax: "",
    noticePeriod: "",
    skillsRequired: "",
    deadline: "",
    status: "Open",
    companyUrl: "",
    companyLogoUrl: "",
  });

  // Fetch jobs with pagination and search
  const fetchJobsWithPagination = (page = 1, searchTerm = "") => {
    const params = { page, limit: itemsPerPage };
    if (searchTerm.trim()) {
      params.search = searchTerm;
    }

    dispatch(fetchJobs(params));
  };

  useEffect(() => {
    fetchJobsWithPagination(currentPage, search);
  }, [dispatch, currentPage]);

  // Debounced search effect
  // useEffect(() => {
  //   const delayedSearch = setTimeout(() => {
  //     setCurrentPage(1);
  //     fetchJobsWithPagination(1, search);
  //   }, 500);
  //   return () => clearTimeout(delayedSearch);
  // }, [search]);

  const handleAdd = () => {
    setCurrentJob(null);
    setFormData({
      title: "",
      description: "",
      companyName: "",
      location: "",
      employmentType: "Full-time",
      ctcMin: "",
      ctcMax: "",
      experienceMin: "",
      experienceMax: "",
      noticePeriod: "",
      skillsRequired: "",
      deadline: "",
      status: "Open",
      companyUrl: "",
      companyLogoUrl: "",
    });
    setError("");
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
    setFormData({
      title: job.title || "",
      description: job.description || "",
      companyName: job.companyName || "",
      location: job.location || "",
      employmentType: job.employmentType || "Full-time",
      ctcMin: job.ctcMin || job.ctc?.min || "",
      ctcMax: job.ctcMax || job.ctc?.max || "",
      experienceMin: job.experienceMin || job.experience?.min || "",
      experienceMax: job.experienceMax || job.experience?.max || "",
      noticePeriod: job.noticePeriod || "",
      skillsRequired: job.skillsRequired?.join(", ") || "",
      deadline: job.deadline || "",
      status: job.status || "Open",
      companyUrl: job.companyUrl || "",
      companyLogoUrl: job.companyLogoUrl || "",
    });
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      dispatch(deleteJob(id)).then((result) => {
        if (result.type.endsWith("/fulfilled")) {
          fetchJobsWithPagination(currentPage, search);
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.companyName ||
      !formData.location ||
      !formData.status
    ) {
      setError(
        "Please fill in all required fields (Job Title, Company Name, Location, Status)."
      );
      return;
    }

    const ctcMin = Number(formData.ctcMin);
    const ctcMax = Number(formData.ctcMax);
    const experienceMin = Number(formData.experienceMin);
    const experienceMax = Number(formData.experienceMax);

    if (formData.ctcMin && formData.ctcMax && ctcMax < ctcMin) {
      setError("Maximum CTC must be greater than or equal to Minimum CTC.");
      return;
    }

    if (
      formData.experienceMin &&
      formData.experienceMax &&
      experienceMax < experienceMin
    ) {
      setError(
        "Maximum Experience must be greater than or equal to Minimum Experience."
      );
      return;
    }

    const jobPayload = {
      title: formData.title,
      description: formData.description,
      companyName: formData.companyName,
      location: formData.location,
      employmentType: formData.employmentType,
      ctcMin: formData.ctcMin,
      ctcMax: formData.ctcMax,
      experienceMin: formData.experienceMin,
      experienceMax: formData.experienceMax,
      ctc: { min: ctcMin || 0, max: ctcMax || 0 },
      experience: { min: experienceMin || 0, max: experienceMax || 0 },
      noticePeriod: formData.noticePeriod,
      skillsRequired: formData.skillsRequired
        ? formData.skillsRequired
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s)
        : [],
      deadline: formData.deadline,
      status: formData.status,
      companyUrl: formData.companyUrl,
      companyLogoUrl: formData.companyLogoUrl,
    };

    dispatch(
      currentJob
        ? updateJob({ id: currentJob.id, jobData: jobPayload })
        : createJob(jobPayload)
    ).then((result) => {
      if (result.type.endsWith("/fulfilled")) {
        handleAdd();
        fetchJobsWithPagination(currentPage, search);
      } else {
        setError(result.payload || "Failed to save job");
      }
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {job.companyLogoUrl && (
            <img
              src={job.companyLogoUrl}
              alt="Company logo"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover flex-shrink-0"
              onError={(e) => (e.target.src = "/assets/cclogo.PNG")}
            />
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
              {job.title || "Untitled Job"}
            </h3>
            <a
              href={job.companyUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 truncate block"
            >
              {job.companyName || "Unknown Company"}
            </a>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
            job.status === "Open"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {job.status || "Unknown"}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{job.location || "N/A"}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {job.ctc?.min && job.ctc?.max
              ? `${job.ctc.min} - ${job.ctc.max} LPA`
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">
            {job.experience?.min && job.experience?.max
              ? `${job.experience.min} - ${job.experience.max} yrs`
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{job.deadline || "N/A"}</span>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <button
          className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-sm rounded-md transition-colors duration-200"
          onClick={() => handleEdit(job)}
        >
          <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Edit
        </button>
        <button
          className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm rounded-md transition-colors duration-200"
          onClick={() => handleDelete(job.id)}
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base transition-all duration-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === "table"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setViewMode("table")}
            >
              Table
            </button>
            <button
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                viewMode === "cards"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setViewMode("cards")}
            >
              Cards
            </button>
          </div>
          <button
            className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 shadow-sm"
            onClick={handleAdd}
          >
            <Plus className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Add Job</span>
            <span className="xs:hidden">Add</span>
          </button>
        </div>
      </div>

      {status === "loading" ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading jobs...</span>
        </div>
      ) : status === "failed" ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm mb-4">
          Error: {reduxError || "Failed to fetch jobs"}
        </div>
      ) : (
        <>
          <div className="md:hidden">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Building className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600">No jobs found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:block">
            {viewMode === "table" ? (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CTC
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Experience
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Deadline
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {jobs.map((job) => (
                        <tr
                          key={job.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {job.title || "Untitled Job"}
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {job.companyLogoUrl && (
                                <img
                                  src={job.companyLogoUrl}
                                  alt="Company logo"
                                  className="w-8 h-8 rounded-md object-cover mr-3"
                                  onError={(e) =>
                                    (e.target.src = "/assets/cclogo.PNG")
                                  }
                                />
                              )}
                              <a
                                href={job.companyUrl || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                              >
                                {job.companyName || "Unknown Company"}
                              </a>
                            </div>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.location || "N/A"}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.ctc?.min && job.ctc?.max
                              ? `${job.ctc.min} - ${job.ctc.max} LPA`
                              : "N/A"}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.experience?.min && job.experience?.max
                              ? `${job.experience.min} - ${job.experience.max} yrs`
                              : "N/A"}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {job.deadline || "N/A"}
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                job.status === "Open"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {job.status || "Unknown"}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                className="inline-flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200"
                                onClick={() => handleEdit(job)}
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </button>
                              <button
                                className="inline-flex items-center px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-colors duration-200"
                                onClick={() => handleDelete(job.id)}
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {jobs.length === 0 && (
                  <div className="text-center py-12">
                    <Building className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600">No jobs found</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {jobs.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Building className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600">No jobs found</p>
                  </div>
                ) : (
                  jobs.map((job) => <JobCard key={job.id} job={job} />)
                )}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
                {totalCount} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 border border-gray-300 rounded-lg text-sm font-medium ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-10 bg-white border rounded-lg p-3 sm:p-6 shadow-sm">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
          {currentJob ? "Edit Job" : "Add New Job"}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              placeholder="Describe the job requirements, responsibilities, and benefits..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base resize-vertical"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Tech Corp"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              placeholder="e.g. Hyderabad"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.employmentType}
              onChange={(e) =>
                setFormData({ ...formData, employmentType: e.target.value })
              }
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CTC Range (LPA)
            </label>
            <input
              type="number"
              placeholder="Min CTC"
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.ctcMin}
              onChange={(e) =>
                setFormData({ ...formData, ctcMin: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max CTC"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.ctcMax}
              onChange={(e) =>
                setFormData({ ...formData, ctcMax: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Required (Years)
            </label>
            <input
              type="number"
              placeholder="Min Exp"
              className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.experienceMin}
              onChange={(e) =>
                setFormData({ ...formData, experienceMin: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Max Exp"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.experienceMax}
              onChange={(e) =>
                setFormData({ ...formData, experienceMax: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Period
            </label>
            <input
              type="text"
              placeholder="e.g. Immediate, 30 days"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.noticePeriod}
              onChange={(e) =>
                setFormData({ ...formData, noticePeriod: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Required
            </label>
            <input
              type="text"
              placeholder="e.g. JavaScript, Python, SQL (comma separated)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.skillsRequired}
              onChange={(e) =>
                setFormData({ ...formData, skillsRequired: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Status *
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company URL
            </label>
            <input
              type="url"
              placeholder="e.g. https://company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.companyUrl}
              onChange={(e) =>
                setFormData({ ...formData, companyUrl: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Logo URL
            </label>
            <input
              type="url"
              placeholder="e.g. https://company.com/logo.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              value={formData.companyLogoUrl}
              onChange={(e) =>
                setFormData({ ...formData, companyLogoUrl: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="w-full sm:flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Processing..."
                : currentJob
                ? "Update Job"
                : "Create Job"}
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="w-full sm:w-auto px-4 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm sm:text-base font-medium rounded-md transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobsManagement;
