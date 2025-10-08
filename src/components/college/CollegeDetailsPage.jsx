import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    MapPin, Calendar, Building2, GraduationCap, Star,
    Eye, ArrowRight, Phone, Mail, Globe, ChevronLeft,
    Award, Users, BookOpen, Briefcase
} from "lucide-react";
import InquiryModal from "./InquiryModal";
import OverviewModal from "./OverviewModal";
import { getCollegeById } from "./collegeSlice"; // Adjust path as needed

const CollegeDetailsPage = () => {
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { current, status, error } = useSelector((state) => state.colleges);
    console.log(status, "status")
    console.log(current, "current")
    const user = useSelector((state) => state.auth?.user);
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [showOverviewModal, setShowOverviewModal] = useState(false);
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

        // Wait until user state is known (avoid flashing redirects)
        if (user === undefined) return;

        // Redirect to login if not logged in (but skip if already on login page)
        if (!loggedInUser && location.pathname !== "/userlogin") {
            navigate("/userlogin", {
                state: { from: location.pathname }, // for redirect after login
            });
            return;
        }

        // If logged in and college ID exists, fetch data
        if (loggedInUser && id) {
            dispatch(getCollegeById(id));
        }
    }, [id, user, navigate, dispatch, location.pathname]);


    const handleBackClick = () => {
        navigate(-1);
    };

    const formatAddress = (address) => {
        if (!address) return "Location not available";
        const parts = [];
        if (address.street) parts.push(address.street);
        if (address.city) parts.push(address.city);
        if (address.state) parts.push(address.state);
        if (address.pincode) parts.push(address.pincode);
        return parts.join(", ");
    };

    // Loading State
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="relative flex items-center justify-center">
                        <div className="animate-spin rounded-full h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-yellow-400 mb-4"></div>
                        <img
                            src="/assets/cclogo.PNG"
                            alt="Logo"
                            className="absolute h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-full object-cover"
                        />
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base lg:text-lg mt-4">Loading college details...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (status === "failed" || !current || !"succeeded") {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    {/* <div className="text-red-400 mb-4">
                        <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div> */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">College Not Found</h3>
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">{error || "The college you're looking for doesn't exist."}</p>
                    <button
                        onClick={handleBackClick}
                        className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-all duration-300 text-sm sm:text-base"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const college = current.data;


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-black to-gray-900">
            {/* Hero Section - Responsive */}
            <div className="relative h-48 sm:h-64 lg:h-80 xl:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                <img
                    src={college.gallery?.slideImages?.[0]?.url || college.gallery?.logoUrl || "/assets/cclogo.PNG"}
                    alt={college.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "/assets/cclogo.PNG";
                    }}
                />

                {/* Back Button - Responsive */}
                <button
                    onClick={handleBackClick}
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6 z-20 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center space-x-1 sm:space-x-2 touch-manipulation"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    <span className="text-xs sm:text-sm lg:text-base font-medium hidden xs:inline">Back</span>
                </button>
            </div>

            {/* Main Content - Responsive Container */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 -mt-16 sm:-mt-20 lg:-mt-24 relative z-20 pb-8 sm:pb-12 lg:pb-16">

                {/* College Header Card - Responsive */}
                <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-yellow-400/30 shadow-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                        <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 flex-1 min-w-0">
                            {/* Logo */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-3 border-yellow-400/50 flex-shrink-0 bg-gray-800">
                                <img
                                    src={college.gallery?.logoUrl || "/assets/cclogo.PNG"}
                                    alt={college.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "/assets/cclogo.PNG";
                                    }}
                                />
                            </div>

                            {/* College Info */}
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3">
                                    {college.name}
                                </h1>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-400 mb-2 sm:mb-3">
                                    {college.university}
                                </p>

                                {/* Location */}
                                <div className="flex items-start space-x-2 mb-2 sm:mb-3">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-xs sm:text-sm lg:text-base text-gray-300">
                                        {formatAddress(college.address)}
                                    </span>
                                </div>

                                {/* Badges - Responsive */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="bg-yellow-500/20 text-yellow-400 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold">
                                        {college.type || "Public"}
                                    </span>
                                    {college.accreditation && (
                                        <span className="bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold">
                                            {college.accreditation.split(",")[0]}
                                        </span>
                                    )}
                                    {college.establishedYear && (
                                        <span className="bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold flex items-center">
                                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                                            Est. {college.establishedYear}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons - Responsive */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setShowOverviewModal(true)}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 active:from-blue-600 active:to-blue-700 text-white font-bold py-3 px-6 sm:px-4 lg:px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base touch-manipulation"
                            >
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>Images</span>
                            </button>
                            <button
                                onClick={() => setShowInquiryModal(true)}
                                className="flex-1 sm:flex-none bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 active:from-yellow-600 active:to-yellow-700 text-black font-bold py-3 px-6 sm:px-4 lg:px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base touch-manipulation"
                            >
                                <span>Inquire Now</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout - Responsive */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                    {/* Main Content - Left Side */}
                    <div className="lg:col-span-2 space-y-6 sm:space-y-8">

                        {/* Quick Stats - Responsive Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-gray-900 rounded-xl p-3 sm:p-4 lg:p-5 text-center border border-gray-700 hover:border-yellow-400/50 transition-colors">
                                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-400 mx-auto mb-2" />
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                    {college.establishedYear || "N/A"}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">Established</p>
                            </div>

                            <div className="bg-gray-900 rounded-xl p-3 sm:p-4 lg:p-5 text-center border border-gray-700 hover:border-yellow-400/50 transition-colors">
                                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-400 mx-auto mb-2" />
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                    {college.streams?.length || 0}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">Streams</p>
                            </div>

                            <div className="bg-gray-900 rounded-xl p-3 sm:p-4 lg:p-5 text-center border border-gray-700 hover:border-yellow-400/50 transition-colors">
                                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-400 mx-auto mb-2" />
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                    {college.facilities?.length || 0}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">Facilities</p>
                            </div>

                            <div className="bg-gray-900 rounded-xl p-3 sm:p-4 lg:p-5 text-center border border-gray-700 hover:border-yellow-400/50 transition-colors">
                                <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400 mx-auto mb-2" />
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                                    {college.type || "Public"}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">Type</p>
                            </div>
                        </div>

                        {/* Description */}
                        {college.description && (
                            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                                    About {college.name}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                    {college.description}
                                </p>
                            </div>
                        )}

                        {/* Streams */}
                        {college.streams && college.streams.length > 0 && (
                            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
                                    Available Streams
                                </h2>
                                <div className="space-y-3 sm:space-y-4">
                                    {college.streams.map((stream, index) => (
                                        <div key={index} className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                                                {stream.name}
                                            </h3>
                                            {stream.subStreams && stream.subStreams.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {stream.subStreams.map((subStream, subIndex) => (
                                                        <span
                                                            key={subIndex}
                                                            className="text-xs sm:text-sm bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 rounded-lg"
                                                        >
                                                            {subStream.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Facilities */}
                        {college.facilities && college.facilities.length > 0 && (
                            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
                                    Campus Facilities
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                                    {college.facilities.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center hover:bg-gray-800 transition-colors"
                                        >
                                            <p className="text-xs sm:text-sm text-gray-300">{facility}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Right Side - Sticky on Desktop */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-6 space-y-4 sm:space-y-6">

                            {/* Contact Info */}
                            <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
                                <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                                    Contact Information
                                </h3>
                                <div className="space-y-3 sm:space-y-4">
                                    {college.contact?.phone && (
                                        <a
                                            href={`tel:${college.contact.phone}`}
                                            className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group"
                                        >
                                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm break-all">{college.contact.phone}</span>
                                        </a>
                                    )}
                                    {college.contact?.email && (
                                        <a
                                            href={`mailto:${college.contact.email}`}
                                            className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group"
                                        >
                                            <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm break-all">{college.contact.email}</span>
                                        </a>
                                    )}
                                    {college.contact?.website && (
                                        <a
                                            href={college.contact.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors group"
                                        >
                                            <Globe className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                            <span className="text-xs sm:text-sm break-all">Visit Website</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-400/30">
                                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                                    Interested in this college?
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-300 mb-4">
                                    Get personalized information and guidance from our experts.
                                </p>
                                <button
                                    onClick={() => setShowInquiryModal(true)}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base touch-manipulation"
                                >
                                    <span>Send Inquiry</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showInquiryModal && (
                <InquiryModal
                    college={college}
                    onClose={() => setShowInquiryModal(false)}
                />
            )}

            {showOverviewModal && (
                <OverviewModal
                    college={college}
                    isOpen={showOverviewModal}
                    onClose={() => setShowOverviewModal(false)}
                />
            )}
        </div>
    );
};

export default CollegeDetailsPage;