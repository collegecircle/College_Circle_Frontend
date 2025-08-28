import React from "react";
import { MapPin, Building } from "lucide-react";

const JobCard = ({ title, company, type, location }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case "Internship":
        return "bg-blue-100 text-blue-600";
      case "Full-time":
        return "bg-green-100 text-green-600";
      case "Part-time":
        return "bg-yellow-100 text-yellow-600";
      case "Contract":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-1">
              <Building size={16} />
              <span>{company}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
            type
          )}`}
        >
          {type}
        </span>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
