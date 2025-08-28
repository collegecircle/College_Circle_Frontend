
// components/CourseCard.js
import React from 'react';
import { User, Clock, BookOpen } from 'lucide-react';

const CourseCard = ({ title, credits, level, instructor, duration }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-600';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-600';
      case 'Advanced': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-600 flex items-center">
            <BookOpen size={16} className="mr-1" />
            {credits} Credits
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(level)}`}>
            {level}
          </span>
        </div>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <User size={16} className="mr-2" />
          <span>{instructor}</span>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-2" />
          <span>{duration}</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Enroll Now
      </button>
    </div>
  );
};

export default CourseCard;