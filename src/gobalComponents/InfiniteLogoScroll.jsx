// const InfiniteLogoScroll = () => {
//     const brands = [
//         "Nike", "Apple", "Google", "Microsoft", "Amazon", "Meta", "Tesla", "Samsung",
//         "Coca-Cola", "McDonald's", "Disney", "Netflix", "Adobe", "Intel", "Oracle",
//         "IBM", "Sony", "LG", "Spotify", "Uber", "Airbnb", "PayPal", "Visa", "Mastercard"
//     ];

//     const colleges = [
//         "Harvard", "MIT", "Stanford", "Oxford", "Cambridge", "Yale", "Princeton", "Columbia",
//         "Berkeley", "Caltech", "Chicago", "NYU", "UCLA", "Duke", "Cornell",
//         "Brown", "Dartmouth", "Penn", "Johns Hopkins", "Georgetown", "Northwestern",
//         "Carnegie Mellon", "Rice", "Vanderbilt"
//     ];

//     const companies = [
//         "JPMorgan", "Goldman Sachs", "McKinsey", "Deloitte", "PwC", "EY", "KPMG", "Accenture",
//         "Bain & Company", "BCG", "Morgan Stanley", "BlackRock", "Berkshire Hathaway", "Walmart",
//         "Johnson & Johnson", "Procter & Gamble", "Pfizer", "Exxon Mobil", "Chevron", "AT&T",
//         "Verizon", "Comcast", "Ford", "General Motors"
//     ];

//     const LogoItem = ({ name, category }) => (
//         <div className="flex-shrink-0 mx-8 flex items-center justify-center">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 min-w-[160px] h-16 flex items-center justify-center border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:bg-white/15">
//                 <span className="text-white font-semibold text-sm text-center">{category}</span>
//             </div>
//         </div>
//     );

//     const ScrollingRow = ({ items, category, direction = "left", speed = "slow" }) => (
//         <div className="overflow-hidden py-4">
//             <div
//                 className={`flex items-center ${speed === "slow" ? "animate-scroll-slow" : speed === "medium" ? "animate-scroll-medium" : "animate-scroll-fast"} ${direction === "right" ? "animate-scroll-reverse" : ""}`}
//                 style={{
//                     width: `${items.length * 2 * 200}px`
//                 }}
//             >
//                 {/* First set */}
//                 {items.map((item, index) => (
//                     <LogoItem key={`${category}-1-${index}`} name={item} category={category} />
//                 ))}
//                 {/* Duplicate set for seamless loop */}
//                 {items.map((item, index) => (
//                     <LogoItem key={`${category}-2-${index}`} name={item} category={category} />
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <div className="bg-black py-16 overflow-hidden">
//             <div className="max-w-7xl mx-auto px-4">
//                 {/* Header */}
//                 <div className="text-center mb-12">
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                         Trusted by Leading <span className="text-yellow-400">Organizations</span>
//                     </h2>
//                     <p className="text-gray-400 text-lg">
//                         Join 60+ brands, colleges, and companies worldwide
//                     </p>
//                 </div>

//                 {/* Category Labels and Scrolling Rows */}
//                 <div className="space-y-8">
//                     {/* Brands Row */}
//                     <div>
//                         {/* <div className="flex items-center justify-center mb-4">
//               <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
//                 20+ BRANDS
//               </span>
//             </div> */}
//                         <ScrollingRow items={brands} category="brands" direction="left" speed="slow" />
//                     </div>

//                     {/* Colleges Row */}
//                     <div>
//                         {/* <div className="flex items-center justify-center mb-4">
//               <span className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                 20+ COLLEGES
//               </span>
//             </div> */}
//                         <ScrollingRow items={colleges} category="colleges" direction="right" speed="medium" />
//                     </div>

//                     {/* Companies Row */}
//                     <div>
//                         {/* <div className="flex items-center justify-center mb-4">
//               <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                 20+ COMPANIES
//               </span>
//             </div> */}
//                         <ScrollingRow items={companies} category="companies" direction="left" speed="fast" />
//                     </div>
//                 </div>

