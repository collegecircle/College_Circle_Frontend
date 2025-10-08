

// import React, { useState, useEffect } from "react";
// import { X, ChevronLeft, ChevronRight, Play, FileImage } from "lucide-react";

// const OverviewModal = ({ college, isOpen, onClose }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Reset slide when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setCurrentSlide(0);
//     }
//   }, [isOpen]);

//   // Handle escape key to close modal
//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === "Escape" && isOpen) {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen || !college) return null;

//   // Prepare carousel content (videos and images)
//   const getCarouselContent = () => {
//     const content = [];

//     // Add video if available
//     if (college.gallery?.videoUrl) {
//       content.push({
//         type: "video",
//         url: college.gallery.videoUrl,
//         title: "College Overview Video",
//       });
//     }

//     // Add images from gallery
//     if (
//       college.gallery?.slideImages &&
//       Array.isArray(college.gallery.slideImages)
//     ) {
//       college.gallery.slideImages.forEach((image, index) => {
//         content.push({
//           type: "image",
//           url: image.url || image,
//           title: image.title || `College Image ${index + 1}`,
//         });
//       });
//     }

//     // Add logo as fallback
//     if (college.gallery?.logoUrl) {
//       content.push({
//         type: "image",
//         url: college.gallery.logoUrl,
//         title: "College Logo",
//       });
//     }

//     // Add some default content if no media available
//     if (content.length === 0) {
//       content.push({
//         type: "image",
//         url: "/assets/cclogo.PNG",
//         title: "Default College Image",
//       });
//     }

//     return content;
//   };

