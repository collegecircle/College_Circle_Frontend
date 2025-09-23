// New InquiryModal.jsx
import React, { useState } from 'react';
import { X, Send, User, Mail, Phone, MessageSquare, GraduationCap } from 'lucide-react';

const InquiryModal = ({ college, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        message: '',
        collegeName: college?.name || '',
        collegeId: college?.id || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Google Sheets integration
            const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

            const formDataToSend = new FormData();
            formDataToSend.append('entry.YOUR_NAME_FIELD_ID', formData.fullName);
            formDataToSend.append('entry.YOUR_EMAIL_FIELD_ID', formData.email);
            formDataToSend.append('entry.YOUR_PHONE_FIELD_ID', formData.phone);
            formDataToSend.append('entry.YOUR_COURSE_FIELD_ID', formData.course);
            formDataToSend.append('entry.YOUR_MESSAGE_FIELD_ID', formData.message);
            formDataToSend.append('entry.YOUR_COLLEGE_FIELD_ID', formData.collegeName);
            formDataToSend.append('entry.YOUR_COLLEGE_ID_FIELD_ID', formData.collegeId);

            // Alternative: Use a serverless function or direct API call
            const response = await fetch('/api/college-inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    timestamp: new Date().toISOString(),
                    source: 'College Circle Website'
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAvailableCourses = () => {
        if (!college?.streams) return [];
        const courses = [];
        college.streams.forEach(stream => {
            if (stream.subStreams) {
                stream.subStreams.forEach(subStream => {
                    if (subStream.courses) {
                        subStream.courses.forEach(course => {
                            courses.push(`${course} in ${subStream.name}`);
                        });
                    }
                });
            }
        });
        return courses;
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-black via-black to-black rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-yellow-400/30">
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-yellow-400/30 flex items-center justify-center ">
                                {college?.gallery?.logoUrl ? (
                                    <img
                                        src={college.gallery.logoUrl}
                                        alt={college?.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null; // prevent infinite loop
                                            e.target.src = "/assets/cclogo.PNG"; // safe fallback
                                        }}
                                    />
                                ) : (
                                    <GraduationCap className="w-6 h-6 text-yellow-400" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{college?.name}</h2>
                                <p className="text-gray-400">{college?.university}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* College Info */}
                {/* <div className="p-6 border-b border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <p className="text-yellow-400 font-semibold">{college?.establishedYear}</p>
                            <p className="text-gray-400 text-sm">Established</p>
                        </div>
                        <div className="text-center">
                            <p className="text-yellow-400 font-semibold">{college?.type}</p>
                            <p className="text-gray-400 text-sm">Type</p>
                        </div>
                        <div className="text-center">
                            <p className="text-yellow-400 font-semibold">{college?.streams?.length || 0}</p>
                            <p className="text-gray-400 text-sm">Streams</p>
                        </div>
                        <div className="text-center">
                            <p className="text-yellow-400 font-semibold">{college?.facilities?.length || 0}</p>
                            <p className="text-gray-400 text-sm">Facilities</p>
                        </div>
                    </div>

                    {college?.description && (
                        <div className="mt-4">
                            <p className="text-gray-300 text-sm">{college.description}</p>
                        </div>
                    )}
                </div> */}

                {/* Inquiry Form */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        {/* <MessageSquare className="w-5 h-5 mr-2 text-yellow-400" /> */}
                        Get More Information
                    </h3>

                    {submitStatus === 'success' && (
                        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                            <p className="text-green-400">Thank you! Your inquiry has been submitted successfully.</p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-400">Sorry, there was an error submitting your inquiry. Please try again.</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    {/* <User className="w-4 h-4 inline mr-2" /> */}
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    {/* <Mail className="w-4 h-4 inline mr-2" /> */}
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    {/* <Phone className="w-4 h-4 inline mr-2" /> */}
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-2">
                                    {/* <GraduationCap className="w-4 h-4 inline mr-2" /> */}
                                    Interested Course
                                </label>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none bg-grey-900"
                                >
                                    <option value="" className="bg-gray-800 text-gray-400">Select a course</option>
                                    {getAvailableCourses().map((course, index) => (
                                        <option className="bg-gray-800 text-gray-400" key={index} value={course}>{course}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm mb-2">
                                {/* <MessageSquare className="w-4 h-4 inline mr-2" /> */}
                                Message (Optional)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full  border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none"
                                placeholder="Any specific questions or requirements?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    {/* <Send className="w-5 h-5" /> */}
                                    <span>Send Inquiry</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InquiryModal;

// Updated CollegesManagement.jsx (