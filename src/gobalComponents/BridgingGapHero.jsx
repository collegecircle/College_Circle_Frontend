import React from 'react';
import { Star, FileText, Users } from 'lucide-react';

const BridgingGapHero = () => {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Geometric background pattern */}
            <div className="absolute inset-0">
                <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800">
                    {/* Network pattern */}
                    <defs>
                        <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="50" cy="50" r="1" fill="white" opacity="0.3" />
                            <circle cx="0" cy="0" r="1" fill="white" opacity="0.2" />
                            <circle cx="100" cy="0" r="1" fill="white" opacity="0.2" />
                            <circle cx="0" cy="100" r="1" fill="white" opacity="0.2" />
                            <circle cx="100" cy="100" r="1" fill="white" opacity="0.2" />
                            <line x1="50" y1="50" x2="0" y2="0" stroke="white" strokeWidth="0.5" opacity="0.1" />
                            <line x1="50" y1="50" x2="100" y2="0" stroke="white" strokeWidth="0.5" opacity="0.1" />
                            <line x1="50" y1="50" x2="0" y2="100" stroke="white" strokeWidth="0.5" opacity="0.1" />
                            <line x1="50" y1="50" x2="100" y2="100" stroke="white" strokeWidth="0.5" opacity="0.1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#network)" />
                </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16">
                {/* Main heading */}
                {/* <div className="text-center mb-16 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Bridging the Gap, Building the Future
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            We're a young team with a big vision. We saw a gap in the market and decided to fill it with innovative solutions and unwavering passion.
          </p>
        </div> */}

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                    {/* Rated 4.5/5 Card */}
                    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                                <img
                                    src="/assets/cclogo-black-white.png"
                                    alt="Community icon"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">
                            Rated 4.5/5
                        </div>
                        <div className="text-gray-400 text-lg font-medium">
                            Google Reviews
                        </div>
                    </div>

                    {/* 400+ Success Stories Card */}
                    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                                <img
                                    src="/assets/cclogo-black-white.png"
                                    alt="Community icon"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                            400+
                        </div>
                        <div className="text-gray-400 text-lg font-medium">
                            Success Stories
                        </div>
                    </div>

                    {/* 10L+ Community Card */}
                    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                                <img
                                    src="/assets/cclogo-black-white.png"
                                    alt="Community icon"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <div className="text-4xl md:text-5xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">
                            10L+
                        </div>
                        <div className="text-gray-400 text-lg font-medium">
                            Community
                        </div>
                    </div>
                </div>

                {/* Floating elements for added visual interest */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-green-500 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-2000"></div>
                <div className="absolute bottom-40 right-10 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-3000"></div>
            </div>
        </div>
    );
};

export default BridgingGapHero;