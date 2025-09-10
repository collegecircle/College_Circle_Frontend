// import React, { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const names = ["Join College", "Get Guidance", "Skill Courses", "Find Internships", "Campus Life", "Choose College"];

// // AnimatedBeam Component
// const AnimatedBeam = ({
//     className = "",
//     containerRef,
//     fromRef,
//     toRef,
//     curvature = 0,
//     reverse = false,
//     duration = Math.random() * 3 + 4,
//     delay = 0,
//     pathColor = "rgba(255,255,255,0.1)",
//     pathWidth = 2,
//     pathOpacity = 0.2,
//     gradientStartColor = "#ff80e1",
//     gradientStopColor = "#9c40ff",
//     startXOffset = 0,
//     startYOffset = 0,
//     endXOffset = 0,
//     endYOffset = 0,
// }) => {
//     const id = React.useId();
//     const [pathD, setPathD] = React.useState("");
//     const [svgDimensions, setSvgDimensions] = React.useState({
//         width: 0,
//         height: 0,
//     });

//     const gradientCoordinates = reverse
//         ? {
//             x1: ["90%", "-10%"],
//             x2: ["100%", "0%"],
//             y1: ["0%", "0%"],
//             y2: ["0%", "0%"],
//         }
//         : {
//             x1: ["10%", "110%"],
//             x2: ["0%", "100%"],
//             y1: ["0%", "0%"],
//             y2: ["0%", "0%"],
//         };

//     React.useEffect(() => {
//         const updatePath = () => {
//             if (containerRef.current && fromRef.current && toRef.current) {
//                 const containerRect = containerRef.current.getBoundingClientRect();
//                 const rectA = fromRef.current.getBoundingClientRect();
//                 const rectB = toRef.current.getBoundingClientRect();

//                 setSvgDimensions({
//                     width: containerRect.width,
//                     height: containerRect.height,
//                 });

//                 const startX =
//                     rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
//                 const startY =
//                     rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
//                 const endX =
//                     rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
//                 const endY =
//                     rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

//                 const controlY = startY - curvature;
//                 setPathD(
//                     `M ${startX},${startY} Q ${(startX + endX) / 2
//                     },${controlY} ${endX},${endY}`
//                 );
//             }
//         };

//         const resizeObserver = new ResizeObserver(() => {
//             updatePath();
//         });

//         if (containerRef.current) {
//             resizeObserver.observe(containerRef.current);
//         }

//         updatePath();
//         return () => resizeObserver.disconnect();
//     }, [
//         containerRef,
//         fromRef,
//         toRef,
//         curvature,
//         startXOffset,
//         startYOffset,
//         endXOffset,
//         endYOffset,
//     ]);

//     return (
//         <svg
//             fill="none"
//             width={svgDimensions.width}
//             height={svgDimensions.height}
//             xmlns="http://www.w3.org/2000/svg"
//             className={`pointer-events-none absolute left-0 top-0 transform-gpu stroke-2 ${className}`}
//             viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
//         >
//             <path
//                 d={pathD}
//                 stroke={pathColor}
//                 strokeWidth={pathWidth}
//                 strokeOpacity={pathOpacity}
//                 strokeLinecap="round"
//             />
//             <path
//                 d={pathD}
//                 strokeWidth={pathWidth}
//                 stroke={`url(#${id})`}
//                 strokeOpacity="1"
//                 strokeLinecap="round"
//             />
//             <defs>
//                 <motion.linearGradient
//                     className="transform-gpu"
//                     id={id}
//                     gradientUnits="userSpaceOnUse"
//                     initial={{
//                         x1: "0%",
//                         x2: "0%",
//                         y1: "0%",
//                         y2: "0%",
//                     }}
//                     animate={{
//                         x1: gradientCoordinates.x1,
//                         x2: gradientCoordinates.x2,
//                         y1: gradientCoordinates.y1,
//                         y2: gradientCoordinates.y2,
//                     }}
//                     transition={{
//                         delay,
//                         duration,
//                         ease: [0.16, 1, 0.3, 1],
//                         repeat: Infinity,
//                         repeatDelay: 0,
//                     }}
//                 >
//                     <stop stopColor={gradientStartColor} stopOpacity="0" />
//                     <stop stopColor={gradientStartColor} />
//                     <stop offset="32.5%" stopColor={gradientStopColor} />
//                     <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
//                 </motion.linearGradient>
//             </defs>
//         </svg>
//     );
// };

