

// components/StudentGroups.js
import React from 'react';

const StudentGroups = () => {
  const groups = [
    { name: 'Computer Science Club', color: 'bg-blue-50' },
    { name: 'Business Society', color: 'bg-green-50' },
    { name: 'Engineering Guild', color: 'bg-purple-50' },
    { name: 'Art & Design Club', color: 'bg-pink-50' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Student Groups</h3>
      <ul className="space-y-2">
        {groups.map((group, index) => (
          <li key={index} className={`p-3 ${group.color} rounded-lg hover:shadow-md transition-shadow cursor-pointer`}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentGroups;