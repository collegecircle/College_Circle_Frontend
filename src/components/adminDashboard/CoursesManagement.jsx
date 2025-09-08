import React, { useState } from 'react';
import Modal from './Modal';

const CoursesManagement = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', duration: '', enrolled: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 5;

  const handleAdd = () => {
    setCurrentCourse(null);
    setFormData({ title: '', duration: '', enrolled: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) {
      alert('Please fill all required fields');
      return;
    }
    if (formData.enrolled < 0) {
      alert('Enrolled students cannot be negative');
      return;
    }
    if (currentCourse) {
      setCourses(
        courses.map((course) =>
          course.id === currentCourse.id ? { ...formData, id: course.id } : course
        )
      );
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedCourses = [...courses].sort((a, b) => {
    const valA = a[sortField].toString().toLowerCase();
    const valB = b[sortField].toString().toLowerCase();
    return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const filteredCourses = sortedCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.duration.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="p-2 border rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
          Add Course
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 cursor-pointer" onClick={() => handleSort('title')}>
              Title {sortField === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('duration')}>
              Duration {sortField === 'duration' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="p-2 cursor-pointer" onClick={() => handleSort('enrolled')}>
              Enrolled {sortField === 'enrolled' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCourses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="p-2">{course.title}</td>
              <td className="p-2">{course.duration}</td>
              <td className="p-2">{course.enrolled}</td>
              <td className="p-2">
                <button
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white p-1 rounded"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-500 text-white p-2 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="bg-gray-500 text-white p-2 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl mb-4">{currentCourse ? 'Edit Course' : 'Add Course'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Course Title"
            className="p-2 border rounded w-full mb-2"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Duration (e.g., 6 months)"
            className="p-2 border rounded w-full mb-2"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Enrolled Students"
            className="p-2 border rounded w-full mb-2"
            value={formData.enrolled}
            onChange={(e) => setFormData({ ...formData, enrolled: parseInt(e.target.value) })}
            required
            min="0"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            {currentCourse ? 'Update' : 'Create'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CoursesManagement;