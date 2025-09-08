// import React from "react";
// import { ArrowRight } from "lucide-react";


// const JobCard = ({ job }) => {

//   return (
//     <div className={`${job.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
//       {/* <button
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         toggleSaveItem(`job-${job.id}`);
//                     }}
//                     className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
//                 >
//                     <Bookmark
//                         className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
//                             }`}
//                     />
//                 </button> */}

//       <div className="mb-6">
//         <span className="text-lg font-bold text-black">{job.salary}</span>
//       </div>

//       <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
//         {job.title}
//       </h3>

//       <div className="flex items-center justify-center mb-8">
//         <div className="flex space-x-1">
//           <div className="w-2 h-2 bg-black/30 rounded-full"></div>
//           <div className="w-2 h-2 bg-black/20 rounded-full"></div>
//           <div className="w-2 h-2 bg-black/10 rounded-full"></div>
//           <div className="w-2 h-2 bg-black/10 rounded-full"></div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
//             <img
//               src={job.companyLogo}
//               alt={job.company}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <p className="font-semibold text-black text-sm">{job.title}</p>
//             <p className="text-black/70 text-xs">{job.company}</p>
//           </div>
//         </div>

//         <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
//           View
//         </button>
//       </div>

//       <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
//         <ArrowRight className="w-6 h-6 text-black/50" />
//       </div>
//     </div>
//   );
// };

// export default JobCard;


import React from "react";
import {
  Building,
  X,
} from "lucide-react";

// COLORS for cards
const COLORS = [
  "bg-indigo-100",
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-pink-100",
  "bg-purple-100",
  "bg-blue-100",
];

