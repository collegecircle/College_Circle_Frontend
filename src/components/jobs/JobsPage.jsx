// // components/JobsPage.js
// import React from 'react';
// import JobCard from './JobCard';

// const JobsPage = () => {
//   const jobs = [
//     { title: 'Software Engineering Intern', company: 'TechCorp', type: 'Internship', location: 'Remote' },
//     { title: 'Marketing Associate', company: 'BrandCo', type: 'Full-time', location: 'New York' },
//     { title: 'Data Analyst', company: 'DataFirm', type: 'Part-time', location: 'San Francisco' },
//     { title: 'UX Designer', company: 'DesignStudio', type: 'Contract', location: 'Los Angeles' },
//     { title: 'Product Manager', company: 'StartupXYZ', type: 'Full-time', location: 'Austin' },
//     { title: 'Research Assistant', company: 'University Lab', type: 'Part-time', location: 'Boston' }
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Job Opportunities</h1>
//         <div className="text-sm text-gray-600">{jobs.length} opportunities available</div>
//       </div>
//       <div className="space-y-4">
//         {jobs.map((job, index) => (
//           <JobCard key={index} {...job} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobsPage;


import React, { useState } from 'react';
import JobCard from './JobCard';
import PageHeader from '../../gobalComponents/PageHeader';
import FilterButtons from '../../gobalComponents/FilterButtons';
import { jobsData, jobFilters } from './jobsData';
import { Briefcase } from 'lucide-react';

const JobsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Jobs');

  const filteredJobs = activeFilter === 'All Jobs'
    ? jobsData
    : jobsData.filter(job => job.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <PageHeader
        title="Find Your Dream"
        highlightedWord="Job"
        highlightColor="yellow-400"
        underlineColor="yellow-400"
        description="Discover amazing career opportunities with top companies across India"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilterButtons
          filters={jobFilters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          theme="yellow"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Stats Bar */}
        {/* <div className="bg-gray-800/50 rounded-xl p-4 mb-8 border border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{filteredJobs.length}</p>
                <p className="text-xs text-gray-400">Available Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {jobsData.filter(job => job.remote).length}
                </p>
                <p className="text-xs text-gray-400">Remote Jobs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">
                  {new Set(jobsData.map(job => job.company)).size}
                </p>
                <p className="text-xs text-gray-400">Companies</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">
                Updated: <span className="text-yellow-400 font-semibold">Today</span>
              </p>
            </div>
          </div>
        </div> */}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>

        {/* No Jobs Found */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-gray-400">Try adjusting your filters to see more opportunities.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;