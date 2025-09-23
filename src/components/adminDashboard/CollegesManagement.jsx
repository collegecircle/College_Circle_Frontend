import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchColleges,
  createCollege,
  updateCollege,
  deleteCollege,
} from "../college/collegeSlice";
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

const CollegesManagement = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.colleges);

  // Safely extract actual array of colleges and pagination info
  const colleges = Array.isArray(list?.data?.colleges)
    ? list.data.colleges
    : [];
  const totalCount = list?.data?.count || 0;
  const totalPages = Math.ceil(totalCount / 10);
  const itemsPerPage = 12;
  console.log("Full Redux State:", list);
  console.log("Colleges:", colleges);
  console.log("Total Count:", totalCount);
  console.log("Total Pages:", totalPages);

  const [search, setSearch] = useState("");
  const [currentCollege, setCurrentCollege] = useState(null);
  const [formError, setFormError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // 'add', 'edit', 'view'
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    university: "",
    address: { line1: "", line2: "", city: "", state: "", pincode: "" },
    contact: { email: "", phone: "", website: "" },
    accreditation: "",
    establishedYear: "",
    type: "Public",
    description: "",
    facilities: "",
    gallery: { logoUrl: "", slideImages: [] },
    streams: [],
  });

  // States for dynamic fields
  const [slideImages, setSlideImages] = useState([""]);
  const [streams, setStreams] = useState([]);
  const [newStream, setNewStream] = useState({ name: "", subStreams: [] });
  const [newSubStream, setNewSubStream] = useState({ name: "", courses: [] });

  // Fetch colleges with pagination
  const fetchCollegesWithPagination = (page = 1, searchTerm = "") => {
    const params = { page, limit: itemsPerPage };
    if (searchTerm.trim()) {
      params.search = searchTerm;
    }
    console.log("Fetching with params:", params);
    dispatch(fetchColleges(params));
  };

  useEffect(() => {
    fetchCollegesWithPagination(currentPage, search);
  }, [dispatch, currentPage]);

  // Debounced search effect
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setCurrentPage(1);
      fetchCollegesWithPagination(1, search);
    }, 500);
    return () => clearTimeout(delayedSearch);
  }, [search]);

  const resetForm = () => {
    setFormData({
      name: "",
      university: "",
      address: { line1: "", line2: "", city: "", state: "", pincode: "" },
      contact: { email: "", phone: "", website: "" },
      accreditation: "",
      establishedYear: "",
      type: "Public",
      description: "",
      facilities: "",
      gallery: { logoUrl: "", slideImages: [] },
      streams: [],
    });
    setSlideImages([""]);
    setStreams([]);
    setNewStream({ name: "", subStreams: [] });
    setNewSubStream({ name: "", courses: [] });
    setFormError("");
  };

  const handleAdd = () => {
    setModalType("add");
    setCurrentCollege(null);
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (college) => {
    setModalType("edit");
    setCurrentCollege(college);
    const processedStreams = college.streams
      ? college.streams.map((stream) => ({
          name: stream.name || "",
          subStreams: Array.isArray(stream.subStreams)
            ? stream.subStreams.map((subStream) => ({
                name: subStream.name || "",
                courses: Array.isArray(subStream.courses)
                  ? [...subStream.courses]
                  : [],
              }))
            : [],
        }))
      : [];
    setFormData({
      ...college,
      facilities: Array.isArray(college.facilities)
        ? college.facilities.join(", ")
        : college.facilities || "",
      gallery: {
        logoUrl: college.gallery?.logoUrl || "",
        slideImages: college.gallery?.slideImages || [],
      },
    });
    setSlideImages(
      college.gallery?.slideImages?.length > 0
        ? [...college.gallery.slideImages]
        : [""]
    );
    setStreams(processedStreams);
    console.log("Edit - Processed streams:", processedStreams);
    setShowModal(true);
  };

  const handleView = (college) => {
    setModalType("view");
    setCurrentCollege(college);
    const processedStreams = college.streams
      ? college.streams.map((stream) => ({
          name: stream.name || "",
          subStreams: Array.isArray(stream.subStreams)
            ? stream.subStreams.map((subStream) => ({
                name: subStream.name || "",
                courses: Array.isArray(subStream.courses)
                  ? [...subStream.courses]
                  : [],
              }))
            : [],
        }))
      : [];
    setFormData({
      ...college,
      facilities: Array.isArray(college.facilities)
        ? college.facilities.join(", ")
        : college.facilities || "",
    });
    setSlideImages(college.gallery?.slideImages || [""]);
    setStreams(processedStreams);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      dispatch(deleteCollege(id)).then((result) => {
        if (result.type.endsWith("/fulfilled")) {
          fetchCollegesWithPagination(currentPage, search);
        }
      });
    }
  };

  // Handle slide images
  const addSlideImage = () => {
    setSlideImages([...slideImages, ""]);
  };

  const removeSlideImage = (index) => {
    const filtered = slideImages.filter((_, i) => i !== index);
    setSlideImages(filtered.length === 0 ? [""] : filtered);
  };

  const updateSlideImage = (index, value) => {
    const updated = [...slideImages];
    updated[index] = value;
    setSlideImages(updated);
  };

  // Handle streams
  const addStream = () => {
    if (newStream.name.trim()) {
      const streamToAdd = { name: newStream.name.trim(), subStreams: [] };
      setStreams((prevStreams) => [...prevStreams, streamToAdd]);
      setNewStream({ name: "", subStreams: [] });
      console.log("Added stream:", streamToAdd);
    }
  };

  const removeStream = (index) => {
    setStreams((prevStreams) => prevStreams.filter((_, i) => i !== index));
  };

  const addSubStream = (streamIndex) => {
    if (newSubStream.name.trim()) {
      setStreams((prevStreams) => {
        const updatedStreams = [...prevStreams];
        if (!updatedStreams[streamIndex]) return prevStreams;
        if (!Array.isArray(updatedStreams[streamIndex].subStreams)) {
          updatedStreams[streamIndex].subStreams = [];
        }
        const subStreamToAdd = {
          name: newSubStream.name.trim(),
          courses: Array.isArray(newSubStream.courses)
            ? [...newSubStream.courses]
            : [],
        };
        updatedStreams[streamIndex].subStreams.push(subStreamToAdd);
        console.log(
          "Added subStream to stream",
          streamIndex,
          ":",
          subStreamToAdd
        );
        return updatedStreams;
      });
      setNewSubStream({ name: "", courses: [] });
    }
  };

  const removeSubStream = (streamIndex, subStreamIndex) => {
    setStreams((prevStreams) => {
      const updatedStreams = [...prevStreams];
      if (
        updatedStreams[streamIndex] &&
        updatedStreams[streamIndex].subStreams
      ) {
        updatedStreams[streamIndex].subStreams = updatedStreams[
          streamIndex
        ].subStreams.filter((_, i) => i !== subStreamIndex);
      }
      return updatedStreams;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.university) {
      setFormError("Please fill in required fields (Name, University)");
      return;
    }
    const processedStreams = streams.map((stream) => ({
      name: stream.name || "",
      subStreams: Array.isArray(stream.subStreams)
        ? stream.subStreams.map((subStream) => ({
            name: subStream.name || "",
            courses: Array.isArray(subStream.courses) ? subStream.courses : [],
          }))
        : [],
    }));
    const payload = {
      ...formData,
      establishedYear:
        parseInt(formData.establishedYear) || new Date().getFullYear(),
      facilities: formData.facilities
        ? formData.facilities
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      gallery: {
        logoUrl: formData.gallery.logoUrl || "",
        slideImages: slideImages.filter((img) => img && img.trim() !== ""),
      },
      streams: processedStreams,
    };
    console.log(
      "Final payload streams:",
      JSON.stringify(processedStreams, null, 2)
    );
    const action = currentCollege
      ? updateCollege({ id: currentCollege.id, collegeData: payload })
      : createCollege(payload);
    dispatch(action).then((result) => {
      if (result.type.endsWith("/fulfilled")) {
        setShowModal(false);
        resetForm();
        fetchCollegesWithPagination(currentPage, search);
      }
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "N/A";
    const parts = [];
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    return parts.join(", ") || "N/A";
  };

  return (
    <div className="w-full p-3 sm:p-4 lg:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Colleges Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage college information and details
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add College</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-4 sm:mb-6">
        <div className="relative max-w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search colleges..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Status Messages */}
      {status === "loading" && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-4 sm:mb-6">
          Loading colleges...
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-4 sm:mb-6">
          Error: {error}
        </div>
      )}

      {/* Colleges Table - Mobile Cards / Desktop Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Mobile View - Cards */}
        <div className="block lg:hidden">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={college.gallery?.logoUrl || "/assets/cclogo.PNG"}
                    alt={college.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/assets/cclogo.PNG")}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {college.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {college.university}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatAddress(college.address)}
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        college.type === "Private"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {college.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      Est. {college.establishedYear}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={() => handleView(college)}
                  className="flex-1 text-blue-600 hover:text-blue-900 text-center py-2 border border-blue-200 rounded-lg"
                  title="View Details"
                >
                  <Eye className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => handleEdit(college)}
                  className="flex-1 text-green-600 hover:text-green-900 text-center py-2 border border-green-200 rounded-lg"
                  title="Edit College"
                >
                  <Edit className="w-4 h-4 mx-auto" />
                </button>
                <button
                  onClick={() => handleDelete(college.id)}
                  className="flex-1 text-red-600 hover:text-red-900 text-center py-2 border border-red-200 rounded-lg"
                  title="Delete College"
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
                  College
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Established
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {colleges.map((college) => (
                <tr key={college.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={college.gallery?.logoUrl || "/assets/cclogo.PNG"}
                          alt={college.name}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = "/assets/cclogo.PNG")}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {college.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {college.accreditation || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.university}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatAddress(college.address)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        college.type === "Private"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {college.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {college.establishedYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(college)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(college)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit College"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(college.id)}
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

        {/* Empty State */}
        {colleges.length === 0 && status !== "loading" && (
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No colleges found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new college.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}{" "}
              results
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 border-b flex-shrink-0">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {modalType === "add"
                    ? "Add New College"
                    : modalType === "edit"
                    ? "Edit College"
                    : "College Details"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm">
                  {formError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        College Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        University *
                      </label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            university: e.target.value,
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                    Address
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        value={formData.address.line1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              line1: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={formData.address.line2}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              line2: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              city: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              state: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={formData.address.pincode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              pincode: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.contact.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: {
                              ...formData.contact,
                              email: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.contact.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: {
                              ...formData.contact,
                              phone: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.contact.website}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: {
                              ...formData.contact,
                              website: e.target.value,
                            },
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                    College Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Established Year
                      </label>
                      <input
                        type="number"
                        value={formData.establishedYear}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            establishedYear: e.target.value,
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accreditation
                      </label>
                      <input
                        type="text"
                        value={formData.accreditation}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            accreditation: e.target.value,
                          })
                        }
                        disabled={modalType === "view"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                    Gallery
                  </h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={formData.gallery.logoUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gallery: {
                            ...formData.gallery,
                            logoUrl: e.target.value,
                          },
                        })
                      }
                      disabled={modalType === "view"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Slide Images
                    </label>
                    {slideImages.map((image, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <input
                          type="url"
                          value={image}
                          onChange={(e) =>
                            updateSlideImage(index, e.target.value)
                          }
                          disabled={modalType === "view"}
                          placeholder={`Slide image URL ${index + 1}`}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                        {modalType !== "view" && slideImages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSlideImage(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {modalType !== "view" && (
                      <button
                        type="button"
                        onClick={addSlideImage}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        + Add Another Image
                      </button>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-gray-900 border-b pb-2">
                    Academic Streams
                  </h4>
                  {streams.map((stream, streamIndex) => (
                    <div
                      key={streamIndex}
                      className="border border-gray-200 rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-gray-900">
                          {stream.name}
                        </h5>
                        {modalType !== "view" && (
                          <button
                            type="button"
                            onClick={() => removeStream(streamIndex)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      {stream.subStreams &&
                        Array.isArray(stream.subStreams) &&
                        stream.subStreams.length > 0 && (
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium text-gray-700">
                              Sub-streams:
                            </h6>
                            {stream.subStreams.map(
                              (subStream, subStreamIndex) => (
                                <div
                                  key={subStreamIndex}
                                  className="bg-gray-50 p-3 rounded-lg"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-sm text-gray-700">
                                      {subStream.name}
                                    </span>
                                    {modalType !== "view" && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeSubStream(
                                            streamIndex,
                                            subStreamIndex
                                          )
                                        }
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    Courses:{" "}
                                    {subStream.courses &&
                                    Array.isArray(subStream.courses) &&
                                    subStream.courses.length > 0
                                      ? subStream.courses.join(", ")
                                      : "No courses added"}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      {modalType !== "view" && (
                        <div className="space-y-2 border-t border-gray-200 pt-3">
                          <h6 className="text-sm font-medium text-gray-700">
                            Add Sub-stream to "{stream.name}":
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="Sub-stream name (e.g., Computer Science)"
                              value={newSubStream.name}
                              onChange={(e) =>
                                setNewSubStream({
                                  ...newSubStream,
                                  name: e.target.value,
                                })
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Courses (comma separated)"
                              value={
                                Array.isArray(newSubStream.courses)
                                  ? newSubStream.courses.join(", ")
                                  : ""
                              }
                              onChange={(e) =>
                                setNewSubStream({
                                  ...newSubStream,
                                  courses: e.target.value
                                    .split(",")
                                    .map((c) => c.trim())
                                    .filter(Boolean),
                                })
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => addSubStream(streamIndex)}
                            disabled={!newSubStream.name.trim()}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            + Add Sub-stream
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {modalType !== "view" && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
                      <h6 className="text-sm font-medium text-gray-700">
                        Add New Stream:
                      </h6>
                      <input
                        type="text"
                        placeholder="Stream name (e.g., Engineering, Management)"
                        value={newStream.name}
                        onChange={(e) =>
                          setNewStream({ ...newStream, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={addStream}
                        disabled={!newStream.name.trim()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add Stream
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facilities (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.facilities}
                    onChange={(e) =>
                      setFormData({ ...formData, facilities: e.target.value })
                    }
                    disabled={modalType === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    placeholder="e.g., Hostel, Library, Sports Complex, Auditorium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    disabled={modalType === "view"}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
                {modalType !== "view" && (
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading"
                        ? "Processing..."
                        : currentCollege
                        ? "Update College"
                        : "Create College"}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegesManagement;
