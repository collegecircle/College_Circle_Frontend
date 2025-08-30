// import React from 'react';
// import { Bookmark, ArrowRight, Clock, Users, Star, BookOpen } from 'lucide-react';

// const CourseCard = ({ course, savedItems, toggleSaveItem }) => {
//   const isSaved = savedItems.has(`course-${course.id}`);

//   return (
//     <div className={`${course.bgColor} rounded-2xl p-6 relative group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer border border-gray-700 hover:border-yellow-400`}>
//       {/* Save Button */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleSaveItem(`course-${course.id}`);
//         }}
//         className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700 transition-all duration-300"
//       >
//         <Bookmark className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-400'
//           }`} />
//       </button>

//       {/* Level Badge */}
//       <div className="absolute top-4 left-4">
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.level === 'Beginner' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
//             course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
//               'bg-red-500/20 text-red-400 border border-red-500/30'
//           }`}>
//           {course.level}
//         </span>
//       </div>

//       {/* Main Content */}
//       <div className="mt-12 mb-6">
//         <div className="flex items-start space-x-4">
//           <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border-2 border-yellow-400/30">
//             <img
//               src={course.logo}
//               alt={course.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-yellow-400 transition-colors duration-300">
//               {course.title}
//             </h3>
//             <p className="text-gray-400 text-sm mb-3">by {course.instructor}</p>

//             {/* Price Section */}
//             <div className="flex items-center space-x-3 mb-4">
//               <span className="text-2xl font-bold text-yellow-400">{course.price}</span>
//               <span className="text-sm text-gray-500 line-through">{course.originalPrice}</span>
//               <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-md text-xs font-semibold">
//                 {Math.round((1 - parseInt(course.price.replace(/[^\d]/g, '')) / parseInt(course.originalPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
//         <div className="bg-gray-800/50 rounded-lg p-3 text-center">
//           <Clock className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
//           <p className="text-xs text-gray-400">Duration</p>
//           <p className="font-semibold text-white text-sm">{course.duration}</p>
//         </div>
//         <div className="bg-gray-800/50 rounded-lg p-3 text-center">
//           <Users className="w-4 h-4 mx-auto text-green-400 mb-1" />
//           <p className="text-xs text-gray-400">Students</p>
//           <p className="font-semibold text-white text-sm">{course.students}</p>
//         </div>
//         <div className="bg-gray-800/50 rounded-lg p-3 text-center">
//           <Star className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
//           <p className="text-xs text-gray-400">Rating</p>
//           <p className="font-semibold text-white text-sm">{course.rating}</p>
//         </div>
//         <div className="bg-gray-800/50 rounded-lg p-3 text-center">
//           <BookOpen className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
//           <p className="text-xs text-gray-400">Modules</p>
//           <p className="font-semibold text-white text-sm">{course.modules}</p>
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <span className="text-xs text-gray-400">Completion Rate</span>
//           <span className="text-xs text-yellow-400 font-semibold">{course.completion}</span>
//         </div>
//         <div className="w-full bg-gray-700 rounded-full h-2">
//           <div
//             className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
//             style={{ width: course.completion }}
//           ></div>
//         </div>
//       </div>

//       {/* Action Button */}
//       <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black py-3 rounded-xl font-bold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-yellow-400/25">
//         <span>Enroll Now</span>
//         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//       </button>

//       {/* Hover Effect Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-orange-400/0 group-hover:from-yellow-400/5 group-hover:to-orange-400/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>
//     </div>
//   );
// };

// export default CourseCard;

// const CourseCard = ({ course }) => {
//   const isSaved = savedItems.has(`course-${course.id}`);

//   return (
//     <div className={`${course.bgColor} rounded-2xl p-6 relative group hover:shadow-xl transition-all duration-500 transform hover:scale-105 cursor-pointer overflow-hidden`}>
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           toggleSaveItem(`course-${course.id}`);
//         }}
//         className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-300"
//       >
//         <Bookmark
//           className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600 hover:text-yellow-500'
//             }`}
//         />
//       </button>

//       <div className="mb-6">
//         <div className="flex items-center space-x-2">
//           <span className="text-lg font-bold text-black">{course.price}</span>
//           <span className="text-sm text-black/50 line-through">{course.originalPrice}</span>
//         </div>
//       </div>

//       <h3 className="text-2xl font-bold text-black mb-8 leading-tight">
//         {course.title}
//       </h3>

//       <div className="flex items-center justify-center mb-8">
//         <div className="flex space-x-1">
//           <div className="w-2 h-2 bg-black/30 rounded-full"></div>
//           <div className="w-2 h-2 bg-black/20 rounded-full"></div>
//           <div className="w-2 h-2 bg-black/10 rounded-full"></div>
//           <div className="w-2 h-2 bg-black/10 rounded-full"></div>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
//             <img
//               src={course.logo}
//               alt={course.instructor}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <p className="font-semibold text-black text-sm">{course.title}</p>
//             <p className="text-black/70 text-xs">by {course.instructor}</p>
//           </div>
//         </div>

//         <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-yellow-500 hover:text-black transition-all duration-300">
//           View
//         </button>
//       </div>

//       <div className="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
//         <ArrowRight className="w-6 h-6 text-black/50" />
//       </div>
//     </div>
//   );
// };

// export default CourseCard;



import { ArrowRight, Download, Users, FileText, Tag } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-slate-1000 rounded-2xl p-6 relative group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer border border-gray-700 hover:border-yellow-400 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-500/5 opacity-0  transition-all duration-500"></div>

      {/* Category Badge */}
      {/* <div className="absolute top--10 left--3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          {course.category}
        </span>
      </div> */}

      {/* Course Header */}
      <div className="mt-12 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border-2 border-yellow-400/30 bg-black-800">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-yellow-400 transition-colors duration-300">
              {course.name}
            </h3>
            <div className="flex items-center space-x-1 mb-3">
              <span className="text-gray-400 text-sm">{course.provider}</span>
            </div>

            {/* Price Section */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-yellow-400">{course.price}</span>
              {course.price !== "Free" && (
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-semibold">
                  Paid
                </span>
              )}
              {course.price === "Free" && (
                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-md text-xs font-semibold">
                  Free
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          {/* <Users className="w-4 h-4 mx-auto text-green-400 mb-1" /> */}
          <p className="text-xs text-gray-400">Downloads</p>
          <p className="font-semibold text-white text-sm">{course.downloads}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          {/* <FileText className="w-4 h-4 mx-auto text-yellow-400 mb-1" /> */}
          <p className="text-xs text-gray-400">File Type</p>
          <p className="font-semibold text-white text-sm">{course.fileType}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          {/* <Tag className="w-4 h-4 mx-auto text-yellow-400 mb-1" /> */}
          <p className="text-xs text-gray-400">Skill Level</p>
          <p className="font-semibold text-white text-sm">{course.skillLevel}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          {/* <Download className="w-4 h-4 mx-auto text-red-400 mb-1" /> */}
          <p className="text-xs text-gray-400">File Size</p>
          <p className="font-semibold text-white text-sm">{course.fileSize}</p>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-yellow-400/25">
        <span>Download Now</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-yellow-500/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default CourseCard;