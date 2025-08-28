// import React, { useState, useEffect } from "react";

// const FloatingNavButton = () => {
//     const [showNavMenu, setShowNavMenu] = useState(false);
//     const [navPosition, setNavPosition] = useState({ x: 0, y: 0 });
//     const [isDragging, setIsDragging] = useState(false);
//     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

//     // Initialize position on component mount
//     useEffect(() => {
//         const updatePosition = () => {
//             const isMobile = window.innerWidth < 768;
//             const buttonSize = isMobile ? 56 : 64;
//             const padding = isMobile ? 12 : 16;

//             // Position in bottom-right corner with some padding
//             const x = window.innerWidth - buttonSize - padding;
//             const y = window.innerHeight - buttonSize - padding;
//             setNavPosition({ x, y });
//         };

//         updatePosition();
//         window.addEventListener("resize", updatePosition);
//         return () => window.removeEventListener("resize", updatePosition);
//     }, []);

//     const handleNavigation = (path) => {
//         setShowNavMenu(false);
//         console.log(`Navigating to: ${path}`);
//         // Add your navigation logic here
//     };

//     // Handle drag functionality for both mouse and touch
//     const handleDragStart = (e) => {
//         setIsDragging(true);
//         const rect = e.currentTarget.getBoundingClientRect();

//         // Handle both mouse and touch events
//         const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//         const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//         setDragOffset({
//             x: clientX - rect.left,
//             y: clientY - rect.top,
//         });
//     };

//     const handleDragMove = (e) => {
//         if (!isDragging) return;

//         const isMobile = window.innerWidth < 768;
//         const buttonSize = isMobile ? 56 : 64;
//         const padding = isMobile ? 12 : 16;

//         // Handle both mouse and touch events
//         const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//         const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//         let newX = clientX - dragOffset.x;
//         let newY = clientY - dragOffset.y;

//         // Constrain within screen bounds
//         newX = Math.max(
//             padding,
//             Math.min(newX, window.innerWidth - buttonSize - padding)
//         );
//         newY = Math.max(
//             padding,
//             Math.min(newY, window.innerHeight - buttonSize - padding)
//         );

//         setNavPosition({ x: newX, y: newY });
//     };

//     const handleDragEnd = () => {
//         setIsDragging(false);
//     };

//     // Add global event listeners for dragging (both mouse and touch)
//     useEffect(() => {
//         if (isDragging) {
//             // Mouse events
//             document.addEventListener("mousemove", handleDragMove);
//             document.addEventListener("mouseup", handleDragEnd);

//             // Touch events
//             document.addEventListener("touchmove", handleDragMove, {
//                 passive: false,
//             });
//             document.addEventListener("touchend", handleDragEnd);

//             return () => {
//                 document.removeEventListener("mousemove", handleDragMove);
//                 document.removeEventListener("mouseup", handleDragEnd);
//                 document.removeEventListener("touchmove", handleDragMove);
//                 document.removeEventListener("touchend", handleDragEnd);
//             };
//         }
//     }, [isDragging, dragOffset]);

//     // Pinterest-style perfect circular arc from left to top
//     const getPinterestPosition = (index, total) => {
//         const isMobile = window.innerWidth < 768;
//         const radius = isMobile ? 130 : 160; // Distance from main button

//         // Create perfect circular arc from left side to top (90 degrees total arc)
//         const totalArcAngle = Math.PI; // 90 degrees arc
//         const startAngle = Math.PI; // Start from left side (180 degrees)

//         // Distribute icons evenly along the arc length
//         const angleStep = totalArcAngle / (total - 1);
//         const angle = startAngle - index * angleStep; // Subtract to go counter-clockwise from left to top

//         // Perfect circle calculations
//         const x = radius * Math.cos(angle);
//         const y = -radius * Math.sin(angle); // Negative Y for upward positioning

//         return { x, y };
//     };

//     const navigationItems = [
//         {
//             label: "About",
//             path: "/about",
//             icon: "info",
//             iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
//         },
//         {
//             label: "Services",
//             path: "/services",
//             icon: "settings",
//             iconPath:
//                 "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
//         },
//         {
//             label: "Features",
//             path: "/features",
//             icon: "star",
//             iconPath:
//                 "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
//         },
//         {
//             label: "Contact",
//             path: "/contact",
//             icon: "phone",
//             iconPath:
//                 "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
//         },
//     ];

//     const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

//     return (
//         <>
//             {/* Draggable Floating Navigation Button */}
//             <div
//                 className="fixed z-50 select-none"
//                 style={{
//                     left: `${navPosition.x}px`,
//                     top: `${navPosition.y}px`,
//                     cursor: isDragging ? "grabbing" : "grab",
//                 }}
//             >
//                 <div className="relative">
//                     {/* Main Navigation Button - 60% Black background, 30% White icon, 10% Yellow accent */}
//                     <button
//                         onMouseDown={handleDragStart}
//                         onTouchStart={handleDragStart}
//                         onClick={(e) => {
//                             // Prevent click when dragging
//                             if (!isDragging) {
//                                 setShowNavMenu(!showNavMenu);
//                             }
//                         }}
//                         className={`
//               relative group overflow-hidden
//               ${isMobile ? "w-14 h-14" : "w-16 h-16"} rounded-full shadow-2xl
//               bg-black border-2 border-gray-800
              
