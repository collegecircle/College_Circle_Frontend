import React, { useState } from 'react';
import {
    Bookmark, ArrowRight, MapPin, Clock, DollarSign, Star, Users,
    GraduationCap, BookOpen, Play, Calendar, MessageCircle, Award,
    Building, Timer, TrendingUp
} from 'lucide-react';

const AllPagesCards = () => {
    const [currentPage, setCurrentPage] = useState('jobs');
    const [savedItems, setSavedItems] = useState(new Set());

    const toggleSaveItem = (itemId) => {
        const newSavedItems = new Set(savedItems);
        if (newSavedItems.has(itemId)) {
            newSavedItems.delete(itemId);
        } else {
            newSavedItems.add(itemId);
        }
        setSavedItems(newSavedItems);
    };

    // Jobs Data
    const jobsData = [
        {
            id: 1,
            title: "Senior UI Developer",
            company: "Nike",
            companyLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop",
            salary: "$120/hr",
            location: "San Francisco, CA",
            type: "Remote",
            posted: "2 days ago",
            bgColor: "bg-purple-100"
        },
        {
            id: 2,
            title: "Senior Backend Engineer",
            company: "Google",
            companyLogo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=50&h=50&fit=crop",
            salary: "$150/hr",
            location: "Mountain View, CA",
            type: "Full-time",
            posted: "1 day ago",
            bgColor: "bg-blue-100"
        },
        {
            id: 3,
            title: "Azure Data Engineer",
            company: "Airbnb",
            companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
            salary: "$125-145/hr",
            location: "Seattle, WA",
            type: "Contract",
            posted: "3 days ago",
            bgColor: "bg-green-100"
        },
        {
            id: 4,
            title: "Frontend Developer",
            company: "Microsoft",
            companyLogo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=50&h=50&fit=crop",
            salary: "$125-145/hr",
            location: "Austin, TX",
            type: "Hybrid",
            posted: "1 week ago",
            bgColor: "bg-yellow-100"
        },
        {
            id: 5,
            title: "Senior Backend Engineer",
            company: "Meta",
            companyLogo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=50&h=50&fit=crop",
            salary: "$150/hr",
            location: "New York, NY",
            type: "Remote",
            posted: "4 days ago",
            bgColor: "bg-pink-100"
        },
        {
            id: 6,
            title: "Senior UI Developer",
            company: "Apple",
            companyLogo: "https://images.unsplash.com/photo-1621768216002-5ac171876625?w=50&h=50&fit=crop",
            salary: "$120/hr",
            location: "Cupertino, CA",
            type: "Full-time",
            posted: "5 days ago",
            bgColor: "bg-indigo-100"
        }
    ];

    // Colleges Data
    const collegesData = [
        {
            id: 1,
            name: "IIT Delhi",
            location: "New Delhi, India",
            fees: "₹2.5L/year",
            ranking: "#2 Engineering",
            students: "12,000+",
            logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=50&h=50&fit=crop",
            bgColor: "bg-blue-100",
            established: "1961"
        },
        {
            id: 2,
            name: "IISc Bangalore",
            location: "Bangalore, India",
            fees: "₹50K/year",
            ranking: "#1 Research",
            students: "3,500+",
            logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=50&h=50&fit=crop",
            bgColor: "bg-green-100",
            established: "1909"
        },
        {
            id: 3,
            name: "AIIMS Delhi",
            location: "New Delhi, India",
            fees: "₹1.08L/year",
            ranking: "#1 Medical",
            students: "8,000+",
            logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=50&h=50&fit=crop",
            bgColor: "bg-red-100",
            established: "1956"
        },
        {
            id: 4,
            name: "ISI Kolkata",
            location: "Kolkata, India",
            fees: "₹15K/year",
            ranking: "#1 Statistics",
            students: "2,000+",
            logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=50&h=50&fit=crop",
            bgColor: "bg-purple-100",
            established: "1931"
        },
        {
            id: 5,
            name: "IIT Bombay",
            location: "Mumbai, India",
            fees: "₹2.3L/year",
            ranking: "#3 Engineering",
            students: "10,000+",
            logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=50&h=50&fit=crop",
            bgColor: "bg-orange-100",
            established: "1958"
        },
        {
            id: 6,
            name: "BITS Pilani",
            location: "Pilani, India",
            fees: "₹4.2L/year",
            ranking: "#4 Engineering",
            students: "18,000+",
            logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=50&h=50&fit=crop",
            bgColor: "bg-teal-100",
            established: "1964"
        }
    ];

    // Courses Data
    const coursesData = [
        {
            id: 1,
            title: "Full Stack Development",
            instructor: "Priya Sharma",
            price: "₹15,999",
            originalPrice: "₹25,999",
            duration: "16 weeks",
            students: "3,500+",
            rating: 4.8,
            logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop",
            bgColor: "bg-blue-100",
            level: "Beginner"
        },
        {
            id: 2,
            title: "Digital Marketing",
            instructor: "Rahul Mehta",
            price: "₹12,999",
            originalPrice: "₹18,999",
            duration: "10 weeks",
            students: "2,200+",
            rating: 4.7,
            logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=50&h=50&fit=crop",
            bgColor: "bg-green-100",
            level: "Intermediate"
        },
        {
            id: 3,
            title: "Data Science ML",
            instructor: "Dr. Anjali Gupta",
            price: "₹24,999",
            originalPrice: "₹35,999",
            duration: "20 weeks",
            students: "4,100+",
            rating: 4.9,
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop",
            bgColor: "bg-purple-100",
            level: "Advanced"
        },
        {
            id: 4,
            title: "Mobile App Flutter",
            instructor: "Vikram Singh",
            price: "₹18,999",
            originalPrice: "₹28,999",
            duration: "12 weeks",
            students: "1,800+",
            rating: 4.6,
            logo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=50&h=50&fit=crop",
            bgColor: "bg-cyan-100",
            level: "Beginner"
        },
        {
            id: 5,
            title: "UI/UX Design",
            instructor: "Sneha Reddy",
            price: "₹14,999",
            originalPrice: "₹22,999",
            duration: "8 weeks",
            students: "2,800+",
            rating: 4.7,
            logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=50&h=50&fit=crop",
            bgColor: "bg-pink-100",
            level: "Beginner"
        },
        {
            id: 6,
            title: "DevOps & Cloud",
            instructor: "Amit Verma",
            price: "₹22,999",
            originalPrice: "₹32,999",
            duration: "14 weeks",
            students: "1,500+",
            rating: 4.8,
            logo: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=50&h=50&fit=crop",
            bgColor: "bg-orange-100",
            level: "Advanced"
        }
    ];

    // Community Data
    const communityData = [
        {
            id: 1,
            name: "Study Groups Hub",
            description: "Academic collaboration",
            members: "8,500+",
            posts: "150/day",
            activity: "Very Active",
            logo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop",
            bgColor: "bg-blue-100",
            type: "Academic"
        },
        {
            id: 2,
            name: "Career Network",
            description: "Professional connections",
            members: "15,000+",
            posts: "200/day",
            activity: "Highly Active",
            logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
            bgColor: "bg-green-100",
            type: "Professional"
        },
        {
            id: 3,
            name: "Project Collab",
            description: "Innovation & startups",
            members: "6,200+",
            posts: "80/day",
            activity: "Active",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=50&h=50&fit=crop",
            bgColor: "bg-purple-100",
            type: "Innovation"
        },
        {
            id: 4,
            name: "Creative Arts",
            description: "Design & multimedia",
            members: "4,800+",
            posts: "120/day",
            activity: "Active",
            logo: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=50&h=50&fit=crop",
            bgColor: "bg-pink-100",
            type: "Creative"
        },
        {
            id: 5,
            name: "Tech Innovators",
            description: "Latest technology trends",
            members: "12,000+",
            posts: "180/day",
            activity: "Very Active",
            logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=50&h=50&fit=crop",
            bgColor: "bg-cyan-100",
            type: "Technology"
        },
        {
            id: 6,
            name: "Business Leaders",
            description: "Entrepreneurship & leadership",
            members: "7,500+",
            posts: "90/day",
            activity: "Active",
            logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
            bgColor: "bg-amber-100",
            type: "Business"
        }
    ];

    // Job Card Component
    const JobCard = ({ job }) => {
        const isSaved = savedItems.has(`job-${job.id}`);

        return (
            <div className={`${job.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveItem(`job-${job.id}`);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                >
                    <Bookmark
                        className={`w-4 h-4 transition-all duration-300 ${isSaved ? '-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
                            }`}
                    />
                </button>

                <div className="mb-6">
                    <span className="text-lg font-bold text-black">{job.salary}</span>
                </div>

                <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
                    {job.title}
                </h3>

                <div className="flex items-center justify-center mb-8">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={job.companyLogo}
                                alt={job.company}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-black text-sm">{job.title}</p>
                            <p className="text-black/70 text-xs">{job.company}</p>
                        </div>
                    </div>

                    <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
                        View
                    </button>
                </div>

                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <ArrowRight className="w-6 h-6 text-black/50" />
                </div>
            </div>
        );
    };

    // College Card Component
    const CollegeCard = ({ college }) => {
        const isSaved = savedItems.has(`college-${college.id}`);

        return (
            <div className={`${college.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveItem(`college-${college.id}`);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                >
                    <Bookmark
                        className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
                            }`}
                    />
                </button>

                <div className="mb-6">
                    <span className="text-lg font-bold text-black">{college.fees}</span>
                </div>

                <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
                    {college.name}
                </h3>

                <div className="flex items-center justify-center mb-8">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={college.logo}
                                alt={college.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-black text-sm">{college.name}</p>
                            <p className="text-black/70 text-xs">{college.location}</p>
                        </div>
                    </div>

                    <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
                        View
                    </button>
                </div>

                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <ArrowRight className="w-6 h-6 text-black/50" />
                </div>
            </div>
        );
    };

    // Course Card Component
    const CourseCard = ({ course }) => {
        const isSaved = savedItems.has(`course-${course.id}`);

        return (
            <div className={`${course.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveItem(`course-${course.id}`);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                >
                    <Bookmark
                        className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
                            }`}
                    />
                </button>

                <div className="mb-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-black">{course.price}</span>
                        <span className="text-sm text-black/50 line-through">{course.originalPrice}</span>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
                    {course.title}
                </h3>

                <div className="flex items-center justify-center mb-8">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={course.logo}
                                alt={course.instructor}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-black text-sm">{course.title}</p>
                            <p className="text-black/70 text-xs">by {course.instructor}</p>
                        </div>
                    </div>

                    <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
                        View
                    </button>
                </div>

                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <ArrowRight className="w-6 h-6 text-black/50" />
                </div>
            </div>
        );
    };

    // Community Card Component
    const CommunityCard = ({ community }) => {
        const isSaved = savedItems.has(`community-${community.id}`);

        return (
            <div className={`${community.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveItem(`community-${community.id}`);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
                >
                    <Bookmark
                        className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
                            }`}
                    />
                </button>

                <div className="mb-6">
                    <span className="text-lg font-bold text-black">{community.members}</span>
                </div>

                <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
                    {community.name}
                </h3>

                <div className="flex items-center justify-center mb-8">
                    <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-black/30 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/20 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                        <div className="w-2 h-2 bg-black/10 rounded-full"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={community.logo}
                                alt={community.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-black text-sm">{community.name}</p>
                            <p className="text-black/70 text-xs">{community.description}</p>
                        </div>
                    </div>

                    <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
                        View
                    </button>
                </div>

                <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                    <ArrowRight className="w-6 h-6 text-black/50" />
                </div>
            </div>
        );
    };

    // Navigation Component
    const PageNavigation = () => (
        <nav className="bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="text-2xl font-bold text-white">
                        College <span className="text-yellow-400">Connect</span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        {[
                            { id: 'jobs', label: 'Jobs' },
                            { id: 'colleges', label: 'Colleges' },
                            { id: 'courses', label: 'Courses' },
                            { id: 'community', label: 'Community' }
                        ].map((page) => (
                            <button
                                key={page.id}
                                onClick={() => setCurrentPage(page.id)}
                                className={`font-medium transition-all duration-300 ${currentPage === page.id
                                        ? 'text-yellow-400 border-b-2 border-yellow-400'
                                        : 'text-white hover:text-yellow-400'
                                    }`}
                            >
                                {page.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );

    // Jobs Page
    const JobsPage = () => (
        <div className="min-h-screen bg-black">
            <div className="pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Find Your Dream <span className="text-yellow-400">Job</span>
                    </h1>
                    <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full mb-6"></div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Discover amazing career opportunities from top companies worldwide
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {["All Jobs", "Remote", "Full-time", "Contract", "Internship"].map((filter) => (
                            <button
                                key={filter}
                                className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobsData.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );

    // Colleges Page
    const CollegesPage = () => (
        <div className="min-h-screen bg-black">
            <div className="pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Discover Top <span className="text-yellow-400">Colleges</span>
                    </h1>
                    <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full mb-6"></div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Connect with premier educational institutions across India
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {["All Colleges", "Engineering", "Medical", "Arts", "Commerce", "Science"].map((filter) => (
                            <button
                                key={filter}
                                className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {collegesData.map((college) => (
                        <CollegeCard key={college.id} college={college} />
                    ))}
                </div>
            </div>
        </div>
    );

    // Courses Page
    const CoursesPage = () => (
        <div className="min-h-screen bg-black">
            <div className="pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Master New <span className="text-yellow-400">Skills</span>
                    </h1>
                    <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full mb-6"></div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Enhance your expertise with industry-relevant courses and certifications
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {["All Courses", "Programming", "Design", "Marketing", "Data Science", "Business"].map((filter) => (
                            <button
                                key={filter}
                                className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coursesData.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );

    // Community Page
    const CommunityPage = () => (
        <div className="min-h-screen bg-black">
            <div className="pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Join Our <span className="text-yellow-400">Community</span>
                    </h1>
                    <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full mb-6"></div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                        Connect, collaborate, and grow with like-minded students and professionals
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {["All Groups", "Academic", "Professional", "Creative", "Innovation", "Business"].map((filter) => (
                            <button
                                key={filter}
                                className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communityData.map((community) => (
                        <CommunityCard key={community.id} community={community} />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black">
            <PageNavigation />

            {currentPage === 'jobs' && <JobsPage />}
            {currentPage === 'colleges' && <CollegesPage />}
            {currentPage === 'courses' && <CoursesPage />}
            {currentPage === 'community' && <CommunityPage />}

            {/* Footer */}
            <footer className="bg-black border-t border-white/10 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-4">
                                College <span className="text-yellow-400">Connect</span>
                            </h3>
                            <p className="text-white/70">
                                Empowering students to achieve their academic and career goals through meaningful connections.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Services</h4>
                            <ul className="space-y-2 text-white/70">
                                <li><button onClick={() => setCurrentPage('colleges')} className="hover:text-yellow-400 transition-colors">Colleges</button></li>
                                <li><button onClick={() => setCurrentPage('jobs')} className="hover:text-yellow-400 transition-colors">Jobs</button></li>
                                <li><button onClick={() => setCurrentPage('courses')} className="hover:text-yellow-400 transition-colors">Courses</button></li>
                                <li><button onClick={() => setCurrentPage('community')} className="hover:text-yellow-400 transition-colors">Community</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-2 text-white/70">
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Connect</h4>
                            <ul className="space-y-2 text-white/70">
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70">
                        <p>&copy; 2025 College Connect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AllPagesCards;

// Export individual components for integration
// export { JobCard, CollegeCard, CourseCard, CommunityCard };