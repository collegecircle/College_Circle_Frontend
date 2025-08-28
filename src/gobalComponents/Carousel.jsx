



// import React, { useState, useRef, useEffect } from "react";

// const Carousel = ({ items = [] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [startX, setStartX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const carouselRef = useRef(null);

//   // Default items if none provided
//   const carouselItems =
//     items.length > 0
//       ? items
//       : [
//         { id: 1, title: "Travel Reel", subtitle: "Adventure awaits" },
//         { id: 2, title: "Food Stories", subtitle: "Culinary journey" },
//         { id: 3, title: "Lifestyle", subtitle: "Daily inspirations" },
//         { id: 4, title: "Tech Reviews", subtitle: "Latest gadgets" },
//         { id: 5, title: "Fitness Tips", subtitle: "Stay healthy" },
//         { id: 6, title: "Art & Design", subtitle: "Creative showcase" },
//         { id: 7, title: "Music Vibes", subtitle: "Rhythm & beats" },
//         { id: 8, title: "Nature", subtitle: "Wild & beautiful" },
//       ];

//   // Check if mobile on initial render and when window is resized
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIfMobile();
//     window.addEventListener("resize", checkIfMobile);

//     return () => {
//       window.removeEventListener("resize", checkIfMobile);
//     };
//   }, []);

//   // Calculate items per view based on screen size
//   const itemsPerView = isMobile ? 1 : 3;

//   // Calculate total number of pages
//   const totalPages = Math.ceil(carouselItems.length / itemsPerView);

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
//   };

//   const handleDotClick = (index) => {
//     setActiveIndex(index);
//   };

//   const handleTouchStart = (e) => {
//     setIsDragging(true);
//     setStartX(e.touches ? e.touches[0].clientX : e.clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging) return;
//     const currentX = e.touches ? e.touches[0].clientX : e.clientX;
//     const diff = currentX - startX;
//     setDragOffset(diff);
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     setIsDragging(false);

//     // Determine if we should change slides based on drag distance
//     if (Math.abs(dragOffset) > 50) {
//       if (dragOffset > 0) {
//         handlePrev();
//       } else {
//         handleNext();
//       }
//     }

//     setDragOffset(0);
//   };

//   // Add keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowLeft") {
//         handlePrev();
//       } else if (e.key === "ArrowRight") {
//         handleNext();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div className="w-full mx-auto px-4">
//       <div
//         ref={carouselRef}
//         className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm mb-4"
//         style={{ height: "600px" }}
//       >
//         <div
//           className="flex h-full transition-transform duration-500 ease-out"
//           style={{
//             transform: `translateX(${-(activeIndex * 100) / totalPages
//               }%) translateX(${dragOffset}px)`,
//             width: `${totalPages * 100}%`,
//           }}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           onMouseDown={handleTouchStart}
//           onMouseMove={handleTouchMove}
//           onMouseUp={handleTouchEnd}
//           onMouseLeave={handleTouchEnd}
//         >
//           {Array.from({ length: totalPages }).map((_, pageIndex) => (
//             <div
//               key={pageIndex}
//               className="flex-shrink-0 w-full h-full flex gap-6 p-4"
//               style={{ width: `${100 / totalPages}%` }}
//             >
//               {carouselItems
//                 .slice(pageIndex * itemsPerView, (pageIndex + 1) * itemsPerView)
//                 .map((item, index) => (
//                   <div
//                     key={item.id}
//                     className="group h-full flex flex-col justify-between bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white rounded-xl p-6 relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50"
//                     style={{ width: `${100 / itemsPerView}%` }}
//                   >
//                     {/* Background Pattern */}
//                     <div className="absolute inset-0 opacity-10">
//                       <div
//                         className="w-full h-full"
//                         style={{
//                           backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 70%),
//                                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`,
//                         }}
//                       />
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10">
//                       <div className="mb-4">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4">
//                           <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                           </svg>
//                         </div>
//                         <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                           {item.title}
//                         </h3>
//                         <p className="text-gray-400 text-sm md:text-base">
//                           {item.subtitle || "Follow for more content"}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Follow Button */}
//                     <div className="relative z-10 mt-auto">
//                       <div className="instagram-follow-button flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-105">
//                         <span className="text-white font-semibold text-sm md:text-base">Follow</span>
//                         <img
//                           loading="lazy"
//                           width="24px"
//                           height="24px"
//                           src="https://www.hashproacademy.com/global/icons/instagram.webp"
//                           alt="Instagram Icon"
//                           className="transition-transform duration-300 group-hover:rotate-12"
//                         />
//                       </div>
//                     </div>