// Job Card
export const JobCard = ({ job, onViewDetails, index }) => {
  const formatSalary = (ctc) => {
    if (ctc && ctc.min && ctc.max) {
      return `₹${ctc.min}-${ctc.max}L`;
    }
    return "Not specified";
  };

  const bgColor = COLORS[index % COLORS.length];

  return (
    <div
      className={`${bgColor} rounded-2xl p-6 relative group hover:shadow-xl 
        transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}
    >
      <div className="mb-6">
        <span className="text-lg font-bold text-black">{formatSalary(job.ctc)}</span>
      </div>

      <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
        {job.title}
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center">
            <Building className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-black text-sm">{job.title}</p>
            <p className="text-black/70 text-xs">{job.companyName}</p>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(job)}
          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300"
        >
          View
        </button>
      </div>
    </div>
  );
};

// Job Details Modal
export const JobDetailsModal = ({ job, isOpen, onClose, loading }) => {
  if (!isOpen) return null;

  const formatSalary = (ctc) =>
    ctc?.min && ctc?.max ? `₹${ctc.min} - ₹${ctc.max} LPA` : "Not specified";

  const formatExperience = (experience) =>
    experience?.min !== undefined && experience?.max !== undefined
      ? `${experience.min} - ${experience.max} years`
      : "Not specified";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-black via-black to-black border border-white/50 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md bg-opacity-90">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-black via-black to-black text-white border-b border-white/10 p-4 flex items-center justify-between rounded-t-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold text-white">
            {job ? job.title : "Loading..."}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin h-12 w-12 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Content */}
        {!loading && job && (
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-black via-black to-black border border-white/20 p-3 rounded-lg text-center backdrop-blur-sm bg-opacity-80">
                <p className="text-xs text-gray-400">Salary</p>
                <p className="font-bold text-yellow-400">
                  {formatSalary(job.ctc)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-black via-black to-black border border-white/20 p-3 rounded-lg text-center backdrop-blur-sm bg-opacity-80">
                <p className="text-xs text-gray-400">Experience</p>
                <p className="font-bold text-blue-400">
                  {formatExperience(job.experience)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-black via-black to-black border border-white/20 p-3 rounded-lg text-center backdrop-blur-sm bg-opacity-80">
                <p className="text-xs text-gray-400">Type</p>
                <p className="font-bold text-green-400">{job.employmentType}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white mb-2">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-xs border border-gray-600 hover:bg-gray-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-sm text-gray-300 space-y-2 bg-gradient-to-br from-black via-black to-black border border-white/20 p-3 rounded-lg backdrop-blur-sm bg-opacity-80">
              <p>
                <strong className="text-gray-200">Notice Period:</strong> {job.noticePeriod}
              </p>
              <p>
                <strong className="text-gray-200">Application Deadline:</strong> {job.deadline}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <a
                href={job.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white py-3 rounded-lg font-medium text-center hover:from-yellow-500 hover:to-yellow-400 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 border border-yellow-500/50"
              >
                Apply Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



// export const JobDetailsModal = ({ job, isOpen, onClose, loading }) => {
//   if (!isOpen) return null;

//   const formatSalary = (ctc) =>
//     ctc?.min && ctc?.max ? `₹${ctc.min} - ₹${ctc.max} LPA` : "Not specified";

//   const formatExperience = (experience) =>
//     experience?.min !== undefined && experience?.max !== undefined
//       ? `${experience.min} - ${experience.max} years`
//       : "Not specified";

//   // Custom SVG Icons
//   const CloseIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <line x1="18" y1="6" x2="6" y2="18"></line>
//       <line x1="6" y1="6" x2="18" y2="18"></line>
//     </svg>
//   );

//   const SalaryIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <line x1="12" y1="1" x2="12" y2="23"></line>
//       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//     </svg>
//   );

//   const ExperienceIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//       <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//     </svg>
//   );

//   const JobTypeIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//       <line x1="16" y1="2" x2="16" y2="6"></line>
//       <line x1="8" y1="2" x2="8" y2="6"></line>
//       <line x1="3" y1="10" x2="21" y2="10"></line>
//     </svg>
//   );

//   const LinkIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//       <polyline points="15,3 21,3 21,9"></polyline>
//       <line x1="10" y1="14" x2="21" y2="3"></line>
//     </svg>
//   );

//   const ClockIcon = () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <circle cx="12" cy="12" r="10"></circle>
//       <polyline points="12,6 12,12 16,14"></polyline>
//     </svg>
//   );

//   const CalendarIcon = () => (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
//       <line x1="16" y1="2" x2="16" y2="6"></line>
//       <line x1="8" y1="2" x2="8" y2="6"></line>
//       <line x1="3" y1="10" x2="21" y2="10"></line>
//     </svg>
//   );

//   // Sample job data for demo
//   const sampleJob = job || {
//     title: "Frontend Developer",
//     ctc: { min: 12, max: 18 },
//     experience: { min: 3, max: 6 },
//     employmentType: "Full-time",
//     description: "Join our team as a Frontend Developer. Build responsive web applications using React, TypeScript, and modern CSS. Work with APIs and collaborate with designers.",
//     skillsRequired: ["React", "TypeScript", "JavaScript", "CSS", "HTML", "Git"],
//     noticePeriod: "30 days",
//     deadline: "2024-01-15",
//     companyUrl: "https://example.com/apply"
//   };

//   const currentJob = job || sampleJob;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
//       <div className="bg-black border-2 border-yellow-400 rounded-lg w-full max-w-md max-h-[65vh] overflow-hidden">

//         {/* Header */}
//         <div className="bg-yellow-400 text-black p-3 flex items-center justify-between">
//           <h2 className="font-bold text-lg truncate">
//             {loading ? "Loading..." : currentJob.title}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-black hover:bg-black hover:text-yellow-400 p-1 rounded transition-colors"
//           >
//             <CloseIcon />
//           </button>
//         </div>

//         <div className="overflow-y-auto max-h-[calc(65vh-60px)]">
//           {/* Loading */}
//           {loading && (
//             <div className="flex flex-col items-center justify-center py-12">
//               <div className="animate-spin h-8 w-8 border-2 border-yellow-400 border-t-transparent rounded-full mb-3"></div>
//               <p className="text-white text-sm">Loading job details...</p>
//             </div>
//           )}

//           {/* Content */}
//           {!loading && (
//             <div className="p-4 space-y-4">

//               {/* Stats Grid */}
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="bg-black border border-yellow-400 p-3 rounded text-center">
//                   <div className="bg-yellow-400 text-black p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
//                     <SalaryIcon />
//                   </div>
//                   <p className="text-yellow-400 text-xs font-medium">Salary</p>
//                   <p className="text-white text-xs font-bold mt-1">
//                     {formatSalary(currentJob.ctc)}
//                   </p>
//                 </div>

//                 <div className="bg-black border border-white p-3 rounded text-center">
//                   <div className="bg-white text-black p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
//                     <ExperienceIcon />
//                   </div>
//                   <p className="text-white text-xs font-medium">Experience</p>
//                   <p className="text-white text-xs font-bold mt-1">
//                     {formatExperience(currentJob.experience)}
//                   </p>
//                 </div>

//                 <div className="bg-black border border-white p-3 rounded text-center">
//                   <div className="bg-white text-black p-2 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2">
//                     <JobTypeIcon />
//                   </div>
//                   <p className="text-white text-xs font-medium">Type</p>
//                   <p className="text-white text-xs font-bold mt-1">{currentJob.employmentType}</p>
//                 </div>
//               </div>

//               {/* Description */}
//               <div>
//                 <h3 className="text-white font-bold text-sm mb-2 border-b border-yellow-400 pb-1">
//                   Description
//                 </h3>
//                 <p className="text-white text-xs leading-relaxed">
//                   {currentJob.description}
//                 </p>
//               </div>

//               {/* Skills */}
//               <div>
//                 <h3 className="text-white font-bold text-sm mb-2 border-b border-yellow-400 pb-1">
//                   Skills Required
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {currentJob.skillsRequired?.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Additional Info */}
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-black border border-white p-2 rounded">
//                   <div className="flex items-center space-x-2">
//                     <div className="bg-yellow-400 text-black p-1 rounded">
//                       <ClockIcon />
//                     </div>
//                     <div>
//                       <p className="text-white text-xs">
//                         <span className="font-medium">Notice:</span> {currentJob.noticePeriod}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-black border border-white p-2 rounded">
//                   <div className="flex items-center space-x-2">
//                     <div className="bg-yellow-400 text-black p-1 rounded">
//                       <CalendarIcon />
//                     </div>
//                     <div>
//                       <p className="text-white text-xs">
//                         <span className="font-medium">Deadline:</span> {currentJob.deadline}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Apply Button */}
//               <a
//                 href={currentJob.companyUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="w-full bg-yellow-400 hover:bg-white text-black py-3 rounded font-bold text-center transition-colors duration-200 flex items-center justify-center space-x-2"
//               >
//                 <span>Apply Now</span>
//                 <LinkIcon />
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

