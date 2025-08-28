
// components/EventCard.js
import React from 'react';
import { Calendar, Tag } from 'lucide-react';

const EventCard = ({ title, date, urgent, category }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-600';
      case 'Career': return 'bg-green-100 text-green-600';
      case 'Technology': return 'bg-purple-100 text-purple-600';
      case 'Networking': return 'bg-yellow-100 text-yellow-600';
      case 'Competition': return 'bg-red-100 text-red-600';
      case 'Financial': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
      urgent ? 'bg-red-50 border-l-4 border-red-400' : 'bg-white'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          {urgent && (
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-medium">
              URGENT
            </span>
          )}
          <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-1 text-gray-600">
        <Calendar size={16} />
        <span className="text-sm">{date}</span>
      </div>
    </div>
  );
};

export default EventCard;