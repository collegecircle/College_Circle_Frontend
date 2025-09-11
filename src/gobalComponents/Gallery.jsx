

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "motion/react";
import { ContainerTextFlip } from "./ContainerTextFlip";

// // Default images
// const IMGS = [
//   "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// const RollingGallery = ({
//   autoplay = false,
//   pauseOnHover = false,
//   images = [],
// }) => {
//   images = images.length > 0 ? images : IMGS;

//   const [isScreenSizeSm, setIsScreenSizeSm] = useState(
//     window.innerWidth <= 640
//   );
//   useEffect(() => {
//     const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
//   const faceCount = images.length;
//   const faceWidth = (cylinderWidth / faceCount) * 1.5;
//   const radius = cylinderWidth / (1.5 * Math.PI);
//   const dragFactor = 0.05;
//   const rotation = useMotionValue(0);
//   const controls = useAnimation();

//   const transform = useTransform(
//     rotation,
//     (val) => `rotate3d(0,1,0,${val}deg)`
//   );

//   const startInfiniteSpin = (startAngle) => {
//     controls.start({
//       rotateY: [startAngle, startAngle - 360],
//       transition: {
//         duration: 20,
//         ease: "linear",
//         repeat: Infinity,
//       },
//     });
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     } else {
//       controls.stop();
//     }
//   }, [autoplay]);

//   const handleUpdate = (latest) => {
//     if (typeof latest.rotateY === "number") {
//       rotation.set(latest.rotateY);
//     }
//   };

//   const handleDrag = (_, info) => {
//     controls.stop();
//     rotation.set(rotation.get() + info.offset.x * dragFactor);
//   };

//   const handleDragEnd = (_, info) => {
//     const finalAngle = rotation.get() + info.velocity.x * dragFactor;
//     rotation.set(finalAngle);

//     if (autoplay) {
//       startInfiniteSpin(finalAngle);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (autoplay && pauseOnHover) {
//       controls.stop();
//     }
//   };

//   const handleMouseLeave = () => {
//     if (autoplay && pauseOnHover) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     }
//   };

//   return (
//     <div className="relative h-[500px] w-full overflow-hidden bg-black">
//       <div className="absolute top-6 left-0 right-0 w-fit h-fit m-auto text-center z-20">
//         <h1 className="text-3xl md:text-4xl font-bold text-white">
//           The Art of{" "}
//           <span
//             className="bg-[#ffd6] rounded border border-[#000000aa] px-3 inline-block relative"
//           >
//             Moments
//             {/* <img
//               src="/line-crown.png"
//               alt="crown"
//               className="absolute -top-4 left-1/2 -translate-x-1/2 h-6 w-auto"
//             /> */}
//           </span>
//         </h1>
//         {/* <h3 className="mt-3 py-4 text-base md:text-lg leading-[22px] text-gray-400 font-medium">
//           A dedicated group shaping excellence with precision and creativity
//         </h3> */}
//       </div>


//       {/* Left Gradient Overlay with Rotating Text */}
//       <div
//         className="absolute top-0 left-0 h-full w-[200px] sm:w-[250px] z-10 flex items-center justify-center"
//         style={{
//           background:
//             "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
//         }}
//       >
//         <div className="transform -rotate-90">
//           <ContainerTextFlip
//             words={[
//               "Stunning Gallery",
//               "Amazing Photos",
//               "Beautiful Moments",
//               "Perfect Shots",
//             ]}
//             interval={4000}
//             className="text-2xl sm:text-3xl font-bold text-white
//           bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-500
//           dark:from-yellow-400 dark:via-amber-500 dark:to-orange-600
//           px-4 py-2 shadow-lg"
//             textClassName="text-white whitespace-nowrap"
//             animationDuration={800}
//           />
//         </div>
//       </div>

//       {/* Right Gradient Overlay with Paragraph */}
//       <div
//         className="absolute top-0 right-0 h-full w-[200px] sm:w-[250px] z-10 flex items-center justify-center"
//         style={{
//           background:
//             "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
//         }}
//       >
//         <p className="text-base sm:text-lg text-gray-300 transform rotate-90 whitespace-nowrap">
//           Curated breathtaking images
//         </p>
//       </div>

//       {/* 3D Gallery */}
//       <div className="flex h-full items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
//         <motion.div
//           drag="x"
//           dragElastic={0}
//           onDrag={handleDrag}
//           onDragEnd={handleDragEnd}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           animate={controls}
//           onUpdate={handleUpdate}
//           style={{
//             transform: transform,
//             rotateY: rotation,
//             width: cylinderWidth,
//             transformStyle: "preserve-3d",
//           }}
//           className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
//         >
//           {images.map((url, i) => (
//             <div
//               key={i}
//               className="group absolute flex h-fit items-center justify-center p-[4%] [backface-visibility:hidden] md:p-[3%]"
//               style={{
//                 width: `${faceWidth}px`,
//                 transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
//               }}
//             >
//               <div className="relative w-full h-[180px] sm:h-[150px] md:h-[220px] bg-white rounded-lg shadow-xl border-[2px] border-white-500 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105">
//                 <img
//                   src={url}
//                   alt="gallery"
//                   className="pointer-events-none w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Bottom Paragraph */}
//       <p className="absolute bottom-4 left-0 right-0 text-center text-lg md:text-xl text-gray-300 z-20 max-w-2xl mx-auto">
//         Explore our curated collection of breathtaking images, showcasing the beauty
//         and diversity of our world.
//       </p>
//     </div>

//   );
// };

// export default RollingGallery;




// Default images
const IMGS = [
  "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const RollingGallery = ({
  autoplay = true,
  pauseOnHover = true,
  images = [],
}) => {
  const finalImages = images.length > 0 ? images : IMGS;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const animationRef = useRef(null);
  const loadedImagesRef = useRef(new Set());

  // Handle screen size
  useEffect(() => {
    const handleResize = () => {
      setIsScreenSizeSm(window.innerWidth <= 640);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = finalImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loadedImagesRef.current.add(src);
            resolve(src);
          };
          img.onerror = () => {
            console.warn(`Failed to load image: ${src}`);
            resolve(src); // Still resolve to not block other images
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true); // Still show the gallery
      }
    };

    preloadImages();
  }, [finalImages]);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = finalImages.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (1.5 * Math.PI);
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = useCallback((startAngle) => {
    if (animationRef.current) {
      animationRef.current = null;
    }

    animationRef.current = controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      controls.stop();
      animationRef.current = null;
    }
  }, [controls]);

  // Handle autoplay
  useEffect(() => {
    if (autoplay && imagesLoaded && !isHovered) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      stopAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [autoplay, imagesLoaded, isHovered, startInfiniteSpin, stopAnimation]);

  const handleUpdate = useCallback((latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  }, [rotation]);

  const handleDrag = useCallback((_, info) => {
    stopAnimation();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  }, [rotation, stopAnimation]);

  const handleDragEnd = useCallback((_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay && !isHovered) {
      startInfiniteSpin(finalAngle);
    }
  }, [rotation, autoplay, isHovered, startInfiniteSpin]);

  const handleMouseEnter = useCallback(() => {
    if (autoplay && pauseOnHover) {
      setIsHovered(true);
    }
  }, [autoplay, pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (autoplay && pauseOnHover) {
      setIsHovered(false);
    }
  }, [autoplay, pauseOnHover]);

  if (!imagesLoaded) {
    return (
      <div className="relative h-[500px] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden bg-black">
      <div className="absolute top-6 left-0 right-0 w-fit h-fit m-auto text-center z-20 ">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Circle
          <span className=" text-yellow-400 rounded border border-black border-opacity-60 px-3 inline-block relative">
            Visits
          </span>
        </h1>
      </div>

      {/* Left Gradient Overlay with Rotating Text */}
      <div
        className="absolute top-0 left-0 h-full w-[200px] sm:w-[250px] z-10 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        {/* <div className="transform -rotate-90 ">
          <ContainerTextFlip
            words={[
              "Starlit Dreams",
              "Timeless Scenes",
              "Endless Stories",
              "Golden Wonders"
            ]}
            interval={4000}
            className="text-2xl  rounded-xl sm:text-3xl font-bold text-white
          bg-gradient-to-tr from-yellow-300 via-amber-400 to-orange-200
          px-4 py-2 shadow-lg"
            textClassName="text-white whitespace-nowrap"
            animationDuration={800}
          />
        </div> */}
      </div>

      {/* Right Gradient Overlay with Paragraph */}
      {/* <div
        className="absolute top-0 right-0 h-full w-[200px] sm:w-[250px] z-10 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <p className="text-base sm:text-lg text-gray-300 transform rotate-90 whitespace-nowrap">
          Curated breathtaking images
        </p>
      </div> */}

      {/* 3D Gallery */}
      <div className="flex h-full items-center justify-center" style={{ perspective: "1200px" }}>
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center"
        >
          {finalImages.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="group absolute flex h-fit items-center justify-center p-[4%] md:p-[3%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <div className="relative w-full h-[180px] sm:h-[150px] md:h-[220px] bg-white rounded-lg shadow-xl border-2 border-white overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105">
                <img
                  src={url}
                  alt={`Gallery image ${i + 1}`}
                  className="pointer-events-none w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.warn(`Failed to load image: ${url}`);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Paragraph */}
      <p className="absolute bottom-4 left-0 right-0 text-center text-lg md:text-xl text-gray-300 z-20 max-w-2xl mx-auto px-4">
        Explore our curated collection of breathtaking images, showcasing the beauty
        and diversity of our world.
      </p>
    </div>
  );
};

