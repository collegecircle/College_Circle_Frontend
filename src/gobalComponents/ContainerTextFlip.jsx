// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { cn } from "../../src/lib/cn"; // ✅ make sure you have cn utility

// export const ContainerTextFlip = ({
//   words = ["Innovative", "Creative", "Dynamic", "Smart"],
//   interval = 2000,
//   className,
//   textClassName,
// }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % words.length);
//     }, interval);
//     return () => clearInterval(timer);
//   }, [words, interval]);

//   return (
//     <div className={cn("relative h-12 overflow-hidden", className)}>
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={words[index]}
//           initial={{ y: "100%", opacity: 0 }}
//           animate={{ y: "0%", opacity: 1 }}
//           exit={{ y: "-100%", opacity: 0 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className={cn("block text-3xl font-bold", textClassName)}
//         >
//           {words[index]}
//         </motion.span>
//       </AnimatePresence>
//     </div>
//   );
// };




import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useAnimation, useTransform } from "framer-motion";

// ContainerTextFlip component (embedded for completeness)
export const ContainerTextFlip = ({
  words = ["Innovative", "Creative", "Dynamic", "Smart"],
  interval = 2000,
  className = "",
  textClassName = "",
  animationDuration = 600,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className={`relative h-12 overflow-hidden ${className}`}>
      <motion.span
        key={words[index]}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: animationDuration / 1000, ease: "easeInOut" }}
        className={`block text-3xl font-bold ${textClassName}`}
      >
        {words[index]}
      </motion.span>
    </div>
  );
};