// const CircularBeamDemo = () => {
//     const containerRef = useRef(null);
//     const centerRef = useRef(null);
//     const [windowSize, setWindowSize] = useState({
//         width: typeof window !== 'undefined' ? window.innerWidth : 0,
//         height: typeof window !== 'undefined' ? window.innerHeight : 0,
//     });

//     // Handle window resize
//     useEffect(() => {
//         const handleResize = () => {
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Create array of refs
//     const pointRefs = React.useMemo(
//         () => Array(12).fill(null).map(() => React.createRef()),
//         []
//     );

//     // Calculate radius based on screen size - INCREASED for more spacing
//     const getRadius = () => {
//         const minDimension = Math.min(windowSize.width, windowSize.height);
//         if (minDimension < 768) return 37; // Increased from 37
//         if (minDimension < 1024) return 45; // Increased from 40
//         return 48; // Increased from 42
//     };

//     const getPointPosition = (index, total = 5) => {
//         const angle = (index * (360 / total) - 90) * (Math.PI / 180);
//         const radius = getRadius();
//         return {
//             left: `${50 + radius * Math.cos(angle)}%`,
//             top: `${50 + radius * Math.sin(angle)}%`,
//         };
//     };

//     // INCREASED circle sizes
//     const getPointSize = () => {
//         if (windowSize.width < 640) return 'w-20 h-7 text-xs'; // Increased from w-10 h-10
//         if (windowSize.width < 768) return 'w-30 h-8 text-xs'; // Increased from w-12 h-12
//         if (windowSize.width < 1024) return 'w-40 h-10 text-base'; // Increased from w-14 h-14
//         return 'w-44 h-10 text-lg'; // Increased from w-16 h-16
//     };

//     const getPointColor = (index) => {
//         const colorPalette = [
//             '#4f46e5', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316',
//             '#facc15', '#a3e635', '#10b981', '#06b6d4', '#3b82f6', '#6366f1'
//         ];
//         return colorPalette[index % colorPalette.length];
//     };

//     // Pre-calculate positions and colors
//     const points = Array(12)
//         .fill(null)
//         .map((_, index) => ({
//             position: getPointPosition(index),
//             color: getPointColor(index),
//             name: names[index % names.length],
//         }));

//     return (
//         <div className="w-full h-screen overflow-hidden">
//             <div
//                 ref={containerRef}
//                 className="relative w-full h-full rounded-xl  p-4 overflow-hidden"
//             >
//                 {/* Background ambient effects */}
//                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.5)_0%,rgba(15,23,42,0)_50%)]"></div>

//                 {/* Subtle star-like dots in background */}
//                 {Array(50).fill(null).map((_, i) => (
//                     <div
//                         key={`star-${i}`}
//                         className="absolute rounded-full bg-white"
//                         style={{
//                             width: `${Math.random() * 2 + 1}px`,
//                             height: `${Math.random() * 2 + 1}px`,
//                             top: `${Math.random() * 100}%`,
//                             left: `${Math.random() * 100}%`,
//                             opacity: Math.random() * 0.5 + 0.2,
//                             animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
//                         }}
//                     />
//                 ))}

//                 {/* Central element - perfectly centered */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <motion.div
//                         ref={centerRef}
//                         className="w-full max-w-3xl px-6 text-center"
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.8, ease: "easeOut" }}
//                     >
//                         <motion.h1
//                             className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 mb-3 tracking-wider"
//                             initial={{ y: 20 }}
//                             animate={{ y: 0 }}
//                             transition={{ duration: 0.6 }}
//                         >
//                             COLLEGE CIRCLE
//                         </motion.h1>
//                         <motion.p
//                             className="text-lg sm:text-xl text-gray-300 mb-1 font-medium"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.6, delay: 0.2 }}
//                         >
//                             8,00,000+ STUDENT COMMUNITY
//                         </motion.p>
//                         <motion.p
//                             className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8"
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.6, delay: 0.3 }}
//                         >
//                             ACROSS SOCIAL MEDIA PLATFORMS
//                         </motion.p>
//                         <motion.button
//                             className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-lg sm:text-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.98 }}
//                             initial={{ y: 20, opacity: 0 }}
//                             animate={{ y: 0, opacity: 1 }}
//                             transition={{ duration: 0.6, delay: 0.4 }}
//                         >
//                             JOIN CIRCLE
//                         </motion.button>
//                     </motion.div>
//                 </div>

//                 {/* Decorative center rings - INCREASED sizes */}
//                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-yellow-400/30 opacity-70"></div>
//                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border border-gray-500/20 opacity-60"></div>
//                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-gray-600/10 opacity-50"></div>

