import React from "react";
import { ArrowRight, MapPin, Eye } from "lucide-react";

import getUserFromStorage from "../helpers/helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CollegeCard = ({ college, onKnowMore, onOverview }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  // auth
  const loggedInUser = user || getUserFromStorage();

  const formatAddress = (address) => {
    if (!address) return "Location not available";
    return `${address.city}, ${address.state}`;
  };

  const getStreamsCount = (streams) => {
    if (!streams || !Array.isArray(streams)) return "0";
    return streams
      .reduce((total, stream) => {
        return total + (stream.subStreams ? stream.subStreams.length : 0);
      }, 0)
      .toString();
  };

  const getFacilitiesCount = (facilities) => {
    if (!facilities || !Array.isArray(facilities)) return "0";
    return facilities.length.toString();
  };

  // const handleKnowMore = (e) => {
  //   if (!loggedInUser) {
  //     navigate("/userlogin", { state: { from: window.location.pathname } });
  //     return;
  //   }

  //   e.preventDefault();
  //   e.stopPropagation();
  //   onKnowMore(college);
  // };


  const handleViewDetails = () => {
    const loggedInUser = user || getUserFromStorage();

    if (loggedInUser) {
      // Navigate to college detail page
      navigate(`/colleges/${college.collegeId || college.id || college._id}`);
    } else {
      // Redirect to login with return path
      navigate("/userlogin", {
        state: { from: `/colleges/${college.collegeId || college.id || college._id}` }
      });
    }
  };

  return (
    <div className="bg-slate-1500 rounded-2xl p-4 sm:p-6 relative group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 hover:border-yellow-400 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* College Header */}
      <div className="relative z-10 mb-4 sm:mb-6">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border-2 border-yellow-400/30 bg-gray-800">
            <img
              src={college.gallery?.logoUrl || "/assets/cclogo.PNG"}
              alt={college.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/assets/cclogo.PNG";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
              {college.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2 line-clamp-1">
              {college.university}
            </p>
            <div className="flex items-center space-x-1 mb-2 sm:mb-3">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-400 text-xs sm:text-sm line-clamp-1">
                {formatAddress(college.address)}
              </span>
            </div>

            {/* Type Badge */}
            <div className="flex items-center space-x-2 flex-wrap gap-1">
              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md text-xs font-semibold">
                {college.type || "Public"}
              </span>
              {college.accreditation && (
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-semibold">
                  {college.accreditation.split(",")[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
          <p className="text-xs text-gray-400">Established</p>
          <p className="font-semibold text-white text-xs sm:text-sm">
            {college.establishedYear || "N/A"}
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
          <p className="text-xs text-gray-400">Programs</p>
          <p className="font-semibold text-white text-xs sm:text-sm">
            {getStreamsCount(college.streams)}
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
          <p className="text-xs text-gray-400">Facilities</p>
          <p className="font-semibold text-white text-xs sm:text-sm">
            {getFacilitiesCount(college.facilities)}
          </p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
          <p className="text-xs text-gray-400">Type</p>
          <p className="font-semibold text-white text-xs sm:text-sm">
            {college.type || "Public"}
          </p>
        </div>
      </div>

      {/* Streams Preview */}
      {college.streams && college.streams.length > 0 && (
        <div className="relative z-10 mb-4 sm:mb-6">
          <p className="text-xs text-gray-400 mb-2">Popular Streams:</p>
          <div className="flex flex-wrap gap-1">
            {college.streams.slice(0, 2).map((stream, index) => (
              <span
                key={index}
                className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded"
              >
                {stream.name}
              </span>
            ))}
            {college.streams.length > 2 && (
              <span className="text-xs text-gray-500">
                +{college.streams.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Single Button (Know More) */}
      <div className="relative z-10">
        <button
          onClick={handleViewDetails}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 
               hover:from-yellow-400 hover:to-yellow-500 
               active:from-yellow-600 active:to-yellow-700 
               text-black font-bold py-3 px-4 rounded-xl 
               transition-all duration-300 flex items-center 
               justify-center space-x-2 shadow-lg hover:shadow-xl 
               transform hover:scale-[1.02] active:scale-[0.98] 
               text-sm sm:text-base"
        >
          <span>Know More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-yellow-500/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>

      {/* Mobile Ripple Effect */}
      <div className="sm:hidden absolute inset-0 bg-yellow-400/0 active:bg-yellow-400/10 rounded-2xl transition-colors duration-150 pointer-events-none"></div>
    </div>
  );
};

export default CollegeCard;