//               transform transition-all duration-300 ease-out
//               hover:scale-105 hover:shadow-3xl hover:border-yellow-400
//               focus:outline-none focus:ring-4 focus:ring-yellow-400/50
//               active:scale-95 select-none touch-none
//               ${showNavMenu ? "rotate-45 scale-105 border-yellow-400" : ""}
//               ${isDragging ? "scale-110 shadow-3xl border-yellow-400" : ""}
//             `}
//                         aria-label="Navigation menu"
//                     >
//                         {/* Yellow accent ring when active */}
//                         {(showNavMenu || isDragging) && (
//                             <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-full"></div>
//                         )}

//                         {/* Icon - White (30%) */}
//                         <div className="relative z-10 flex items-center justify-center h-full">
//                             {showNavMenu ? (
//                                 <svg
//                                     className={`${isMobile ? "w-6 h-6" : "w-8 h-8"
//                                         } text-white drop-shadow-lg transition-transform duration-300`}
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             ) : (
//                                 <svg
//                                     className={`${isMobile ? "w-6 h-6" : "w-8 h-8"
//                                         } text-white drop-shadow-lg transition-transform duration-300`}
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M4 6h16M4 12h16M4 18h16"
//                                     />
//                                 </svg>
//                             )}
//                         </div>

//                         {/* Yellow accent ripple effect on interaction */}
//                         <div className="absolute inset-0 rounded-full bg-yellow-400/20 scale-0 group-active:scale-100 transition-transform duration-150"></div>

//                         {/* Yellow drag indicator */}
//                         <div
//                             className={`absolute bottom-1 right-1 ${isMobile ? "w-1.5 h-1.5" : "w-2 h-2"
//                                 } bg-yellow-400 rounded-full opacity-60`}
//                         ></div>
//                     </button>

//                     {/* Pinterest-style Perfect Circular Arc from Left to Top */}
//                     {showNavMenu && (
//                         <>
//                             <style>{`
//                 @keyframes expandFromCenter {
//                   from {
//                     opacity: 0;
//                     transform: scale(0) translate(var(--translate-x), var(--translate-y));
//                   }
//                   to {
//                     opacity: 1;
//                     transform: scale(1) translate(var(--translate-x), var(--translate-y));
//                   }
//                 }
//                 .animate-expand-from-center {
//                   animation: expandFromCenter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
//                 }
//               `}</style>

//                             {navigationItems.map((item, index) => {
//                                 const position = getPinterestPosition(
//                                     index,
//                                     navigationItems.length
//                                 );
//                                 return (
//                                     <div
//                                         key={index}
//                                         className="absolute animate-expand-from-center"
//                                         style={{
//                                             "--translate-x": `${position.x}px`,
//                                             "--translate-y": `${position.y}px`,
//                                             transform: `translate(${position.x}px, ${position.y}px)`,
//                                             transformOrigin: "center",
//                                             animationDelay: `${index * 0.1}s`,
//                                         }}
//                                     >
//                                         <div className="relative group">
//                                             {/* Navigation buttons - Black background (60%), White icons (30%), Yellow accents (10%) */}
//                                             <button
//                                                 onClick={() => handleNavigation(item.path)}
//                                                 className={`
//                           group relative overflow-hidden
//                           ${isMobile ? "w-10 h-10" : "w-12 h-12"
//                                                     } rounded-full shadow-xl
//                           bg-black border-2 border-gray-700
//                           hover:shadow-2xl hover:scale-110 hover:border-yellow-400
//                           transform transition-all duration-200 ease-out
//                           focus:outline-none focus:ring-3 focus:ring-yellow-400/50
//                           active:scale-95
//                           flex items-center justify-center
//                         `}
//                                                 title={item.label}
//                                             >
//                                                 {/* Yellow accent background on hover */}
//                                                 <div className="absolute inset-0 bg-yellow-400/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></div>

//                                                 {/* White icon (30%) */}
//                                                 <div className="relative z-10">
//                                                     <svg
//                                                         className={`${isMobile ? "w-4 h-4" : "w-5 h-5"
//                                                             } text-white drop-shadow-sm group-hover:text-yellow-100 transition-colors duration-200`}
//                                                         fill="none"
//                                                         stroke="currentColor"
//                                                         viewBox="0 0 24 24"
//                                                     >
//                                                         <path
//                                                             strokeLinecap="round"
//                                                             strokeLinejoin="round"
//                                                             strokeWidth={2}
//                                                             d={item.iconPath}
//                                                         />
//                                                     </svg>
//                                                 </div>

//                                                 {/* Yellow shine effect */}
//                                                 <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent skew-x-12"></div>
//                                             </button>

//                                             {/* Label tooltip - Black background, white text, yellow accent border */}
//                                             {!isMobile && (
//                                                 <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
//                                                     <span className="text-xs text-white bg-black border border-yellow-400/50 px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
//                                                         {item.label}
//                                                     </span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Backdrop for closing menu - Black overlay (60%) */}
//             {showNavMenu && (
//                 <div
//                     className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
//                     onClick={() => setShowNavMenu(false)}
//                 />
//             )}
//         </>
//     );
// };

// export default FloatingNavButton;
