// components/JobsPage.js
import React from 'react';
import JobCard from './JobCard';

const JobsPage = () => {
  const jobs = [
    { title: 'Software Engineering Intern', company: 'TechCorp', type: 'Internship', location: 'Remote' },
    { title: 'Marketing Associate', company: 'BrandCo', type: 'Full-time', location: 'New York' },
    { title: 'Data Analyst', company: 'DataFirm', type: 'Part-time', location: 'San Francisco' },
    { title: 'UX Designer', company: 'DesignStudio', type: 'Contract', location: 'Los Angeles' },
    { title: 'Product Manager', company: 'StartupXYZ', type: 'Full-time', location: 'Austin' },
    { title: 'Research Assistant', company: 'University Lab', type: 'Part-time', location: 'Boston' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Job Opportunities</h1>
        <div className="text-sm text-gray-600">{jobs.length} opportunities available</div>
      </div>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;