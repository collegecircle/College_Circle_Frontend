// // components/CoursesPage.js
// import React from 'react';
// import CourseCard from './CourseCard';

// const CoursesPage = () => {
//   const courses = [
//     { title: 'Introduction to Computer Science', credits: 4, level: 'Beginner', instructor: 'Dr. Smith', duration: '16 weeks' },
//     { title: 'Advanced Mathematics', credits: 3, level: 'Advanced', instructor: 'Prof. Johnson', duration: '12 weeks' },
//     { title: 'Business Communication', credits: 2, level: 'Intermediate', instructor: 'Ms. Brown', duration: '8 weeks' },
//     { title: 'Data Structures & Algorithms', credits: 4, level: 'Intermediate', instructor: 'Dr. Davis', duration: '16 weeks' },
//     { title: 'Web Development', credits: 3, level: 'Beginner', instructor: 'Mr. Wilson', duration: '12 weeks' },
//     { title: 'Machine Learning', credits: 4, level: 'Advanced', instructor: 'Dr. Chen', duration: '16 weeks' }
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
//         <div className="text-sm text-gray-600">{courses.length} courses available</div>
//       </div>
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {courses.map((course, index) => (
//           <CourseCard key={index} {...course} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;



// import React, { useState } from 'react';
// import CourseCard from './CourseCard';
// import PageHeader from '../../gobalComponents/PageHeader';
// import FilterButtons from '../../gobalComponents/FilterButtons';
// import { coursesData, courseFilters } from './courseData';

// const CoursesPage = () => {
//   const [activeFilter, setActiveFilter] = useState('All Courses');

//   const filteredCourses = activeFilter === 'All Courses'
//     ? coursesData
//     : coursesData.filter(course => course.category === activeFilter);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-black to-black">
//       <PageHeader
//         title="Master New"
//         highlightedWord="Skills"
//         highlightColor="yellow-400"
//         underlineColor="yellow-400"
//         description="Enhance your expertise with industry-relevant courses and certifications"
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <FilterButtons
//           filters={courseFilters}
//           activeFilter={activeFilter}
//           onFilterChange={setActiveFilter}
//           theme="yellow"
//         />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//           {filteredCourses.map((course) => (
//             <CourseCard
//               key={course.id}
//               course={course}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;




import React from "react";
import PageHeader from "../../gobalComponents/PageHeader";
import { Clock } from "lucide-react";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex flex-col">
      {/* <PageHeader
        title="Master New"
        highlightedWord="Skills"
        highlightColor="yellow-400"
        underlineColor="yellow-400"
        description="Enhance your expertise with industry-relevant courses and certifications"
      /> */}

      <div className="flex-1 flex items-center justify-center ">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-900  flex items-center justify-center border border-yellow-400/40 overflow-hidden">
            <img
              src="/assets/cclogo.PNG" // 🔹 change this path to your image
              alt="Coming Soon"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Courses Coming Soon!
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            We’re working hard to bring you a wide range of industry-leading
            courses. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
