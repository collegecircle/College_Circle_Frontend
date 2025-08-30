



import React from 'react';
import { Bookmark, ArrowRight, MapPin, Users, Award, Calendar, GraduationCap, TrendingUp } from 'lucide-react';

const CollegeCard = ({ college }) => {


    return (
        <div className="bg-slate-900 rounded-2xl p-6 relative group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer border border-gray-700 hover:border-blue-400 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>


            {/* Ranking Badge */}
            <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {college.ranking}
                </span>
            </div>

            {/* College Header */}
            <div className="mt-12 mb-6">
                <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg flex-shrink-0 border-2 border-blue-400/30 bg-gray-800">
                        <img
                            src={college.logo}
                            alt={college.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors duration-300">
                            {college.name}
                        </h3>
                        <div className="flex items-center space-x-1 mb-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400 text-sm">{college.location}</span>
                        </div>

                        {/* Fees Section */}
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl font-bold text-blue-400">{college.fees}</span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs font-semibold">
                                Annual
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <Users className="w-4 h-4 mx-auto text-green-400 mb-1" />
                    <p className="text-xs text-gray-400">Students</p>
                    <p className="font-semibold text-white text-sm">{college.students}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <Calendar className="w-4 h-4 mx-auto text-purple-400 mb-1" />
                    <p className="text-xs text-gray-400">Established</p>
                    <p className="font-semibold text-white text-sm">{college.established}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <GraduationCap className="w-4 h-4 mx-auto text-yellow-400 mb-1" />
                    <p className="text-xs text-gray-400">Programs</p>
                    <p className="font-semibold text-white text-sm">{college.programs}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                    <TrendingUp className="w-4 h-4 mx-auto text-red-400 mb-1" />
                    <p className="text-xs text-gray-400">Acceptance</p>
                    <p className="font-semibold text-white text-sm">{college.acceptanceRate}</p>
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:from-blue-400 hover:to-purple-500 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-blue-400/25">
                <span>View College</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-500 pointer-events-none"></div>
        </div>
    );
};

export default CollegeCard;