


// import React, { useState, useEffect } from 'react';

// export default function LumiGlassHero() {
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
//   const [cursorFollower, setCursorFollower] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setCursorPos({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const animate = () => {
//       setCursorFollower(prev => ({
//         x: prev.x + (cursorPos.x - prev.x) * 0.15,
//         y: prev.y + (cursorPos.y - prev.y) * 0.15
//       }));
//       requestAnimationFrame(animate);
//     };
//     const animationId = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationId);
//   }, [cursorPos]);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#e8f4f8] via-[#d4e8ec] to-[#c8dde3]">
//       {/* Cursor Follower */}
//       <div 
//         className="fixed w-20 h-20 bg-black/60 rounded-full pointer-events-none z-50 blur-2xl opacity-50 transition-transform duration-150 hidden lg:block"
//         style={{
//           left: `${cursorFollower.x - 40}px`,
//           top: `${cursorFollower.y - 40}px`,
//           transform: isHovering ? 'scale(1.5)' : 'scale(1)',
//           mixBlendMode: 'difference'
//         }}
//       />

//       {/* Navbar */}
//       <nav className="fixed top-0 left-0 right-0 z-40 bg-white/5 backdrop-blur-md">
//         <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-5 md:py-6 lg:py-7">
//           <div className="flex items-center gap-2 sm:gap-3">
//             <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-black flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl flex-shrink-0">
//               ◆
//             </div>
//             <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wider text-gray-900 whitespace-nowrap">
//               LUMI GLASS TECH
//             </span>
//           </div>
//           <button 
//             className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 border-black rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 whitespace-nowrap"
//             onMouseEnter={() => setIsHovering(true)}
//             onMouseLeave={() => setIsHovering(false)}
//           >
//             MENU
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="min-h-screen flex items-center justify-center relative">
//         <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-24 sm:pt-28 md:pt-32 lg:pt-20 pb-12 md:pb-16">

//           {/* Mobile/Tablet Layout (< lg) */}
//           <div className="lg:hidden">
//             {/* Content First on Mobile */}
//             <div className="max-w-xl mb-12 sm:mb-16 md:mb-20">
//               <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-800 mb-6 sm:mb-8 md:mb-10 animate-fadeInUp">
//                 AT LUMI GLASS TECH, WE DESIGN SOLUTIONS THAT BLEND SMART TECHNOLOGY WITH ENERGY EFFICIENCY, ENHANCING COMFORT AND CLARITY IN EVERY SPACE.
//               </p>
//               <button 
//                 className="px-6 py-2.5 sm:px-7 sm:py-3 md:px-9 md:py-3.5 border-2 border-black rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 animate-fadeInUpDelay"
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseLeave={() => setIsHovering(false)}
//               >
//                 GET A QUOTE
//               </button>
//             </div>

//             {/* Typography Below on Mobile */}
//             <div className="space-y-[-8px] sm:space-y-[-12px] md:space-y-[-16px]">
//               <h2 className="text-[60px] sm:text-[90px] md:text-[120px] font-light text-[#ff6b35] tracking-tighter leading-none animate-slideInRight">
//                 Tech
//               </h2>
//               <h2 className="text-[70px] sm:text-[105px] md:text-[140px] font-light text-gray-900 tracking-[-0.03em] leading-none animate-slideInRightDelay">
//                 Insights
//               </h2>
//               <h2 className="text-[80px] sm:text-[120px] md:text-[160px] font-light text-gray-900 tracking-[-0.04em] leading-none animate-slideInRightDelay2">
//                 Story
//               </h2>
//             </div>
//           </div>

//           {/* Desktop Layout (>= lg) */}
//           <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 lg:items-center">
//             {/* Left Content */}
//             <div className="lg:col-span-5 xl:col-span-4">
//               <p className="text-base lg:text-lg xl:text-xl leading-relaxed text-gray-800 mb-8 lg:mb-10 xl:mb-12 animate-fadeInUp">
//                 AT LUMI GLASS TECH, WE DESIGN SOLUTIONS THAT BLEND SMART TECHNOLOGY WITH ENERGY EFFICIENCY, ENHANCING COMFORT AND CLARITY IN EVERY SPACE.
//               </p>
//               <button 
//                 className="px-8 py-3 lg:px-9 lg:py-3.5 border-2 border-black rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 animate-fadeInUpDelay"
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseLeave={() => setIsHovering(false)}
//               >
//                 GET A QUOTE
//               </button>
//             </div>

//             {/* Right Typography */}
//             <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-end space-y-[-20px] xl:space-y-[-30px] 2xl:space-y-[-40px]">
//               <h2 className="text-[140px] xl:text-[180px] 2xl:text-[220px] font-light text-[#ff6b35] tracking-tighter leading-none animate-slideInRight">
//                 Tech
//               </h2>
//               <h2 className="text-[180px] xl:text-[240px] 2xl:text-[300px] font-light text-gray-900 tracking-[-0.03em] leading-none animate-slideInRightDelay">
//                 Insights
//               </h2>
//               <h2 className="text-[220px] xl:text-[280px] 2xl:text-[360px] font-light text-gray-900 tracking-[-0.04em] leading-none animate-slideInRightDelay2">
//                 Story
//               </h2>
//             </div>
//           </div>

