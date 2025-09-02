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
      <div className="bg-gradient-to-br from-black via-black to-black border border-white/10 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl backdrop-blur-md bg-opacity-90">
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