//   const carouselContent = getCarouselContent();

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + carouselContent.length) % carouselContent.length
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const isVideoUrl = (url) => {
//     return (
//       url &&
//       (url.includes("youtube.com") ||
//         url.includes("youtu.be") ||
//         url.includes("vimeo.com") ||
//         url.includes(".mp4"))
//     );
//   };

//   const getEmbedUrl = (url) => {
//     if (url.includes("youtube.com/watch?v=")) {
//       const videoId = url.split("v=")[1].split("&")[0];
//       return `https://www.youtube.com/embed/${videoId}`;
//     } else if (url.includes("youtu.be/")) {
//       const videoId = url.split("youtu.be/")[1].split("?")[0];
//       return `https://www.youtube.com/embed/${videoId}`;
//     } else if (url.includes("vimeo.com/")) {
//       const videoId = url.split("vimeo.com/")[1];
//       return `https://player.vimeo.com/video/${videoId}`;
//     }
//     return url;
//   };

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const formatAddress = (address) => {
//     if (!address) return "Location not available";
//     return `${address.city}, ${address.state}`;
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4 lg:p-8"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-gray-900 rounded-xs w-[90vw] h-[90vw] sm:w-[85vw] sm:h-[85vw] md:w-[75vw] md:h-[75vw] lg:w-[65vw] lg:h-[65vw] xl:w-[55vw] xl:h-[55vw] 2xl:w-[45vw] 2xl:h-[45vw] max-w-[600px] max-h-[600px] overflow-hidden relative shadow-2xl flex flex-col">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border border-yellow-400 bg-gradient-to-br from-black via-black to-black flex-shrink-0">
//           <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md lg:rounded-lg overflow-hidden flex-shrink-0 bg-gray-700">
//               <img
//                 src={college.gallery?.logoUrl || "/assets/cclogo.PNG"}
//                 alt={college.name}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = "/assets/cclogo.PNG";
//                 }}
//               />
//             </div>
//             <div className="min-w-0 flex-1">
//               <h2 className="text-sm sm:text-lg lg:text-xl font-bold text-white truncate">
//                 {college.name}
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-400 truncate">
//                 {formatAddress(college.address)}
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-md lg:rounded-lg transition-colors duration-200 flex-shrink-0 ml-2 sm:ml-4"
//             aria-label="Close modal"
//           >
//             <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white" />
//           </button>
//         </div>

//         {/* Carousel Content */}
//         <div className="relative bg-black flex-1 min-h-0">
//           <div className="w-full h-full aspect-square">
//             {carouselContent[currentSlide]?.type === "video" ? (
//               <div className="w-full h-full flex items-center justify-center relative">
//                 {isVideoUrl(carouselContent[currentSlide].url) ? (
//                   <iframe
//                     src={getEmbedUrl(carouselContent[currentSlide].url)}
//                     className="w-full h-full"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                     title={carouselContent[currentSlide].title}
//                   />
//                 ) : (
//                   <div className="flex flex-col items-center justify-center text-gray-400 space-y-2 sm:space-y-3">
//                     <Play className="w-12 h-12 sm:w-16 sm:h-16" />
//                     <span className="text-sm sm:text-lg">
//                       Video not available
//                     </span>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="relative w-full h-full">
//                 <img
//                   src={carouselContent[currentSlide]?.url}
//                   alt={carouselContent[currentSlide]?.title}
//                   className="w-full h-full object-cover"
//                   onError={(e) => {
//                     e.target.src = "/assets/cclogo.PNG";
//                   }}
//                 />
//                 <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
//                   <div className="bg-black/50 text-white px-2 py-1 rounded-md lg:rounded-lg text-xs sm:text-sm flex items-center space-x-1">
//                     <FileImage className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="hidden xs:inline">Image</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Navigation Arrows */}
//           {carouselContent.length > 1 && (
//             <>
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
//                 aria-label="Previous slide"
//               >
//                 <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
//               </button>
//               <button
//                 onClick={nextSlide}
//                 className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
//                 aria-label="Next slide"
//               >
//                 <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
//               </button>
//             </>
//           )}

//           {/* Slide Indicators */}
//           {carouselContent.length > 1 && (
//             <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 bg-black/50 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full">
//               {carouselContent.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
//                     currentSlide === index
//                       ? "bg-yellow-400 scale-110"
//                       : "bg-gray-500 hover:bg-gray-400"
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}

//           {/* Content Type Badge */}
//           <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
//             <div className="bg-black/50 text-white px-2 sm:px-3 py-1 rounded-md lg:rounded-lg text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 backdrop-blur-sm">
//               {carouselContent[currentSlide]?.type === "video" ? (
//                 <>
//                   <Play className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">Video</span>
//                 </>
//               ) : (
//                 <>
//                   <FileImage className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">Photo</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Modal Footer */}
//         <div className="p-3 sm:p-4 lg:p-6 border border-yellow-400 bg-gradient-to-br from-black via-black to-black flex-shrink-0">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
//             <div className="min-w-0 flex-1">
//               <h3 className="text-sm sm:text-lg font-semibold text-white mb-1 truncate">
//                 {carouselContent[currentSlide]?.title}
//               </h3>
//               <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-400">
//                 <span>
//                   {currentSlide + 1} of {carouselContent.length}
//                   {carouselContent.length === 1 ? " item" : " items"}
//                 </span>
//                 {college.type && (
//                   <>
//                     <span className="hidden xs:inline">•</span>
//                     <span>{college.type}</span>
//                   </>
//                 )}
//                 {college.establishedYear && (
//                   <>
//                     <span className="hidden xs:inline">•</span>
//                     <span>Est. {college.establishedYear}</span>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Thumbnail Navigation - Only show on larger screens */}
//             {carouselContent.length > 1 && carouselContent.length <= 5 && (
//               <div className="hidden md:flex items-center space-x-2 ml-0 sm:ml-4">
//                 {carouselContent.map((item, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToSlide(index)}
//                     className={`w-10 h-6 lg:w-12 lg:h-8 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
//                       currentSlide === index
//                         ? "border-yellow-400 scale-110"
//                         : "border-gray-600 hover:border-gray-500"
//                     }`}
//                   >
//                     {item.type === "video" ? (
//                       <div className="w-full h-full bg-gray-700 flex items-center justify-center">
//                         <Play className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" />
//                       </div>
//                     ) : (
//                       <img
//                         src={item.url}
//                         alt={item.title}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = "/assets/cclogo.PNG";
//                         }}
//                       />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Mobile Thumbnail Navigation - Show below content on mobile */}
//           {carouselContent.length > 1 && carouselContent.length <= 6 && (
//             <div className="flex md:hidden items-center justify-center space-x-2 mt-3 overflow-x-auto pb-1">
//               {carouselContent.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
//                     currentSlide === index
//                       ? "border-yellow-400 scale-110"
//                       : "border-gray-600 hover:border-gray-500"
//                   }`}
//                 >
//                   {item.type === "video" ? (
//                     <div className="w-full h-full bg-gray-700 flex items-center justify-center">
//                       <Play className="w-3 h-3 text-white" />
//                     </div>
//                   ) : (
//                     <img
//                       src={item.url}
//                       alt={item.title}
//                       className="w-full h-full object-cover"
//                       onError={(e) => {
//                         e.target.src = "/assets/cclogo.PNG";
//                       }}
//                     />
//                   )}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OverviewModal;




import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, FileImage, MapPin, Calendar, Building2 } from "lucide-react";