//                 {/* Bottom CTA */}
//                 <div className="text-center mt-16">
//                     <p className="text-gray-400 mb-6">
//                         Ready to join these industry leaders?
//                     </p>
//                     <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
//                         Get Started Today
//                     </button>
//                 </div>
//             </div>

//             <style jsx>{`
//         @keyframes scroll-left {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         @keyframes scroll-right {
//           0% {
//             transform: translateX(-50%);
//           }
//           100% {
//             transform: translateX(0);
//           }
//         }

//         .animate-scroll-slow {
//           animation: scroll-left 60s linear infinite;
//         }

//         .animate-scroll-medium {
//           animation: scroll-left 45s linear infinite;
//         }

//         .animate-scroll-fast {
//           animation: scroll-left 30s linear infinite;
//         }

//         .animate-scroll-reverse {
//           animation: scroll-right 45s linear infinite;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default InfiniteLogoScroll;



import React from 'react';
import NumberCounter from './NumberCounter';

// const InfiniteLogoScroll = () => {
//     const brands = [
//         "Nike", "Apple", "Google", "Microsoft", "Amazon", "Meta", "Tesla", "Samsung",
//         "Coca-Cola", "McDonald's", "Disney", "Netflix", "Adobe", "Intel", "Oracle",
//         "IBM", "Sony", "LG", "Spotify", "Uber", "Airbnb", "PayPal", "Visa", "Mastercard"
//     ];

//     const colleges = [
//         "Harvard", "MIT", "Stanford", "Oxford", "Cambridge", "Yale", "Princeton", "Columbia",
//         "Berkeley", "Caltech", "Chicago", "NYU", "UCLA", "Duke", "Cornell",
//         "Brown", "Dartmouth", "Penn", "Johns Hopkins", "Georgetown", "Northwestern",
//         "Carnegie Mellon", "Rice", "Vanderbilt"
//     ];

//     // const companies = [
//     //     "JPMorgan", "Goldman Sachs", "McKinsey", "Deloitte", "PwC", "EY", "KPMG", "Accenture",
//     //     "Bain & Company", "BCG", "Morgan Stanley", "BlackRock", "Berkshire Hathaway", "Walmart",
//     //     "Johnson & Johnson", "Procter & Gamble", "Pfizer", "Exxon Mobil", "Chevron", "AT&T",
//     //     "Verizon", "Comcast", "Ford", "General Motors"
//     // ];

//     const LogoItem = ({ name, category }) => (
//         <div className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8 flex items-center justify-center">
//             <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 min-w-[120px] sm:min-w-[140px] md:min-w-[160px] h-12 sm:h-14 md:h-16 flex items-center justify-center border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:bg-white/15">
//                 <span className="text-white font-semibold text-xs sm:text-sm text-center">{category}</span>
//             </div>
//         </div>
//     );

//     const ScrollingRow = ({ items, category, direction = "left", speed = "slow" }) => (
//         <div className="overflow-hidden py-2 sm:py-3 md:py-4">
//             <div
//                 className={`flex items-center ${speed === "slow" ? "animate-scroll-slow" : speed === "medium" ? "animate-scroll-medium" : "animate-scroll-fast"} ${direction === "right" ? "animate-scroll-reverse" : ""}`}
//                 style={{
//                     width: `${items.length * 2 * 180}px`
//                 }}
//             >
//                 {/* First set */}
//                 {items.map((item, index) => (
//                     <LogoItem key={`${category}-1-${index}`} name={item} category={category} />
//                 ))}
//                 {/* Duplicate set for seamless loop */}
//                 {items.map((item, index) => (
//                     <LogoItem key={`${category}-2-${index}`} name={item} category={category} />
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-black text-white">
//             {/* Hero Section */}


//             {/* Logo Scroll Section */}
//             <div className="py-8 sm:py-12 md:py-16 overflow-hidden">
//                 <div className="max-w-7xl mx-auto px-4">
//                     {/* Header */}
//                     <div className="text-center mb-8 sm:mb-10 md:mb-12">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
//                             Trusted by Leading <span className="text-yellow-400">Organizations</span>
//                         </h2>
//                         <p className="text-gray-400 text-base sm:text-lg">
//                             Join 60+ brands, colleges, and companies worldwide
//                         </p>
//                     </div>

