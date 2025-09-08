// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import Logo from "/assets/cclogo.PNG";

// const Navigation = ({ currentPage, navigateTo }) => {
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//     const navItems = [
//         { id: 'home', label: 'Home', color: 'yellow-400' },
//         { id: 'jobs', label: 'Jobs', color: 'green-400' },
//         { id: 'colleges', label: 'Colleges', color: 'blue-400' },
//         { id: 'courses', label: 'Courses', color: 'yellow-400' },
//     ];

//     const handleNavigation = (page) => {
//         navigateTo(page);
//         setIsMobileMenuOpen(false);
//     };

//     return (
//         <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     {/* Logo */}
//                     <button
//                         onClick={() => handleNavigation('home')}
//                         className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
//                     >
//                         <img src={Logo} alt="Logo" className="w-8 h-8" />
//                         <span className="font-bold text-xl text-white">CollegeCircle</span>
//                     </button>

//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex items-center space-x-6">
//                         {navItems.map((item) => (
//                             <button
//                                 key={item.id}
//                                 onClick={() => handleNavigation(item.id)}
//                                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === item.id
//                                     ? `bg-${item.color} text-black shadow-lg`
//                                     : `text-gray-300 hover:text-${item.color} hover:bg-gray-800`
//                                     }`}
//                             >
//                                 {item.label}
//                             </button>
//                         ))}
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <div className="md:hidden">
//                         <button
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                             className="text-gray-300 hover:text-white p-2 transition-colors duration-300"
//                         >
//                             {isMobileMenuOpen ? (
//                                 <X className="w-6 h-6" />
//                             ) : (
//                                 <Menu className="w-6 h-6" />
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {isMobileMenuOpen && (
//                     <div className="md:hidden py-4 border-t border-gray-700">
//                         <div className="flex flex-col space-y-2">
//                             {navItems.map((item) => (
//                                 <button
//                                     key={item.id}
//                                     onClick={() => handleNavigation(item.id)}
//                                     className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${currentPage === item.id
//                                         ? `bg-${item.color} text-black`
//                                         : `text-gray-300 hover:text-${item.color} hover:bg-gray-800`
//                                         }`}
//                                 >
//                                     {item.label}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navigation;




import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from "/assets/cclogo.PNG";

const Navigation = ({ currentPage, navigateTo }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', color: 'yellow-400' },
        { id: 'jobs', label: 'Jobs', color: 'yellow-400' },
        { id: 'colleges', label: 'Colleges', color: 'yellow-400' },
        { id: 'courses', label: 'Courses', color: 'yellow-400' },
    ];

    const handleNavigation = (page) => {
        navigateTo(page);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-black via-black to-black border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <button
                        onClick={() => handleNavigation('home')}
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-300"
                    >
                        <img src={Logo} alt="Logo" className="w-8 h-8" />
                        <span className="font-bold text-xl text-white">CollegeCircle</span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === item.id
                                    ? `bg-${item.color} text-black shadow-lg`
                                    : `text-gray-300 hover:text-${item.color} hover:bg-gray-800`
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-300 hover:text-white p-2 transition-colors duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-700">
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigation(item.id)}
                                    className={`px-4 py-3 rounded-lg text-left font-medium transition-all duration-300 ${currentPage === item.id
                                        ? `bg-${item.color} text-black`
                                        : `text-gray-300 hover:text-${item.color} hover:bg-gray-800`
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;