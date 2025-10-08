import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Clock, Calendar, Bell } from "lucide-react";
import { fetchJobById } from "./jobsSlice";

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { selectedJob, loadingJob, error } = useSelector((state) => state.jobs);
    const user = useSelector((state) => state.auth?.user);

    const getUserFromStorage = () => {
        try {
            const userData = localStorage.getItem("user");
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error reading user from storage:", error);
            return null;
        }
    };

    useEffect(() => {
        const loggedInUser = user || getUserFromStorage();

        if (user === undefined) return;

        if (!loggedInUser && location.pathname !== "/userlogin") {
            navigate("/userlogin", {
                state: { from: location.pathname }
            });
            return;
        }

        if (loggedInUser && jobId) {
            dispatch(fetchJobById(jobId));
        }
    }, [jobId, user, navigate, dispatch, location.pathname]);

    const formatSalary = (ctc) =>
        ctc?.min && ctc?.max ? `${ctc.min} - ${ctc.max} LPA` : "Not specified";

    const formatExperience = (experience) =>
        experience?.min !== undefined && experience?.max !== undefined
            ? `${experience.min} - ${experience.max} years`
            : "Not specified";

    const handleBack = () => {
        navigate("/jobs");
    };

    // Loading state
    if (loadingJob) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="relative flex items-center justify-center mb-4">
                        <div className="animate-spin h-16 w-16 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
                    </div>
                    <p className="text-gray-400">Loading job details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <Briefcase className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Job not found
                    </h3>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button
                        onClick={handleBack}
                        className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
                    >
                        Back to Jobs
                    </button>
                </div>
            </div>
        );
    }

    if (!selectedJob) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
            {/* Hero Header Section */}
            <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-400 hover:text-yellow-400 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Jobs</span>
                    </button>

                    <div className="space-y-4">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                            {selectedJob.title}
                        </h1>

                        {selectedJob.location && (
                            <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                                    <span className="text-sm sm:text-base">{selectedJob.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 text-yellow-400" />
                                    <span className="text-sm sm:text-base">{selectedJob.employmentType}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Job Description */}
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center">
                                {/* <Briefcase className="w-6 h-6 mr-3 text-yellow-400" /> */}
                                Job Description
                            </h2>
                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                    {selectedJob.description}
                                </p>
                            </div>
                        </div>

                        {/* Skills Required */}
                        {selectedJob.skillsRequired && selectedJob.skillsRequired.length > 0 && (
                            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                                    Skills Required
                                </h2>
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {selectedJob.skillsRequired.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-lg text-xs sm:text-sm font-medium hover:border-yellow-400/50 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Key Stats Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-6 backdrop-blur-sm sticky top-6">
                            <h3 className="text-lg font-bold text-white mb-6">Job Overview</h3>

                            <div className="space-y-5">
                                {/* Salary */}
                                <div className="flex items-start space-x-4">
                                    {/* <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <CurrencyDollar className="w-5 h-5 text-yellow-400" />
                                    </div> */}
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Salary Range</p>
                                        <p className="text-base font-bold text-yellow-400">
                                            {formatSalary(selectedJob.ctc)}
                                        </p>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="flex items-start space-x-4">
                                    {/* <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <Briefcase className="w-5 h-5 text-yellow-400" />
                                    </div> */}
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Experience</p>
                                        <p className="text-base font-bold text-yellow-400">
                                            {formatExperience(selectedJob.experience)}
                                        </p>
                                    </div>
                                </div>

                                {/* Employment Type */}
                                <div className="flex items-start space-x-4">
                                    {/* <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                    </div> */}
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Job Type</p>
                                        <p className="text-base font-bold text-yellow-400">
                                            {selectedJob.employmentType}
                                        </p>
                                    </div>
                                </div>

                                {/* Notice Period */}
                                {selectedJob.noticePeriod && (
                                    <div className="flex items-start space-x-4">
                                        {/* <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                            <Bell className="w-5 h-5 text-yellow-400" />
                                        </div> */}
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Notice Period</p>
                                            <p className="text-base font-bold text-yellow-400">
                                                {selectedJob.noticePeriod}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Deadline */}
                                {selectedJob.deadline && (
                                    <div className="flex items-start space-x-4">
                                        {/* <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                            <Calendar className="w-5 h-5 text-yellow-400" />
                                        </div> */}
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Deadline</p>
                                            <p className="text-base font-bold text-yellow-400">
                                                {selectedJob.deadline}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Apply Button */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <a
                                    href={selectedJob.companyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-white py-3 sm:py-4 rounded-xl font-semibold text-center hover:from-yellow-500 hover:to-yellow-400 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 border border-yellow-500/50 text-sm sm:text-base"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;