//                     {/* Category Labels and Scrolling Rows */}
//                     <div className="space-y-4 sm:space-y-6 md:space-y-8">
//                         {/* Brands Row */}
//                         <ScrollingRow items={brands} category="brands" direction="left" speed="slow" />

//                         {/* Colleges Row */}
//                         <ScrollingRow items={colleges} category="colleges" direction="right" speed="medium" />

//                         {/* Companies Row */}
//                         <ScrollingRow items={companies} category="companies" direction="left" speed="fast" />
//                     </div>

//                     {/* Bottom CTA */}
//                     <div className="text-center mt-8 sm:mt-12 md:mt-16">
//                         <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
//                             Ready to join these industry leaders?
//                         </p>
//                         <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
//                             Get Started Today
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="relative overflow-hidden">
//                 {/* Geometric background pattern */}
//                 <div className="absolute inset-0">
//                     <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800">
//                         {/* Network pattern */}
//                         <defs>
//                             <pattern id="network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//                                 <circle cx="50" cy="50" r="1" fill="white" opacity="0.3" />
//                                 <circle cx="0" cy="0" r="1" fill="white" opacity="0.2" />
//                                 <circle cx="100" cy="0" r="1" fill="white" opacity="0.2" />
//                                 <circle cx="0" cy="100" r="1" fill="white" opacity="0.2" />
//                                 <circle cx="100" cy="100" r="1" fill="white" opacity="0.2" />
//                                 <line x1="50" y1="50" x2="0" y2="0" stroke="white" strokeWidth="0.5" opacity="0.1" />
//                                 <line x1="50" y1="50" x2="100" y2="0" stroke="white" strokeWidth="0.5" opacity="0.1" />
//                                 <line x1="50" y1="50" x2="0" y2="100" stroke="white" strokeWidth="0.5" opacity="0.1" />
//                                 <line x1="50" y1="50" x2="100" y2="100" stroke="white" strokeWidth="0.5" opacity="0.1" />
//                             </pattern>
//                         </defs>
//                         <rect width="100%" height="100%" fill="url(#network)" />
//                     </svg>
//                 </div>

//                 <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
//                     {/* Stats cards */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-xs sm:max-w-2xl lg:max-w-5xl w-full">
//                         {/* Rated 4.5/5 Card */}
//                         <div className="group bg-black-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
//                             <div className="mb-4 sm:mb-6 flex justify-center">
//                                 <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
//                                     <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
//                                         <span className="text-black font-bold text-xs sm:text-sm md:text-base">CC</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white group-hover:text-yellow-400 transition-colors">
//                                 <NumberCounter targetNumber={20} />+
//                             </div>
//                             <div className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
//                                 <p>Brands</p>
//                             </div>
//                         </div>

//                         {/* 400+ Success Stories Card */}
//                         <div className="group bg-black-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
//                             <div className="mb-4 sm:mb-6 flex justify-center">
//                                 <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
//                                     <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
//                                         <span className="text-black font-bold text-xs sm:text-sm md:text-base">CC</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white group-hover:text-blue-400 transition-colors">
//                                 <NumberCounter targetNumber={20} />+
//                             </div>
//                             <div className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
//                                 <p>Companies</p>
//                             </div>
//                         </div>