const OverviewModal = ({ college, isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Reset slide when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !college) return null;

  // Prepare carousel content
  const getCarouselContent = () => {
    const content = [];

    if (college.gallery?.videoUrl) {
      content.push({
        type: "video",
        url: college.gallery.videoUrl,
        title: "College Overview Video",
      });
    }

    if (college.gallery?.slideImages && Array.isArray(college.gallery.slideImages)) {
      college.gallery.slideImages.forEach((image, index) => {
        content.push({
          type: "image",
          url: image.url || image,
          title: image.title || `College Image ${index + 1}`,
        });
      });
    }

    if (college.gallery?.logoUrl) {
      content.push({
        type: "image",
        url: college.gallery.logoUrl,
        title: "College Logo",
      });
    }

    if (content.length === 0) {
      content.push({
        type: "image",
        url: "/assets/cclogo.PNG",
        title: "Default College Image",
      });
    }

    return content;
  };

  const carouselContent = getCarouselContent();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselContent.length) % carouselContent.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const isVideoUrl = (url) => {
    return url && (url.includes("youtube.com") || url.includes("youtu.be") ||
      url.includes("vimeo.com") || url.includes(".mp4"));
  };

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com/")) {
      const videoId = url.split("vimeo.com/")[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatAddress = (address) => {
    if (!address) return "Location not available";
    return `${address.city}, ${address.state}`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 lg:p-6"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-lg sm:rounded-xl lg:rounded-2xl w-full max-w-[95vw] sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden relative shadow-2xl flex flex-col border border-yellow-400/20">

        {/* Modal Header - Responsive */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-700 bg-gradient-to-br from-black via-black to-gray-900 flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 bg-gray-800 border-2 border-yellow-400/30">
              <img
                src={college.gallery?.logoUrl || "/assets/cclogo.PNG"}
                alt={college.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/cclogo.PNG";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base lg:text-xl font-bold text-white line-clamp-1 sm:line-clamp-2">
                {college.name}
              </h2>
              <div className="flex items-center space-x-1 mt-0.5 sm:mt-1">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-400 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                  {formatAddress(college.address)}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Carousel Content - Responsive Height */}
        <div className="relative bg-black flex-1 min-h-0">
          <div className="w-full h-full">
            {carouselContent[currentSlide]?.type === "video" ? (
              <div className="w-full h-full flex items-center justify-center">
                {isVideoUrl(carouselContent[currentSlide].url) ? (
                  <iframe
                    src={getEmbedUrl(carouselContent[currentSlide].url)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={carouselContent[currentSlide].title}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 space-y-2 sm:space-y-3 p-4">
                    <Play className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                    <span className="text-sm sm:text-base lg:text-lg">Video not available</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={carouselContent[currentSlide]?.url}
                  alt={carouselContent[currentSlide]?.title}
                  className="w-full h-full object-contain sm:object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/cclogo.PNG";
                  }}
                />
              </div>
            )}
          </div>

          {/* Navigation Arrows - Touch Friendly */}
          {carouselContent.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-3 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-manipulation"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-3 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 active:bg-black/90 text-white p-2 sm:p-2.5 lg:p-3 rounded-full transition-all duration-200 backdrop-blur-sm touch-manipulation"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>
            </>
          )}

          {/* Slide Indicators - Responsive */}
          {carouselContent.length > 1 && (
            <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-full">
              {carouselContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-200 touch-manipulation ${currentSlide === index
                    ? "bg-yellow-400 scale-110"
                    : "bg-gray-500 hover:bg-gray-400 active:bg-gray-300"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Content Type Badge - Responsive */}
          <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4">
            <div className="bg-black/60 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm flex items-center space-x-1 sm:space-x-1.5 backdrop-blur-sm">
              {carouselContent[currentSlide]?.type === "video" ? (
                <>
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  <span className="hidden xs:inline">Video</span>
                </>
              ) : (
                <>
                  <FileImage className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                  <span className="hidden xs:inline">Photo</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer - Responsive */}
        <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-700 bg-gradient-to-br from-black via-black to-gray-900 flex-shrink-0">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-1.5 line-clamp-1">
                {carouselContent[currentSlide]?.title}
              </h3>

              {/* Info Row - Responsive */}
              <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-400">
                <span className="flex items-center">
                  <FileImage className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                  {currentSlide + 1} / {carouselContent.length}
                </span>
                {college.type && (
                  <>
                    <span className="hidden xs:inline">•</span>
                    <span className="flex items-center">
                      <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                      {college.type}
                    </span>
                  </>
                )}
                {college.establishedYear && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                      Est. {college.establishedYear}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation - Responsive */}
          {carouselContent.length > 1 && carouselContent.length <= 6 && (
            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-3 sm:mt-4 overflow-x-auto pb-1">
              {carouselContent.map((item, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-12 h-8 sm:w-14 sm:h-9 lg:w-16 lg:h-10 rounded overflow-hidden border-2 transition-all duration-200 flex-shrink-0 touch-manipulation ${currentSlide === index
                    ? "border-yellow-400 scale-110 shadow-lg"
                    : "border-gray-600 hover:border-gray-500 active:border-gray-400"
                    }`}
                >
                  {item.type === "video" ? (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-white" />
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/cclogo.PNG";
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewModal;