//         </div>
//       </section>

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(100px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .animate-fadeInUp {
//           animation: fadeInUp 1s ease forwards 0.3s;
//           opacity: 0;
//         }

//         .animate-fadeInUpDelay {
//           animation: fadeInUp 1s ease forwards 0.5s;
//           opacity: 0;
//         }

//         .animate-slideInRight {
//           animation: slideInRight 1s ease forwards;
//           opacity: 0;
//         }

//         .animate-slideInRightDelay {
//           animation: slideInRight 1s ease forwards 0.2s;
//           opacity: 0;
//         }

//         .animate-slideInRightDelay2 {
//           animation: slideInRight 1s ease forwards 0.4s;
//           opacity: 0;
//         }

//         @media (max-width: 1023px) {
//           .animate-slideInRight,
//           .animate-slideInRightDelay,
//           .animate-slideInRightDelay2 {
//             animation: fadeInUp 1s ease forwards;
//           }

//           .animate-slideInRight {
//             animation-delay: 0.7s;
//           }

//           .animate-slideInRightDelay {
//             animation-delay: 0.9s;
//           }

//           .animate-slideInRightDelay2 {
//             animation-delay: 1.1s;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';

export default function LumiGlassHero() {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorFollower, setCursorFollower] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const animate = () => {
            setCursorFollower(prev => ({
                x: prev.x + (cursorPos.x - prev.x) * 0.15,
                y: prev.y + (cursorPos.y - prev.y) * 0.15
            }));
            requestAnimationFrame(animate);
        };
        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [cursorPos]);

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#e8f4f8] via-[#d4e8ec] to-[#c8dde3]">
            {/* Cursor Follower */}
            <div
                className="fixed w-20 h-20 bg-black/60 rounded-full pointer-events-none z-50 blur-2xl opacity-50 transition-transform duration-150 hidden lg:block"
                style={{
                    left: `${cursorFollower.x - 40}px`,
                    top: `${cursorFollower.y - 40}px`,
                    transform: isHovering ? 'scale(1.5)' : 'scale(1)',
                    mixBlendMode: 'difference'
                }}
            />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white/5 backdrop-blur-md">
                <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 py-5 md:py-6 lg:py-7">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-black flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl flex-shrink-0">
                            ◆
                        </div>
                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wider text-gray-900 whitespace-nowrap">
                            LUMI GLASS TECH
                        </span>
                    </div>
                    <button
                        className="px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 border-2 border-black rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 whitespace-nowrap"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        MENU
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center relative px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 md:pt-32 lg:pt-20">

                {/* Left Content - Fixed Position */}
                <div className="absolute left-4 sm:left-6 md:left-10 lg:left-14 xl:left-16 top-1/2 -translate-y-1/2 lg:-translate-y-1/3 max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[450px] xl:max-w-[500px] z-10">
                    <p className="text-xs sm:text-sm md:text-base lg:text-[15px] xl:text-[16px] leading-relaxed text-gray-900 mb-6 sm:mb-7 md:mb-8 lg:mb-10 animate-fadeInUp font-normal">
                        AT LUMI GLASS TECH, WE DESIGN SOLUTIONS THAT BLEND SMART TECHNOLOGY WITH ENERGY EFFICIENCY, ENHANCING COMFORT AND CLARITY IN EVERY SPACE.
                    </p>
                    <button
                        className="px-5 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-2.5 lg:px-8 lg:py-3 border-2 border-black rounded-full text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-0.5 animate-fadeInUpDelay"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        GET A QUOTE
                    </button>
                </div>

                {/* Center-Right Typography - Overlapping Layout */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 sm:pr-0">
                    <div className="relative">
                        {/* Tech - Top with gradient overlay */}
                        <div className="relative mb-[-30px] sm:mb-[-45px] md:mb-[-60px] lg:mb-[-80px] xl:mb-[-100px]">
                            <h2 className="text-[70px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[220px] 2xl:text-[280px] font-light text-[#ff6b35] tracking-[-0.02em] leading-none animate-slideInRight">
                                Tech
                            </h2>
                            {/* Gradient overlay on Tech */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#d4e8ec]/80 pointer-events-none"></div>
                        </div>

                        {/* Insights - Middle overlapping */}
                        <div className="relative mb-[-40px] sm:mb-[-60px] md:mb-[-80px] lg:mb-[-110px] xl:mb-[-140px]">
                            <h2 className="text-[85px] sm:text-[125px] md:text-[175px] lg:text-[230px] xl:text-[290px] 2xl:text-[360px] font-light text-gray-900 tracking-[-0.03em] leading-none animate-slideInRightDelay pr-4 sm:pr-8 md:pr-12">
                                Insights
                            </h2>
                        </div>

                        {/* Story - Bottom */}
                        <div className="relative">
                            <h2 className="text-[100px] sm:text-[145px] md:text-[200px] lg:text-[270px] xl:text-[340px] 2xl:text-[420px] font-light text-gray-900 tracking-[-0.04em] leading-none animate-slideInRightDelay2">
                                Story
                            </h2>
                        </div>
                    </div>
                </div>

            </section>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards 0.3s;
          opacity: 0;
        }

        .animate-fadeInUpDelay {
          animation: fadeInUp 1s ease forwards 0.5s;
          opacity: 0;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease forwards;
          opacity: 0;
        }

        .animate-slideInRightDelay {
          animation: slideInRight 1s ease forwards 0.2s;
          opacity: 0;
        }

        .animate-slideInRightDelay2 {
          animation: slideInRight 1s ease forwards 0.4s;
          opacity: 0;
        }

        @media (max-width: 1023px) {
          .animate-slideInRight,
          .animate-slideInRightDelay,
          .animate-slideInRightDelay2 {
            animation: fadeInUp 1s ease forwards;
          }

          .animate-slideInRight {
            animation-delay: 0.7s;
          }

          .animate-slideInRightDelay {
            animation-delay: 0.9s;
          }

          .animate-slideInRightDelay2 {
            animation-delay: 1.1s;
          }
        }
      `}</style>
        </div>
    );
}