//                 {/* Outer Points with improved styling and INCREASED sizes */}
//                 {points.map((point, index) => (
//                     <motion.div
//                         key={index}
//                         ref={pointRefs[index]}
//                         style={{
//                             ...point.position,
//                         }}
//                         className={`absolute ${getPointSize()} -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-center font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer`}
//                         initial={{ opacity: 0, scale: 0 }}
//                         animate={{
//                             opacity: 1,
//                             scale: 1,
//                             background: `linear-gradient(135deg, ${point.color}, ${point.color}cc)`,
//                         }}
//                         transition={{
//                             duration: 0.5,
//                             delay: index * 0.1,
//                             ease: "backOut"
//                         }}
//                         whileHover={{
//                             boxShadow: `0 0 25px ${point.color}80`,
//                             scale: 1.1
//                         }}
//                     >
//                         <span className="px-2 text-white drop-shadow-md">
//                             {point.name}
//                         </span>
//                     </motion.div>
//                 ))}

//                 {/* Animated Beams - adjusted for better center alignment */}
//                 {points.map((point, index) => (
//                     <AnimatedBeam
//                         key={index}
//                         containerRef={containerRef}
//                         fromRef={pointRefs[index]}
//                         toRef={centerRef}
//                         curvature={windowSize.width < 768 ? 20 : 30}
//                         gradientStartColor={point.color}
//                         gradientStopColor="rgba(255,255,255,0.8)"
//                         duration={4 + Math.random() * 3}
//                         delay={index * 0.2}
//                         reverse={index % 2 === 0}
//                         pathWidth={windowSize.width < 768 ? 2 : 3}
//                     />
//                 ))}
//             </div>

//             {/* CSS for twinkling stars */}
//             <style jsx>{`
//         @keyframes twinkle {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.7; }
//         }
//       `}</style>
//         </div>
//     );
// };

// export default CircularBeamDemo;



import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const names = ["Join College", "Get Guidance", "Skill Courses", "Find Internships", "Campus Life", "Choose College"];

