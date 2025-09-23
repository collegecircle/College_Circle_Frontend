import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        type: 'none',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form submitted:', formData);
        // Handle form submission logic here
        alert('Form submitted successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Side */}
                        <div className="lg:w-1/2 bg-gradient-to-br from-black via-black to-black text-white p-8 lg:p-12 flex flex-col justify-center">
                            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                                Let's <span className='text-yellow-400'>Collaborate!</span>
                            </h3>
                            <p className="text-xl text-gray-300 mb-8">
                                Time to Start the Conversation.
                            </p>

                            {/* Diamond Shape */}
                            {/* <div className="diamond-container flex justify-center lg:justify-start">
                                <div className="diamond"></div>
                            </div> */}
                        </div>

                        {/* Right Side - Form */}
                        <div className="lg:w-1/2 p-8 lg:p-12">
                            <div className="space-y-6">
                                {/* Name Input */}
                                <div className="form-input-container">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="form-control w-full px-0 py-3 text-gray-800 text-lg font-medium bg-transparent border-0 border-b border-gray-300 rounded-none focus:outline-none focus:border-gray-600 transition-all duration-300 placeholder-gray-500"
                                        placeholder="NAME"
                                        required
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="form-input-container">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="form-control w-full px-0 py-3 text-gray-800 text-lg font-medium bg-transparent border-0 border-b border-gray-300 rounded-none focus:outline-none focus:border-gray-600 transition-all duration-300 placeholder-gray-500"
                                        placeholder="PHONE"
                                        required
                                    />
                                </div>

                                {/* City Input */}
                                <div className="form-input-container">
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="form-control w-full px-0 py-3 text-gray-800 text-lg font-medium bg-transparent border-0 border-b border-gray-300 rounded-none focus:outline-none focus:border-gray-600 transition-all duration-300 placeholder-gray-500"
                                        placeholder="CITY"
                                        required
                                    />
                                </div>

                                {/* Select Dropdown */}
                                <div className="form-input-container">
                                    <div className="select-container relative">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className="form-control w-full px-0 py-3 text-gray-800 text-lg font-medium bg-transparent border-0 border-b border-gray-300 rounded-none focus:outline-none focus:border-gray-600 transition-all duration-300 appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="none" disabled className="text-gray-500">
                                                The Reason I'd like to connect :
                                            </option>
                                            <option value="As Collage">As Collage</option>
                                            <option value="As Brand">As Brand</option>
                                            <option value="As Company">As Company</option>
                                            <option value="As recruiter">As recruiter</option>
                                            <option value="Other ">Other</option>
                                        </select>
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Textarea */}
                                <div className="form-input-container">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="5"
                                        className="form-control w-full px-0 py-3 text-gray-800 text-lg font-medium bg-transparent border-0 border-b border-gray-300 rounded-none focus:outline-none focus:border-gray-600 transition-all duration-300 resize-none placeholder-gray-500"
                                        placeholder="BRIEF ABOUT YOUR REQUIREMENT"
                                        maxLength="500"
                                        required
                                    />
                                    <div className="text-sm text-gray-400 mt-1">
                                        {formData.message.length}/500 characters
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="w-full bg-yellow-500 text-white py-4 px-8 rounded-none text-lg font-bold tracking-wide hover:bg-black transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 mt-8"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for Diamond Shape */}
            <style jsx>{`
        .diamond {
          --size: 50px;
          --quarter-size: calc(var(--size) / 4);
          border-style: solid;
          border-color: transparent transparent #fff transparent;
          border-width: 0 var(--quarter-size) var(--quarter-size) var(--quarter-size);
          height: 0;
          width: calc(var(--size) / 2);
          box-sizing: content-box;
          position: relative;
          margin: 0 0 calc(var(--size) / 2) 0;
        }

        .diamond:after {
          content: "";
          position: absolute;
          top: var(--quarter-size);
          left: calc(var(--quarter-size) * -1);
          width: 0;
          height: 0;
          border-style: solid;
          border-color: #fff transparent transparent transparent;
          border-width: calc(var(--size) * 0.7) calc(var(--size) / 2) 0 calc(var(--size) / 2);
        }

        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 4px;
        }

        textarea::-webkit-scrollbar-track {
          background: transparent;
        }

        textarea::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 2px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: #999;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .diamond {
            --size: 40px;
          }
        }
      `}</style>
        </div>
    );
};

export default ContactForm;