export default RollingGallery;


// import { useEffect, useState } from "react";
// import {
//   motion,
//   useMotionValue,
//   useAnimation,
//   useTransform,
// } from "motion/react";

// // Default images
// const IMGS = [
//   "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8f левый и правый боковые элементы изображенияfHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
// ];

// const RollingGallery = ({
//   autoplay = false,
//   pauseOnHover = false,
//   images = [],
// }) => {
//   images = images.length > 0 ? images : IMGS;

//   const [isScreenSizeSm, setIsScreenSizeSm] = useState(
//     window.innerWidth <= 640
//   );
//   useEffect(() => {
//     const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
//   const faceCount = images.length;
//   const faceWidth = (cylinderWidth / faceCount) * 1.5;
//   const radius = cylinderWidth / (1.5 * Math.PI);
//   const dragFactor = 0.05;
//   const rotation = useMotionValue(0);
//   const controls = useAnimation();

//   const transform = useTransform(
//     rotation,
//     (val) => `rotate3d(0,1,0,${val}deg)`
//   );

//   const startInfiniteSpin = (startAngle) => {
//     controls.start({
//       rotateY: [startAngle, startAngle - 360],
//       transition: {
//         duration: 20,
//         ease: "linear",
//         repeat: Infinity,
//       },
//     });
//   };