// AnimatedBeam Component
const AnimatedBeam = ({
    className = "",
    containerRef,
    fromRef,
    toRef,
    curvature = 0,
    reverse = false,
    duration = Math.random() * 3 + 4,
    delay = 0,
    pathColor = "rgba(255,255,255,0.1)",
    pathWidth = 2,
    pathOpacity = 0.2,
    gradientStartColor = "#ff80e1",
    gradientStopColor = "#9c40ff",
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
}) => {
    const id = React.useId();
    const [pathD, setPathD] = React.useState("");
    const [svgDimensions, setSvgDimensions] = React.useState({
        width: 0,
        height: 0,
    });

    const gradientCoordinates = reverse
        ? {
            x1: ["90%", "-10%"],
            x2: ["100%", "0%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
        }
        : {
            x1: ["10%", "110%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
        };

    React.useEffect(() => {
        const updatePath = () => {
            if (containerRef.current && fromRef.current && toRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const rectA = fromRef.current.getBoundingClientRect();
                const rectB = toRef.current.getBoundingClientRect();

                setSvgDimensions({
                    width: containerRect.width,
                    height: containerRect.height,
                });

                const startX =
                    rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
                const startY =
                    rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
                const endX =
                    rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
                const endY =
                    rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

                const controlY = startY - curvature;
                setPathD(
                    `M ${startX},${startY} Q ${(startX + endX) / 2
                    },${controlY} ${endX},${endY}`
                );
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            updatePath();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        updatePath();
        return () => resizeObserver.disconnect();
    }, [
        containerRef,
        fromRef,
        toRef,
        curvature,
        startXOffset,
        startYOffset,
        endXOffset,
        endYOffset,
    ]);

    return (
        <svg
            fill="none"
            width={svgDimensions.width}
            height={svgDimensions.height}
            xmlns="http://www.w3.org/2000/svg"
            className={`pointer-events-none absolute left-0 top-0 transform-gpu stroke-2 ${className}`}
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        >
            <path
                d={pathD}
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
                strokeLinecap="round"
            />
            <path
                d={pathD}
                strokeWidth={pathWidth}
                stroke={`url(#${id})`}
                strokeOpacity="1"
                strokeLinecap="round"
            />
            <defs>
                <motion.linearGradient
                    className="transform-gpu"
                    id={id}
                    gradientUnits="userSpaceOnUse"
                    initial={{
                        x1: "0%",
                        x2: "0%",
                        y1: "0%",
                        y2: "0%",
                    }}
                    animate={{
                        x1: gradientCoordinates.x1,
                        x2: gradientCoordinates.x2,
                        y1: gradientCoordinates.y1,
                        y2: gradientCoordinates.y2,
                    }}
                    transition={{
                        delay,
                        duration,
                        ease: [0.16, 1, 0.3, 1],
                        repeat: Infinity,
                        repeatDelay: 0,
                    }}
                >
                    <stop stopColor={gradientStartColor} stopOpacity="0" />
                    <stop stopColor={gradientStartColor} />
                    <stop offset="32.5%" stopColor={gradientStopColor} />
                    <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
                </motion.linearGradient>
            </defs>
        </svg>
    );
};

const CircularBeamDemo = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const centerRef = useRef(null);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 768,
        height: typeof window !== 'undefined' ? window.innerHeight : 1024,
    });
    const [isMounted, setIsMounted] = useState(false);

    // Handle window resize and initial mount
    useEffect(() => {
        setIsMounted(true);

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Create array of refs
    const pointRefs = React.useMemo(
        () => Array(6).fill(null).map(() => React.createRef()),
        []
    );

    // Calculate radius based on screen size - Fully responsive
    const getRadius = () => {
        const minDimension = Math.min(windowSize.width, windowSize.height);
        // Extra small phones (320px-374px)
        if (minDimension <= 374) return 28;
        // Small phones (375px-413px)
        if (minDimension <= 413) return 32;
        // Large phones/small tablets (414px-767px)
        if (minDimension <= 767) return 36;
        // Tablets (768px-1023px)
        if (minDimension <= 1023) return 42;
        // Small desktop (1024px-1279px)
        if (minDimension <= 1279) return 46;
        // Large desktop (1280px+)
        return 50;
    };

    const getPointPosition = (index, total = 6) => {
        const angle = (index * (360 / total) - 90) * (Math.PI / 180);
        const radius = getRadius();
        return {
            left: `${50 + radius * Math.cos(angle)}%`,
            top: `${50 + radius * Math.sin(angle)}%`,
        };
    };

    // Fully responsive point sizes and text
    const getPointClasses = () => {
        const width = windowSize.width;
        // Extra small phones
        if (width <= 320) return {
            size: 'w-16 h-6',
            text: 'text-xs',
            padding: 'px-1'
        };
        // Small phones
        if (width <= 374) return {
            size: 'w-18 h-8',
            text: 'text-xs',
            padding: 'px-5'
        };
        // Medium phones
        if (width <= 413) return {
            size: 'w-20 h-8',
            text: 'text-xs',
            padding: 'px-2'
        };
        // Large phones
        if (width <= 640) return {
            size: 'w-24 h-9',
            text: 'text-sm',
            padding: 'px-2'
        };
        // Small tablets
        if (width <= 768) return {
            size: 'w-28 h-10',
            text: 'text-sm',
            padding: 'px-2'
        };
        // Tablets
        if (width <= 1024) return {
            size: 'w-32 h-11',
            text: 'text-base',
            padding: 'px-3'
        };
        // Small desktop
        if (width <= 1280) return {
            size: 'w-36 h-12',
            text: 'text-base',
            padding: 'px-3'
        };
        // Large desktop
        return {
            size: 'w-40 h-12',
            text: 'text-lg',
            padding: 'px-4'
        };
    };

    // Responsive center rings
    const getCenterRingSizes = () => {
        const minDimension = Math.min(windowSize.width, windowSize.height);
        if (minDimension <= 374) return {
            inner: 'w-20 h-20',
            middle: 'w-32 h-32',
            outer: 'w-44 h-44'
        };
        if (minDimension <= 640) return {
            inner: 'w-24 h-24',
            middle: 'w-40 h-40',
            outer: 'w-56 h-56'
        };
        if (minDimension <= 768) return {
            inner: 'w-32 h-32',
            middle: 'w-48 h-48',
            outer: 'w-64 h-64'
        };
        if (minDimension <= 1024) return {
            inner: 'w-40 h-40',
            middle: 'w-60 h-60',
            outer: 'w-80 h-80'
        };
        return {
            inner: 'w-48 h-48',
            middle: 'w-72 h-72',
            outer: 'w-96 h-96'
        };
    };

    // Responsive curvature and beam width
    const getBeamSettings = () => {
        const width = windowSize.width;
        if (width <= 374) return { curvature: 15, pathWidth: 1.5 };
        if (width <= 640) return { curvature: 20, pathWidth: 2 };
        if (width <= 1024) return { curvature: 25, pathWidth: 2.5 };
        return { curvature: 30, pathWidth: 3 };
    };

    const getPointColor = (index) => {
        const colorPalette = [
            // '#4f46e5', '#8b5cf6', '#d946ef', '#ec4899', '#f43f5e', '#f97316'
            //different yellows ligth
            // '#fbbf24', '#f1b200', '#ffffff', '#f1b200', '#ffffff'


            // '#f1b200'
        ];
        return colorPalette[index % colorPalette.length];
    };

    // Pre-calculate positions and colors
    const points = Array(6)
        .fill(null)
        .map((_, index) => ({
            position: getPointPosition(index),
            color: getPointColor(index),
            name: names[index % names.length].toLocaleUpperCase(),
        }));

    const pointClasses = getPointClasses();
    const ringSizes = getCenterRingSizes();
    const beamSettings = getBeamSettings();

    // Don't render until mounted to avoid hydration issues
    if (!isMounted) {
        return <div className="w-full h-screen bg-slate-1900"></div>;
    }

    return (
        <div className="w-full h-screen overflow-hidden bg-slate-1900">
            <div
                ref={containerRef}
                className="relative w-full h-full p-2 sm:p-4 overflow-hidden"
            >
                {/* Background ambient effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0, 0, 0, 0.5)_0%,rgba(15,23,42,0)_50%)]"></div>

                {/* Responsive star field */}
                {Array(windowSize.width <= 640 ? 30 : 50).fill(null).map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2,
                            animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`
                        }}
                    />
                ))}

                {/* Central element - fully responsive */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        ref={centerRef}
                        className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl px-3 sm:px-4 md:px-6 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <motion.h1
                            className="text-xl xs:text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 mb-2 sm:mb-3 tracking-wide sm:tracking-wider leading-tight"
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            COLLEGE CIRCLE
                        </motion.h1>

                        <motion.p
                            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-1 sm:mb-2 font-medium leading-relaxed"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            8,00,000+ STUDENT COMMUNITY
                        </motion.p>

                        <motion.p
                            className="text-xs xs:text-xs sm:text-xs md:text-base lg:text-lg text-gray-400 mb-3 sm:mb-4 md:mb-6 lg:mb-8 leading-relaxed"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            ACROSS SOCIAL MEDIA PLATFORMS
                        </motion.p>

                        <motion.button
                            type="button"
                            onClick={() => navigate("/userlogin")}
                            onTap={() => navigate("/userlogin")}
                            className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-black px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 py-2 xs:py-2.5 sm:py-3 md:py-3.5 lg:py-3 rounded-full font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/20 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 active:scale-95 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            JOIN CIRCLE
                        </motion.button>

                    </motion.div>
                </div>

                {/* Responsive decorative center rings */}
                {/* <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${ringSizes.inner} rounded-full border-2 border-yellow-400/30 opacity-70`}></div> */}
                {/* <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${ringSizes.middle} rounded-full border border-gray-500/20 opacity-60`}></div> */}
                {/* <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${ringSizes.outer} rounded-full border border-gray-600/10 opacity-50`}></div> */}

                {/* Outer Points with fully responsive styling */}
                {points.map((point, index) => (
                    <motion.div
                        key={index}
                        ref={pointRefs[index]}
                        style={{
                            ...point.position,
                        }}
                        className={`absolute ${pointClasses.size} -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-center font-medium shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            background: `linear-gradient(135deg, ${point.color}, ${point.color}cc)`,
                        }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: "backOut"
                        }}
                        whileHover={{
                            boxShadow: `0 0 25px ${point.color}80`,
                            scale: 1.1
                        }}
                    >
                        <span className={`${pointClasses.padding} ${pointClasses.text} text-white drop-shadow-md font-medium`}>
                            {point.name}
                        </span>
                    </motion.div>
                ))}

                {/* Animated Beams with responsive settings */}
                {points.map((point, index) => (
                    <AnimatedBeam
                        key={index}
                        containerRef={containerRef}
                        fromRef={pointRefs[index]}
                        toRef={centerRef}
                        curvature={beamSettings.curvature}
                        gradientStartColor={point.color}
                        gradientStopColor="rgba(255,255,255,0.8)"
                        duration={4 + Math.random() * 3}
                        delay={index * 0.2}
                        reverse={index % 2 === 0}
                        pathWidth={beamSettings.pathWidth}
                    />
                ))}
            </div>

            {/* CSS for twinkling stars */}
            <style jsx>{`
                @keyframes twinkle {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};

export default CircularBeamDemo;