//                     {/* Hover overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
//                   </div>
//                 ))}
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 z-10 border border-white/20"
//           onClick={handlePrev}
//           aria-label="Previous slide"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 text-white transition-transform duration-300 hover:-translate-x-1"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M5 12l14 0" />
//             <path d="M5 12l6 6" />
//             <path d="M5 12l6 -6" />
//           </svg>
//         </button>

//         <button
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 z-10 border border-white/20"
//           onClick={handleNext}
//           aria-label="Next slide"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 text-white transition-transform duration-300 hover:translate-x-1"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M5 12l14 0" />
//             <path d="M13 18l6 -6" />
//             <path d="M13 6l6 6" />
//           </svg>
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex justify-center my-4 space-x-3">
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${index === activeIndex
//                 ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8 shadow-lg"
//                 : "bg-gray-500/50 hover:bg-gray-400/70 w-3"
//               }`}
//             aria-label={`Go to page ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Counter */}
//       <div className="flex justify-center items-center my-4">
//         <div className="text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
//           {activeIndex + 1} / {totalPages}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Carousel;


// import React, { useState, useRef, useEffect } from "react";

// const Carousel = ({ items = [] }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [startX, setStartX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(3); // Default to 3 items per view
//   const carouselRef = useRef(null);

//   // Default items if none provided, now including thumbnail and link
//   const carouselItems = items.length > 0 ? items : [
//     { id: 1, title: "Travel Reel", subtitle: "Adventure awaits", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 2, title: "Food Stories", subtitle: "Culinary journey", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 3, title: "Lifestyle", subtitle: "Daily inspirations", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 4, title: "Tech Reviews", subtitle: "Latest gadgets", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 5, title: "Fitness Tips", subtitle: "Stay healthy", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 6, title: "Art & Design", subtitle: "Creative showcase", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 7, title: "Music Vibes", subtitle: "Rhythm & beats", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//     { id: 8, title: "Nature", subtitle: "Wild & beautiful", thumbnail: "https://via.placeholder.com/300x400", link: "#" },
//   ];

//   // Update items per view based on screen size (responsive breakpoints)
//   useEffect(() => {
//     const updateItemsPerView = () => {
//       const width = window.innerWidth;
//       if (width <= 650) {
//         setItemsPerView(1); // 1 item for small screens
//       } else if (width <= 870) {
//         setItemsPerView(2); // 2 items for medium screens
//       } else if (width <= 1120) {
//         setItemsPerView(3); // 3 items for larger screens
//       } else {
//         setItemsPerView(4); // 4 items for extra-large screens
//       }
//     };

//     updateItemsPerView();
//     window.addEventListener("resize", updateItemsPerView);
//     return () => {
//       window.removeEventListener("resize", updateItemsPerView);
//     };
//   }, []);

//   // Calculate total number of pages
//   const totalPages = Math.ceil(carouselItems.length / itemsPerView);

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
//   };

//   const handleDotClick = (index) => {
//     setActiveIndex(index);
//   };

//   const handleTouchStart = (e) => {
//     setIsDragging(true);
//     setStartX(e.touches ? e.touches[0].clientX : e.clientX);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging) return;
//     const currentX = e.touches ? e.touches[0].clientX : e.clientX;
//     const diff = currentX - startX;
//     setDragOffset(diff);
//   };

//   const handleTouchEnd = () => {
//     if (!isDragging) return;
//     setIsDragging(false);
//     if (Math.abs(dragOffset) > 50) {
//       if (dragOffset > 0) {
//         handlePrev();
//       } else {
//         handleNext();
//       }
//     }
//     setDragOffset(0);
//   };

//   // Add keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowLeft") {
//         handlePrev();
//       } else if (e.key === "ArrowRight") {
//         handleNext();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <div className="w-full mx-auto px-4">
//       <div
//         ref={carouselRef}
//         className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm mb-4"
//         style={{ height: "600px" }}
//       >
//         <div
//           className="flex h-full transition-transform duration-500 ease-out"
//           style={{
//             transform: `translateX(${-(activeIndex * 100) / totalPages}%) translateX(${dragOffset}px)`,
//             width: `${totalPages * 100}%`,
//           }}
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//           onMouseDown={handleTouchStart}
//           onMouseMove={handleTouchMove}
//           onMouseUp={handleTouchEnd}
//           onMouseLeave={handleTouchEnd}
//         >
//           {Array.from({ length: totalPages }).map((_, pageIndex) => (
//             <div
//               key={pageIndex}
//               className="flex-shrink-0 w-full h-full flex gap-6 p-4"
//               style={{ width: `${100 / totalPages}%` }}
//             >
//               {carouselItems
//                 .slice(pageIndex * itemsPerView, (pageIndex + 1) * itemsPerView)
//                 .map((item, index) => (
//                   <a
//                     key={item.id}
//                     href={item.link || "#"}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group h-full flex flex-col justify-between bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white rounded-xl p-6 relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50"
//                     style={{ width: `${100 / itemsPerView}%` }}
//                   >
//                     {/* Background Pattern */}
//                     <div className="absolute inset-0 opacity-10">
//                       <div
//                         className="w-full h-full"
//                         style={{
//                           backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 70%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`,
//                         }}
//                       />
//                     </div>

//                     {/* Thumbnail */}
//                     <div className="relative z-10 mb-4">
//                       <img
//                         loading="lazy"
//                         className="w-full h-64 object-cover rounded-lg"
//                         src={item.thumbnail}
//                         alt={item.title}
//                       />
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="insta-play-btn-border bg-white/30 rounded-full p-2">
//                           <img
//                             loading="lazy"
//                             width="24px"
//                             height="24px"
//                             src="https://www.hashproacademy.com/global/icons/instagram.webp"
//                             alt="Play button"
//                             className="insta-play-btn"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="relative z-10">
//                       <div className="mb-4">
//                         <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                           {item.title}
//                         </h3>
//                         <p className="text-gray-400 text-sm md:text-base">
//                           {item.subtitle || "Follow for more content"}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Follow Button */}
//                     <div className="relative z-10 mt-auto">
//                       <div className="instagram-follow-button flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-105">
//                         <span className="text-white font-semibold text-sm md:text-base">Follow</span>
//                         <img
//                           loading="lazy"
//                           width="24px"
//                           height="24px"
//                           src="https://www.hashproacademy.com/global/icons/instagram.webp"
//                           alt="Instagram Icon"
//                           className="transition-transform duration-300 group-hover:rotate-12"
//                         />
//                       </div>
//                     </div>

//                     {/* Hover overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
//                   </a>
//                 ))}
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         <button
//           className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 z-10 border border-white/20"
//           onClick={handlePrev}
//           aria-label="Previous slide"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 text-white transition-transform duration-300 hover:-translate-x-1"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M5 12l14 0" />
//             <path d="M5 12l6 6" />
//             <path d="M5 12l6 -6" />
//           </svg>
//         </button>
//         <button
//           className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 z-10 border border-white/20"
//           onClick={handleNext}
//           aria-label="Next slide"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6 text-white transition-transform duration-300 hover:translate-x-1"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             fill="none"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//             <path d="M5 12l14 0" />
//             <path d="M13 18l6 -6" />
//             <path d="M13 6l6 6" />
//           </svg>
//         </button>
//       </div>

//       {/* Pagination Dots */}
//       <div className="flex justify-center my-4 space-x-3">
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${index === activeIndex
//                 ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8 shadow-lg"
//                 : "bg-gray-500/50 hover:bg-gray-400/70 w-3"
//               }`}
//             aria-label={`Go to page ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Counter */}
//       <div className="flex justify-center items-center my-4">
//         <div className="text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
//           {activeIndex + 1} / {totalPages}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Carousel;


import React, { useState, useRef, useEffect } from "react";

const Carousel = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [playingReelId, setPlayingReelId] = useState(null);
  const carouselRef = useRef(null);

  const carouselItems = items.length > 0 ? items : [
    { id: 1, title: "Travel Reel", subtitle: "Adventure awaits", thumbnail: "https://via.placeholder.com/300x400", link: "https://www.instagram.com/p/C8zLfWlJ4LA/", shortcode: "C8zLfWlJ4LA" },
    { id: 2, title: "Food Stories", subtitle: "Culinary journey", thumbnail: "https://via.placeholder.com/300x400", link: "https://www.instagram.com/p/C9zjSY4yFE4/", shortcode: "C9zjSY4yFE4" },
    { id: 3, title: "Lifestyle", subtitle: "Daily inspirations", thumbnail: "https://via.placeholder.com/300x400", link: "https://www.instagram.com/p/C7mEfWnpnA1/", shortcode: "C7mEfWnpnA1" },
    { id: 4, title: "Tech Reviews", subtitle: "Latest gadgets", thumbnail: "https://via.placeholder.com/300x400", link: "https://www.instagram.com/p/C7eRhd3JBxa/", shortcode: "C7eRhd3JBxa" },
    { id: 5, title: "Fitness Tips", subtitle: "Stay healthy", thumbnail: "https://via.placeholder.com/300x400", link: "#", shortcode: "" },
    { id: 6, title: "Art & Design", subtitle: "Creative showcase", thumbnail: "https://via.placeholder.com/300x400", link: "#", shortcode: "" },
    { id: 7, title: "Music Vibes", subtitle: "Rhythm & beats", thumbnail: "https://via.placeholder.com/300x400", link: "#", shortcode: "" },
    { id: 8, title: "Nature", subtitle: "Wild & beautiful", thumbnail: "https://via.placeholder.com/300x400", link: "#", shortcode: "" },
  ];

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width <= 650) setItemsPerView(1);
      else if (width <= 870) setItemsPerView(2);
      else if (width <= 1120) setItemsPerView(3);
      else setItemsPerView(4);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const totalPages = Math.ceil(carouselItems.length / itemsPerView);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    setPlayingReelId(null);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    setPlayingReelId(null);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setPlayingReelId(null);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragOffset(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) handlePrev();
      else handleNext();
    }
    setDragOffset(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePlayClick = (itemId, shortcode) => {
    setPlayingReelId(playingReelId === itemId ? null : itemId);
  };

  return (
    <div className="w-full mx-auto px-4 py-4">
      <div
        ref={carouselRef}
        className="relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-sm mb-4"
        style={{ height: "600px" }}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${-(activeIndex * 100) / totalPages}%) translateX(${dragOffset}px)`,
            width: `${totalPages * 100}%`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex-shrink-0 w-full h-full flex gap-6 p-4"
              style={{ width: `${100 / totalPages}%` }}
            >
              {carouselItems
                .slice(pageIndex * itemsPerView, (pageIndex + 1) * itemsPerView)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group h-full flex flex-col justify-between bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white rounded-xl p-6 relative overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-slate-700/50"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 70%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`,
                        }}
                      />
                    </div>
                    <div className="relative z-10 mb-4">
                      {playingReelId === item.id && item.shortcode ? (
                        <iframe
                          src={`https://www.instagram.com/reels/${item.shortcode}/embed`}
                          className="w-full h-64 rounded-lg"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <img
                            loading="lazy"
                            className="w-full h-64 object-cover rounded-lg"
                            src={item.thumbnail}
                            alt={item.title}
                          />
                          {item.shortcode && (
                            <div
                              className="absolute inset-0 flex items-center justify-center cursor-pointer"
                              onClick={() => handlePlayClick(item.id, item.shortcode)}
                            >
                              <div className="insta-play-btn-border bg-white/30 rounded-full p-2">
                                <img
                                  loading="lazy"
                                  width="24px"
                                  height="24px"
                                  src="https://www.hashproacademy.com/global/icons/instagram.webp"
                                  alt="Play button"
                                  className="insta-play-btn"
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="relative z-10">
                      <div className="mb-4">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm md:text-base">
                          {item.subtitle || "Follow for more content"}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 mt-auto">
                      <a
                        href={item.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="instagram-follow-button flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 group-hover:scale-105"
                      >
                        <span className="text-white font-semibold text-sm md:text-base">Follow</span>
                        <img
                          loading="lazy"
                          width="24px"
                          height="24px"
                          src="https://www.hashproacademy.com/global/icons/instagram.webp"
                          alt="Instagram Icon"
                          className="transition-transform duration-300 group-hover:rotate-12"
                        />
                      </a>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 z-10 border border-white/20"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white transition-transform duration-300 hover:-translate-x-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 z-10 border border-white/20"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white transition-transform duration-300 hover:translate-x-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center my-4 space-x-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${index === activeIndex
              ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8 shadow-lg"
              : "bg-gray-500/50 hover:bg-gray-400/70 w-3"
              }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex justify-center items-center my-4">
        <div className="text-sm font-medium bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          {activeIndex + 1} / {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Carousel;