//   useEffect(() => {
//     if (autoplay) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     } else {
//       controls.stop();
//     }
//   }, [autoplay]);

//   const handleUpdate = (latest) => {
//     if (typeof latest.rotateY === "number") {
//       rotation.set(latest.rotateY);
//     }
//   };

//   const handleDrag = (_, info) => {
//     controls.stop();
//     rotation.set(rotation.get() + info.offset.x * dragFactor);
//   };

//   const handleDragEnd = (_, info) => {
//     const finalAngle = rotation.get() + info.velocity.x * dragFactor;
//     rotation.set(finalAngle);

//     if (autoplay) {
//       startInfiniteSpin(finalAngle);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (autoplay && pauseOnHover) {
//       controls.stop();
//     }
//   };

//   const handleMouseLeave = () => {
//     if (autoplay && pauseOnHover) {
//       const currentAngle = rotation.get();
//       startInfiniteSpin(currentAngle);
//     }
//   };

//   return (
//     <div className="relative h-[600px] w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
//       {/* Left Gradient Overlay with Heading */}
//       <div
//         className="absolute top-0 left-0 h-full w-[200px] sm:w-[250px] z-10 flex items-center justify-center"
//         style={{
//           background:
//             "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(31,41,55,0.8) 100%)",
//         }}
//       >
//         <h1 className="text-2xl sm:text-3xl font-bold text-white transform -rotate-90 whitespace-nowrap">
//           Our Stunning Gallery
//         </h1>
//       </div>

//       {/* Right Gradient Overlay with Paragraph */}
//       <div
//         className="absolute top-0 right-0 h-full w-[200px] sm:w-[250px] z-10 flex items-center justify-center"
//         style={{
//           background:
//             "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(31,41,55,0.8) 100%)",
//         }}
//       >
//         <p className="text-base sm:text-lg text-gray-300 transform rotate-90 whitespace-nowrap">
//           Curated breathtaking images
//         </p>
//       </div>

//       <div className="flex h-full items-center justify-center [perspective:1200px] [transform-style:preserve-3d]">
//         <motion.div
//           drag="x"
//           dragElastic={0}
//           onDrag={handleDrag}
//           onDragEnd={handleDragEnd}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           animate={controls}
//           onUpdate={handleUpdate}
//           style={{
//             transform: transform,
//             rotateY: rotation,
//             width: cylinderWidth,
//             transformStyle: "preserve-3d",
//           }}
//           className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
//         >
//           {images.map((url, i) => (
//             <div
//               key={i}
//               className="group absolute flex h-fit items-center justify-center p-[4%] [backface-visibility:hidden] md:p-[3%]"
//               style={{
//                 width: `${faceWidth}px`,
//                 transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
//               }}
//             >
//               <div className="relative w-full h-[180px] sm:h-[150px] md:h-[220px] bg-white rounded-lg shadow-xl border-[2px] border-white-500 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-105">
//                 <img
//                   src={url}
//                   alt="gallery"
//                   className="pointer-events-none w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default RollingGallery;
