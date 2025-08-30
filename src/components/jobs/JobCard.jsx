import React from "react";
import { ArrowRight } from "lucide-react";

// const JobCard = ({ title, company, type, location }) => {
//   const getTypeColor = (type) => {
//     switch (type) {
//       case "Internship":
//         return "bg-blue-100 text-blue-600";
//       case "Full-time":
//         return "bg-green-100 text-green-600";
//       case "Part-time":
//         return "bg-yellow-100 text-yellow-600";
//       case "Contract":
//         return "bg-purple-100 text-purple-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
//           <div className="flex items-center space-x-4 text-gray-600">
//             <div className="flex items-center space-x-1">
//               <Building size={16} />
//               <span>{company}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <MapPin size={16} />
//               <span>{location}</span>
//             </div>
//           </div>
//         </div>
//         <span
//           className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
//             type
//           )}`}
//         >
//           {type}
//         </span>
//       </div>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//         Apply Now
//       </button>
//     </div>
//   );
// };

// export default JobCard;



const JobCard = ({ job }) => {

  return (
    <div className={`${job.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
      {/* <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveItem(`job-${job.id}`);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                >
                    <Bookmark
                        className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
                            }`}
                    />
                </button> */}

      <div className="mb-6">
        <span className="text-lg font-bold text-black">{job.salary}</span>
      </div>

      <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
        {job.title}
      </h3>

      <div className="flex items-center justify-center mb-8">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-black/30 rounded-full"></div>
          <div className="w-2 h-2 bg-black/20 rounded-full"></div>
          <div className="w-2 h-2 bg-black/10 rounded-full"></div>
          <div className="w-2 h-2 bg-black/10 rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-black text-sm">{job.title}</p>
            <p className="text-black/70 text-xs">{job.company}</p>
          </div>
        </div>

        <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
          View
        </button>
      </div>

      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
        <ArrowRight className="w-6 h-6 text-black/50" />
      </div>
    </div>
  );
};

export default JobCard;