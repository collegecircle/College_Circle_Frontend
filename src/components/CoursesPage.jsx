// components/CoursesPage.js
import React from 'react';
import CourseCard from './CourseCard';

const CoursesPage = () => {
  const courses = [
    { title: 'Introduction to Computer Science', credits: 4, level: 'Beginner', instructor: 'Dr. Smith', duration: '16 weeks' },
    { title: 'Advanced Mathematics', credits: 3, level: 'Advanced', instructor: 'Prof. Johnson', duration: '12 weeks' },
    { title: 'Business Communication', credits: 2, level: 'Intermediate', instructor: 'Ms. Brown', duration: '8 weeks' },
    { title: 'Data Structures & Algorithms', credits: 4, level: 'Intermediate', instructor: 'Dr. Davis', duration: '16 weeks' },
    { title: 'Web Development', credits: 3, level: 'Beginner', instructor: 'Mr. Wilson', duration: '12 weeks' },
    { title: 'Machine Learning', credits: 4, level: 'Advanced', instructor: 'Dr. Chen', duration: '16 weeks' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
        <div className="text-sm text-gray-600">{courses.length} courses available</div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;