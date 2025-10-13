import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseMaterials,
  deleteCourseMaterial,
} from "../course/courseSlice";
import CourseMaterialForm from "./coursesComponents/CourseMaterialForm";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Building,
  MapPin,
  Calendar,
  Eye,
  Globe,
  Users,
  X,
} from "lucide-react";
import EditCourseMaterialForm from "./coursesComponents/EditCourseMaterialForm";

const CoursesManagement = () => {
  const [courseAddModalOpen, setCourseAddModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { list, status, error, pagination } = useSelector(
    (state) => state.materials
  );

  const itemsPerPage = pagination?.limit || 5;
  const totalCount = pagination?.count || 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCourseMaterialsWithPagination = (page = 1, searchTerm = "") => {
    const params = { page, limit: itemsPerPage };
    if (searchTerm.trim()) {
      params.search = searchTerm;
    }
    dispatch(fetchCourseMaterials(params));
  };

  useEffect(() => {
    fetchCourseMaterialsWithPagination(currentPage);
  }, [dispatch, currentPage]);

  const handleAddCourse = () => setCourseAddModalOpen(true);
  const handleCloseCourse = () => setCourseAddModalOpen(false);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      dispatch(deleteCourseMaterial(id)).then((result) => {
        if (result.type.endsWith("/fulfilled")) {
          fetchCourseMaterialsWithPagination(currentPage);
        }
      });
    }
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);

  const handleEdit = (material) => {
    setCurrentMaterial(material); // set the material to edit
    setEditModalOpen(true); // open the edit modal
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
    setCurrentMaterial(null);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Manage Study Materials
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Handle study materials effortlessly
            </p>
          </div>
          <button
            onClick={handleAddCourse}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {/* Status Messages */}
      {status === "loading" && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-4 sm:mb-6">
          Loading...
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 sm:mb-6">
          Error: {error}
        </div>
      )}

      {/* Empty State */}
      {list.length === 0 && status !== "loading" && (
        <div className="text-center py-12">
          <Building className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No materials found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new materials.
          </p>
        </div>
      )}

      {list.length > 0 && status !== "loading" && (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Mobile View - Cards */}
          <div className="block lg:hidden">
            {list.map((material) => (
              <div
                key={material.id}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={material?.thumbnileImgUrl || "/assets/cclogo.PNG"}
                      alt={material.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/assets/cclogo.PNG")}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      title :{" "}
                      {material.title && material.title.length > 30
                        ? material.title.substring(0, 30) + "..."
                        : material.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      No Of modules : {material.modules.length || 0}
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      ID : {material.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      Price : {material.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      Registered Count : {material.registeredCount}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleEdit(material)}
                    className="flex-1 text-green-600 hover:text-green-900 text-center py-2 border border-green-200 rounded-lg"
                    title="Edit material"
                  >
                    <Edit className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(material.id)}
                    className="flex-1 text-red-600 hover:text-red-900 text-center py-2 border border-red-200 rounded-lg"
                    title="Delete material"
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    thumbnile image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No of Modules
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registerd count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {list.map((material) => (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={
                              material?.thumbnileImgUrl || "/assets/cclogo.PNG"
                            }
                            alt={material.title}
                            className="w-full h-full object-cover"
                            onError={(e) =>
                              (e.target.src = "/assets/cclogo.PNG")
                            }
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.title && material.title.length > 20
                        ? material.title.substring(0, 20) + "..."
                        : material.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.modules.length || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.registeredCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(material)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit material"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(material.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete College"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-sm text-gray-700 text-center sm:text-left">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
                {totalCount} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {courseAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={handleCloseCourse}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <CourseMaterialForm />
          </div>
        </div>
      )}

      {/* edit course */}

      {editModalOpen && currentMaterial && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={handleCloseEdit}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <EditCourseMaterialForm
              material={currentMaterial}
              onClose={handleCloseEdit}
              onUpdate={() => fetchCourseMaterialsWithPagination(currentPage)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesManagement;
