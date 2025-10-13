import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  BookOpen,
  Lock,
} from "lucide-react";
import { fetchJobs } from "./jobs/jobsSlice";
import { fetchColleges } from "./college/collegeSlice";
import { fetchCourseMaterials } from "./course/courseSlice";
import { fetchOnlineCourses } from "./OnlineCourseUser/onlineCourseSlice";

import { useNavigate } from "react-router-dom";

const HomePreviewSection = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: jobsList, status: jobsStatus } = useSelector(
    (state) => state.jobs
  );

  const { list: collegesList, status: collegesStatus } = useSelector(
    (state) => state.colleges
  );

  const { list: materialList, status: materialStatus } = useSelector(
    (state) => state.materials
  );

  const { list: onlineCoursesList, status: onlineCoursesStatus } = useSelector(
    (state) => state.onlineCourses
  );

  // State to prevent multiple fetches
  const [hasFetchedJobs, setHasFetchedJobs] = useState(false);
  const [hasFetchedColleges, setHasFetchedColleges] = useState(false);
  const [hasFetchedMaterials, setHasFetchedMaterials] = useState(false);
  const [hasFetchedOnlineCourses, setHasFetchedOnlineCourses] = useState(false);

  // Lock condition for Courses (replace with actual logic, e.g., state.auth.isSubscribed)
  const isCoursesLocked = true; // Hardcoded for testing; replace with Redux state or prop

  // Get featured items
  const featuredJobs = Array.isArray(jobsList?.data?.jobs)
    ? jobsList.data?.jobs.slice(0, 2)
    : [];
  const featuredColleges = Array.isArray(collegesList?.data?.colleges)
    ? collegesList.data.colleges.slice(0, 2)
    : [];
  const featuredMaterials = materialList.slice(0, 2);
  const featuredOnlineCourses = onlineCoursesList.slice(0, 2);
  // Fetch data only once
  useEffect(() => {
    if (
      !hasFetchedJobs &&
      jobsStatus === "idle" &&
      (!jobsList?.jobs?.length || jobsList.jobs.length < 2)
    ) {
      dispatch(fetchJobs({ page: 1, limit: 2 }));
      setHasFetchedJobs(true);
    }
    if (
      !hasFetchedColleges &&
      collegesStatus === "idle" &&
      (!collegesList?.colleges?.length || collegesList.colleges.length < 2)
    ) {
      dispatch(fetchColleges({ page: 1, limit: 2 }));
      setHasFetchedColleges(true);
    }
  }, [
    dispatch,
    jobsStatus,
    collegesStatus,
    jobsList?.jobs,
    collegesList?.colleges,
    hasFetchedJobs,
    hasFetchedColleges,
  ]);

  // Fetch data only once
  useEffect(() => {
    if (
      !hasFetchedJobs &&
      jobsStatus === "idle" &&
      (!jobsList?.jobs?.length || jobsList.jobs.length < 2)
    ) {
      dispatch(fetchJobs({ page: 1, limit: 2 }));
      setHasFetchedJobs(true);
    }
    if (
      !hasFetchedColleges &&
      collegesStatus === "idle" &&
      (!collegesList?.colleges?.length || collegesList.colleges.length < 2)
    ) {
      dispatch(fetchColleges({ page: 1, limit: 2 }));
      setHasFetchedColleges(true);
    }
    if (
      !hasFetchedMaterials &&
      materialStatus === "idle" &&
      (!materialList?.materials?.length || materialList.materials.length < 2)
    ) {
      dispatch(fetchCourseMaterials({ page: 1, limit: 2 }));
      setHasFetchedMaterials(true);
    }

    // online courses
    if (
      !hasFetchedOnlineCourses &&
      onlineCoursesStatus === "idle" &&
      (!onlineCoursesList?.length || onlineCoursesList.length < 2)
    ) {
      dispatch(fetchOnlineCourses({ page: 1, limit: 2 }));
      setHasFetchedOnlineCourses(true);
    }
  }, [
    dispatch,
    jobsStatus,
    collegesStatus,
    materialStatus,
    jobsList?.jobs,
    collegesList?.colleges,
    materialList?.materials,
    hasFetchedJobs,
    hasFetchedColleges,
    hasFetchedMaterials,
    onlineCoursesList?.courses,
  ]);

  // Navigation handler to check authentication
  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  // Mini Card Component for Jobs
  const JobMiniCard = ({ job }) => (
    <div
      onClick={() => handleNavigation("jobs")}
      className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
    >
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
          <img
            src="/assets/cclogo.PNG"
            alt={job.company}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
            {job.title}
          </h4>
          <p className="text-gray-400 text-xs mb-2">{job.company}</p>
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold text-sm">
              {job.salary}
            </span>
            <span className="text-xs text-gray-500">{job.location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Mini Card Component for Colleges
  const CollegeMiniCard = ({ college }) => (
    <div
      onClick={() => handleNavigation("colleges")}
      className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
    >
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
          <img
            src="/assets/cclogo-black-white.png"
            alt={college.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
            {college.name}
          </h4>
          <p className="text-gray-400 text-xs mb-2">{college.ranking}</p>
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold text-sm">
              {college.fees}
            </span>
            <span className="text-xs text-gray-500">{college.location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Mini Card Component for Courses
  const CourseMiniCard = ({ material }) => (
    <div
      onClick={() => handleNavigation("study-materials")}
      className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
    >
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
          <img
            src={material.thumbnileImgUrl || || "/assets/cclogo.PNG"}
            alt={material.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
            {material.title}
          </h4>
          {/* <p className="text-gray-400 text-xs mb-2">by {course.provider}</p> */}
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold text-sm">
              {material.price > 0 ? `₹${material.price}` : "FREE"}
            </span>
            {/* <span className="text-xs text-gray-500">
              {material.registeredCount}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );

  const OnlineCourseMiniCard = ({ course }) => (
    <div
      onClick={() => handleNavigation("courses")}
      className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
    >
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
          <img
            src={course.thumbnailImgUrl || "/assets/cclogo.PNG"}
            alt={course.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
            {course.name}
          </h4>
          {/* <p className="text-gray-400 text-xs mb-2">by {course.provider}</p> */}
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-semibold text-sm">
              {course.price > 0 ? `₹${course.price}` : "FREE"}
            </span>
            {/* <span className="text-xs text-gray-500">
              {course.registeredCount}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-br from-black via-black to-black"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            One Circle{" "}
            <span className="text-yellow-400">, Infinite Oppertunities</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to advance your career and education
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Colleges Section */}
          <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Top Colleges</h3>
                  <p className="text-gray-400 text-sm">Premier institutions</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation("colleges")}
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {collegesStatus === "loading" ? (
                <div className="text-gray-400 text-center">
                  Loading colleges...
                </div>
              ) : featuredColleges.length === 0 ? (
                <div className="text-gray-400 text-center">
                  No colleges available
                </div>
              ) : (
                featuredColleges.map((college) => (
                  <CollegeMiniCard key={college.id} college={college} />
                ))
              )}
            </div>

            <button
              onClick={() => handleNavigation("colleges")}
              className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View All Colleges</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Popular Courses
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Find Your Best Mentors
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation("study-materials")}
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {onlineCoursesStatus === "loading" ? (
                <div className="text-gray-400 text-center">
                  Loading courses...
                </div>
              ) : featuredOnlineCourses.length === 0 ? (
                <div className="text-gray-400 text-center">
                  No courses available
                </div>
              ) : (
                featuredOnlineCourses.map((course) => (
                  <OnlineCourseMiniCard key={course.id} course={course} />
                ))
              )}
            </div>

            <button
              onClick={() => handleNavigation("courses")}
              className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {/* Jobs Section */}
          <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Latest Jobs</h3>
                  <p className="text-gray-400 text-sm">
                    Find your perfect role
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation("jobs")}
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {jobsStatus === "loading" ? (
                <div className="text-gray-400 text-center">Loading jobs...</div>
              ) : featuredJobs.length === 0 ? (
                <div className="text-gray-400 text-center">
                  No jobs available
                </div>
              ) : (
                featuredJobs.map((job) => (
                  <JobMiniCard key={job.id} job={job} />
                ))
              )}
            </div>

            <button
              onClick={() => handleNavigation("jobs")}
              className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View All Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Courses Section */}

          {/* materials Section */}
          <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Study Materials
                  </h3>
                  <p className="text-gray-400 text-sm">study hunt</p>
                </div>
              </div>
              <button
                onClick={() => handleNavigation("study-materials")}
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {materialStatus === "loading" ? (
                <div className="text-gray-400 text-center">
                  Loading materials...
                </div>
              ) : featuredMaterials.length === 0 ? (
                <div className="text-gray-400 text-center">
                  No materails available
                </div>
              ) : (
                featuredMaterials.map((material) => (
                  <CourseMiniCard key={material.id} material={material} />
                ))
              )}
            </div>

            <button
              onClick={() => handleNavigation("study-materials")}
              className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View All materials</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 text-center py-4">
          <h3 className="text-2xl font-bold text-white mb-8">
            Ready to <span className="text-yellow-400">Get Started?</span>
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleNavigation("jobs")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <Briefcase className="w-5 h-5" />
              <span>Browse Jobs</span>
            </button>
            <button
              onClick={() => handleNavigation("colleges")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Find Colleges</span>
            </button>
            <button
              onClick={() => handleNavigation("study-materials")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-400 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <BookOpen className="w-5 h-5" />
              <span>Take Courses</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
  // // Mini Card Component for Jobs
  // const JobMiniCard = ({ job }) => (
  //     <div
  //         onClick={() => handleNavigation('jobs')}
  //         className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
  //     >
  //         <div className="flex items-start space-x-3">
  //             <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
  //                 <img src="/assets/cclogo.PNG" alt={job.company} className="w-full h-full object-cover" />
  //             </div>
  //             <div className="flex-1 min-w-0">
  //                 <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
  //                     {job.title}
  //                 </h4>
  //                 <p className="text-gray-400 text-xs mb-2">{job.company}</p>
  //                 <div className="flex items-center justify-between">
  //                     <span className="text-yellow-400 font-semibold text-sm">{job.salary}</span>
  //                     <span className="text-xs text-gray-500">{job.location}</span>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // );

  // // Mini Card Component for Colleges
  // const CollegeMiniCard = ({ college }) => (
  //     <div
  //         onClick={() => handleNavigation('colleges')}
  //         className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
  //     >
  //         <div className="flex items-start space-x-3">
  //             <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
  //                 <img src="/assets/cclogo-black-white.png" alt={college.name} className="w-full h-full object-cover" />
  //             </div>
  //             <div className="flex-1 min-w-0">
  //                 <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
  //                     {college.name}
  //                 </h4>
  //                 <p className="text-gray-400 text-xs mb-2">{college.ranking}</p>
  //                 <div className="flex items-center justify-between">
  //                     <span className="text-yellow-400 font-semibold text-sm">{college.fees}</span>
  //                     <span className="text-xs text-gray-500">{college.location}</span>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // );

  // // Mini Card Component for Courses
  // const CourseMiniCard = ({ course }) => (
  //     <div
  //         onClick={() => handleNavigation('courses')}
  //         className="bg-slate-1000 rounded-xl p-4 hover:bg-slate-1000 transition-all duration-300 cursor-pointer group border border-gray-700 hover:border-yellow-400 active:scale-95 transform"
  //     >
  //         <div className="flex items-start space-x-3">
  //             <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
  //                 <img src={course.logo} alt={course.provider} className="w-full h-full object-cover" />
  //             </div>
  //             <div className="flex-1 min-w-0">
  //                 <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-400 transition-colors duration-300">
  //                     {course.name}
  //                 </h4>
  //                 <p className="text-gray-400 text-xs mb-2">by {course.provider}</p>
  //                 <div className="flex items-center justify-between">
  //                     <span className="text-yellow-400 font-semibold text-sm">{course.price}</span>
  //                     <span className="text-xs text-gray-500">{course.downloads}</span>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // );

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-br from-black via-black to-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            One Circle{" "}
            <span className="text-yellow-400">, Infinite Oppertunities</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to advance your career and education
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700"> */}
          {/* <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Latest Jobs</h3>
                                    <p className="text-gray-400 text-sm">Find your perfect role</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleNavigation('jobs')}
                                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div> */}
          {/* 
                        <div className="space-y-4 mb-6">
                            {jobsStatus === 'loading' ? (
                                <div className="text-gray-400 text-center">Loading jobs...</div>
                            ) : featuredJobs.length === 0 ? (
                                <div className="text-gray-400 text-center">No jobs available</div>
                            ) : (
                                featuredJobs.map((job) => (
                                    <JobMiniCard key={job.id} job={job} />
                                ))
                            )}
                        </div> */}
          {/* 
                        <button
                            onClick={() => handleNavigation('jobs')}
                            className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <span>View All Jobs</span>
                            <ArrowRight className="w-4 h-4" />
                        </button> */}
        </div>

        {/* Colleges Section */}
        {/* <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700"> */}
        {/* <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Top Colleges</h3>
                                    <p className="text-gray-400 text-sm">Premier institutions</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleNavigation('colleges')}
                                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div> */}

        {/* <div className="space-y-4 mb-6">
                            {collegesStatus === 'loading' ? (
                                <div className="text-gray-400 text-center">Loading colleges...</div>
                            ) : featuredColleges.length === 0 ? (
                                <div className="text-gray-400 text-center">No colleges available</div>
                            ) : (
                                featuredColleges.map((college) => (
                                    <CollegeMiniCard key={college.id} college={college} />
                                ))
                            )}
                        </div> */}
        {/* 
                        <button
                            onClick={() => handleNavigation('colleges')}
                            className="w-full bg-yellow-500/20 text-yellow-400 py-3 rounded-xl font-semibold hover:bg-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <span>View All Colleges</span>
                            <ArrowRight className="w-4 h-4" />
                        </button> */}
        {/* </div> */}

        {/* Courses Section */}
        {/* <div className="bg-slate-1800 rounded-2xl p-6 border border-gray-700"> */}
        {/* <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Popular Courses</h3>
                                    <p className="text-gray-400 text-sm">Skill development</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleNavigation('courses')}
                                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div> */}

        {/* <div className="space-y-4 mb-6">
                            {isCoursesLocked ? (
                                <div className="text-center text-gray-400">
                                    <Lock className="w-10 h-10 mx-auto mb-2 text-yellow-400" />
                                    <button
                                        onClick={() => handleNavigation('subscribe')} // Adjust to your subscription route
                                        className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-yellow-600 transition-all duration-300"
                                    >
                                        Coming Soon
                                    </button>
                                </div>
                            ) : (
                                featuredCourses.map((course) => (
                                    <CourseMiniCard key={course.id} course={course} />
                                ))
                            )}
                        </div> */}
        {/* </div> */}
        {/* </div> */}

        {/* Quick Actions */}
        <div className="mt-16 text-center py-4">
          {/* <h3 className="text-2xl font-bold text-white mb-8">
                        Ready to <span className="text-yellow-400">Get Started?</span>
                    </h3> */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleNavigation("jobs")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <Briefcase className="w-5 h-5" />
              <span>Browse Jobs</span>
            </button>
            <button
              onClick={() => handleNavigation("colleges")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Find Colleges</span>
            </button>
            <button
              onClick={() => handleNavigation("courses")}
              className="bg-gradient-to-r from-yellow-500 to-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-400 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
            >
              <BookOpen className="w-5 h-5" />
              <span>Take Courses</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePreviewSection;