//                         {/* 10L+ Community Card */}
//                         <div className="group bg-black-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-center hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105 sm:col-span-2 lg:col-span-1">
//                             <div className="mb-4 sm:mb-6 flex justify-center">
//                                 <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
//                                     <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
//                                         <span className="text-black font-bold text-xs sm:text-sm md:text-base">CC</span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white group-hover:text-green-400 transition-colors">
//                                 <NumberCounter targetNumber={20} />+
//                             </div>
//                             <div className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
//                                 <p>Colleges</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Floating elements for added visual interest */}
//                     <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-1 h-1 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                     <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse delay-1000"></div>
//                     <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-500 rounded-full animate-pulse delay-2000"></div>
//                     <div className="absolute bottom-20 sm:bottom-40 right-5 sm:right-10 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse delay-3000"></div>
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes scroll-left {
//                     0% {
//                         transform: translateX(0);
//                     }
//                     100% {
//                         transform: translateX(-50%);
//                     }
//                 }

//                 @keyframes scroll-right {
//                     0% {
//                         transform: translateX(-50%);
//                     }
//                     100% {
//                         transform: translateX(0);
//                     }
//                 }

//                 .animate-scroll-slow {
//                     animation: scroll-left 60s linear infinite;
//                 }

//                 .animate-scroll-medium {
//                     animation: scroll-left 45s linear infinite;
//                 }

//                 .animate-scroll-fast {
//                     animation: scroll-left 30s linear infinite;
//                 }

//                 .animate-scroll-reverse {
//                     animation: scroll-right 45s linear infinite;
//                 }
//             `}</style>
//         </div>
//     );
// };

const InfiniteLogoScroll = () => {
    const brands = [
        { name: "Masai", logo: "/assets/Masai.webp" },
        { name: "Intellipaat", logo: "/assets/intellipaat.png" },
        { name: "Nxtwave", logo: "/assets/nextwave.webp" },
        { name: "Scaler", logo: "/assets/Scaler.avif" },
        { name: "GeeksforGeeks", logo: "/assets/GeeksforGeeks.jpeg" },
        { name: "Guvi", logo: "/assets/Guvi.jpg" },
        { name: "Physics Wallah", logo: "/assets/PhysicsWallah.png" },
        { name: "Man Matters", logo: "/assets/ManMatters.jpg" },
        { name: "Naresh IT", logo: "/assets/NareshIT.webp" },
        { name: "Bajaj Finserv", logo: "/assets/BajajFinserv.png" },
        { name: "Swiggy", logo: "/assets/Swiggy.jpeg" },
    ];

    const colleges = [
        { name: "Newton School", logo: "/assets/NewtonSchool.jpg" },
        { name: "Scaler School", logo: "/assets/ScalerSchool.png" },
        { name: "NIAT", logo: "/assets/NxtWave_Institute.jpg" },
        { name: "Polarise School", logo: "/assets/PolariseSchool.webp" },
        { name: "Vedam School", logo: "/assets/VedamSchool.webp" },
        { name: "Amity University", logo: "/assets/amity-university.jpg" },
        { name: "Apollo University", logo: "/assets/ApolloUniversity.png" },
        { name: "Mirai School", logo: "/assets/miraischool.jpg" },
    ];



    const LogoItem = ({ item }) => (
        <div
            className="flex-shrink-0 mx-2 sm:mx-4 md:mx-6 lg:mx-8 w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 rounded-md border border-white/20 hover:border-yellow-400/50 transition-all duration-300"
            style={{
                backgroundImage: `url(${item.logo})`,
                backgroundSize: "cover", // Fill entire container
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        />
    );
    const ScrollingRow = ({ items, direction = "left", speed = "slow" }) => (
        <div className="overflow-hidden py-2 sm:py-3 md:py-4">
            <div
                className={`flex items-center ${speed === "slow" ? "animate-scroll-slow" : speed === "medium" ? "animate-scroll-medium" : "animate-scroll-fast"} ${direction === "right" ? "animate-scroll-reverse" : ""}`}
                style={{ width: `${items.length * 2 * 180}px` }}
            >
                {items.map((item, index) => <LogoItem key={`1-${index}`} item={item} />)}
                {items.map((item, index) => <LogoItem key={`2-${index}`} item={item} />)}
            </div>
        </div>
    );

    return (
        <div className=" bg-black text-white">
            <div className="py-8 sm:py-12 md:py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
                            Trusted by Leading <span className="text-yellow-400">Organizations</span>
                        </h2>
                        <p className="text-gray-400 text-base sm:text-lg">Join top brands and colleges worldwide</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6 md:space-y-8">
                        <ScrollingRow items={brands} direction="left" speed="slow" />
                        <ScrollingRow items={colleges} direction="right" speed="medium" />
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

        .animate-scroll-slow { animation: scroll-left 60s linear infinite; }
        .animate-scroll-medium { animation: scroll-left 45s linear infinite; }
        .animate-scroll-fast { animation: scroll-left 30s linear infinite; }
        .animate-scroll-reverse { animation: scroll-right 45s linear infinite; }
      `}</style>
        </div>
    );
};



export default InfiniteLogoScroll;