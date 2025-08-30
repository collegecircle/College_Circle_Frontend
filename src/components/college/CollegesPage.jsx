// // Colleges Page
// import React, { useState } from 'react';
// import {
//     Bookmark, ArrowRight, MapPin, Clock, DollarSign, Star, Users,
//     GraduationCap, BookOpen, Play, Calendar, MessageCircle, Award,
//     Building, Timer, TrendingUp
// } from 'lucide-react';
// import CollegeCard from './CollegeCard';

// // Colleges Data
// const collegesData = [
//     {
//         id: 1,
//         name: "IIT Delhi",
//         location: "New Delhi, India",
//         fees: "₹2.5L/year",
//         ranking: "#2 Engineering",
//         students: "12,000+",
//         logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=50&h=50&fit=crop",
//         bgColor: "bg-blue-100",
//         established: "1961"
//     },
//     {
//         id: 2,
//         name: "IISc Bangalore",
//         location: "Bangalore, India",
//         fees: "₹50K/year",
//         ranking: "#1 Research",
//         students: "3,500+",
//         logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=50&h=50&fit=crop",
//         bgColor: "bg-green-100",
//         established: "1909"
//     },
//     {
//         id: 3,
//         name: "AIIMS Delhi",
//         location: "New Delhi, India",
//         fees: "₹1.08L/year",
//         ranking: "#1 Medical",
//         students: "8,000+",
//         logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=50&h=50&fit=crop",
//         bgColor: "bg-red-100",
//         established: "1956"
//     },
//     {
//         id: 4,
//         name: "ISI Kolkata",
//         location: "Kolkata, India",
//         fees: "₹15K/year",
//         ranking: "#1 Statistics",
//         students: "2,000+",
//         logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=50&h=50&fit=crop",
//         bgColor: "bg-purple-100",
//         established: "1931"
//     },
//     {
//         id: 5,
//         name: "IIT Bombay",
//         location: "Mumbai, India",
//         fees: "₹2.3L/year",
//         ranking: "#3 Engineering",
//         students: "10,000+",
//         logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=50&h=50&fit=crop",
//         bgColor: "bg-orange-100",
//         established: "1958"
//     },
//     {
//         id: 6,
//         name: "BITS Pilani",
//         location: "Pilani, India",
//         fees: "₹4.2L/year",
//         ranking: "#4 Engineering",
//         students: "18,000+",
//         logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=50&h=50&fit=crop",
//         bgColor: "bg-teal-100",
//         established: "1964"
//     }
// ];

// const CollegesPage = () => (

//     <div id="colleges" className="min-h-screen bg-black">
//         <div className="pt-12 pb-8">
//             <div className="max-w-7xl mx-auto px-4 text-center">
//                 <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                     Discover Top <span className="text-yellow-400">Colleges</span>
//                 </h1>
//                 <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full mb-6"></div>
//                 <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
//                     Connect with premier educational institutions across India
//                 </p>

//                 <div className="flex flex-wrap justify-center gap-4 mb-8">
//                     {["All Colleges", "Engineering", "Medical", "Arts", "Commerce", "Science"].map((filter) => (
//                         <button
//                             key={filter}
//                             className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300"
//                         >
//                             {filter}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 pb-16">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {collegesData.map((college) => (
//                     <CollegeCard key={college.id} college={college} />
//                 ))}
//             </div>
//         </div>
//     </div>
// );

// export default CollegesPage;




import React, { useState } from 'react';
import CollegeCard from './CollegeCard';
import PageHeader from '../../gobalComponents/PageHeader';
import FilterButtons from '../../gobalComponents/FilterButtons';
import { collegesData, collegeFilters } from './collegesData';

const CollegesPage = () => {
    const [activeFilter, setActiveFilter] = useState('All Colleges');

    const filteredColleges = activeFilter === 'All Colleges'
        ? collegesData
        : collegesData.filter(college =>
            college.type === activeFilter ||
            college.ranking.toLowerCase().includes(activeFilter.toLowerCase())
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <PageHeader
                title="Discover Top"
                highlightedWord="Colleges"
                highlightColor="blue-400"
                underlineColor="blue-400"
                description="Connect with premier educational institutions across India"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FilterButtons
                    filters={collegeFilters}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    theme="blue"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {filteredColleges.map((college) => (
                        <CollegeCard
                            key={college.id}
                            college={college}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CollegesPage;