

// import React, { useEffect, useRef } from "react";

// // Mock GSAP for demo - in real usage, import actual GSAP
// const gsap = {
//   set: (elements, props) => {
//     elements.forEach((el) => {
//       Object.assign(el.style, {
//         transform: `rotate(${props.rotation}deg) translateY(${props.y}px) scale(${props.scale})`,
//         opacity: props.opacity,
//         transformOrigin: props.transformOrigin,
//       });
//     });
//   },
//   to: (elements, config) => {
//     const { scrollTrigger, stagger, duration, ease, ...props } = config;

//     elements.forEach((el, index) => {
//       setTimeout(() => {
//         el.style.transition = `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
//         Object.assign(el.style, {
//           transform: `rotate(${props.rotation}deg) translateY(${props.y}px) scale(${props.scale})`,
//           opacity: props.opacity,
//         });
//       }, index * stagger * 1000);
//     });
//   },
// };

// const TextReveal = () => {
//   const textRef = useRef(null);

//   useEffect(() => {
//     const el = textRef.current;
//     const spans = el.querySelectorAll("span");

//     // Split spans into left and right sides
//     const leftSpans = [];
//     const rightSpans = [];

//     spans.forEach((span, index) => {
//       if (index % 2 === 0) {
//         leftSpans.push(span);
//       } else {
//         rightSpans.push(span);
//       }
//     });

//     // Set initial states for left side (animate from left)
//     gsap.set(leftSpans, {
//       rotation: -90,
//       y: 100,
//       scale: 0.5,
//       opacity: 0,
//       transformOrigin: "left center",
//     });

//     // Set initial states for right side (animate from right)
//     gsap.set(rightSpans, {
//       rotation: 90,
//       y: 100,
//       scale: 0.5,
//       opacity: 0,
//       transformOrigin: "right center",
//     });

//     // Simulate scroll trigger with intersection observer
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // Animate in - left spans
//             gsap.to(leftSpans, {
//               rotation: 0,
//               y: 0,
//               scale: 1,
//               opacity: 1,
//               duration: 0.8,
//               ease: "elastic.out(1, 0.5)",
//               stagger: 0.2,
//             });

//             // Animate in - right spans
//             gsap.to(rightSpans, {
//               rotation: 0,
//               y: 0,
//               scale: 1,
//               opacity: 1,
//               duration: 0.8,
//               ease: "elastic.out(1, 0.5)",
//               stagger: 0.2,
//             });
//           } else {
//             // Animate out - left spans (reverse to left)
//             gsap.to(leftSpans, {
//               rotation: -90,
//               y: -100,
//               scale: 0.5,
//               opacity: 0,
//               duration: 0.6,
//               ease: "power2.in",
//               stagger: 0.1,
//             });

//             // Animate out - right spans (reverse to right)
//             gsap.to(rightSpans, {
//               rotation: 90,
//               y: -100,
//               scale: 0.5,
//               opacity: 0,
//               duration: 0.6,
//               ease: "power2.in",
//               stagger: 0.1,
//             });
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(el);

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <>
//       <section className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-slate-900 to-slate-700">
//         <h1
//           ref={textRef}
//           className="text-6xl font-bold text-white text-center leading-snug"
//         >
//           <span className="block  text-[#000000] bg-[#fbbf24]">
//             Creative text reveal
//           </span>
//           <span className="block ">from both sides</span>
//           <span className="block text-[#000000] bg-[#fbbf24]">
//             using dual animation
//           </span>
//           <span className="block">with GSAP magic</span>
//         </h1>
//       </section>
//     </>
//   );
// };

// export default TextReveal;



// import React, { useEffect, useRef } from "react";

// // Mock GSAP for demo - in real usage, import actual GSAP
// const gsap = {
//   set: (elements, props) => {
//     elements.forEach((el) => {
//       Object.assign(el.style, {
//         transform: `rotate(${props.rotation}deg) translateY(${props.y}px) scale(${props.scale})`,
//         opacity: props.opacity,
//         transformOrigin: props.transformOrigin,
//       });
//     });
//   },
//   to: (elements, config) => {
//     const { scrollTrigger, stagger, duration, ease, ...props } = config;

//     elements.forEach((el, index) => {
//       setTimeout(() => {
//         el.style.transition = `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
//         Object.assign(el.style, {
//           transform: `rotate(${props.rotation}deg) translateY(${props.y}px) scale(${props.scale})`,
//           opacity: props.opacity,
//         });
//       }, index * stagger * 1000);
//     });
//   },
// };

// const TextReveal = () => {
//   const textRef = useRef(null);

//   useEffect(() => {
//     const el = textRef.current;
//     const spans = el.querySelectorAll("span");

//     // Split spans into left and right sides
//     const leftSpans = [];
//     const rightSpans = [];

//     spans.forEach((span, index) => {
//       if (index % 2 === 0) {
//         leftSpans.push(span);
//       } else {
//         rightSpans.push(span);
//       }
//     });

//     // Get responsive y-offset based on screen size
//     const getYOffset = () => {
//       const width = window.innerWidth;
//       if (width < 640) return 50; // mobile
//       if (width < 1024) return 75; // tablet
//       return 100; // desktop
//     };

//     const yOffset = getYOffset();

//     // Set initial states for left side (animate from left)
//     gsap.set(leftSpans, {
//       rotation: -90,
//       y: yOffset,
//       scale: 0.5,
//       opacity: 0,
//       transformOrigin: "left center",
//     });

//     // Set initial states for right side (animate from right)
//     gsap.set(rightSpans, {
//       rotation: 90,
//       y: yOffset,
//       scale: 0.5,
//       opacity: 0,
//       transformOrigin: "right center",
//     });

//     // Simulate scroll trigger with intersection observer
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             // Animate in - left spans
//             gsap.to(leftSpans, {
//               rotation: 0,
//               y: 0,
//               scale: 1,
//               opacity: 1,
//               duration: 0.8,
//               ease: "elastic.out(1, 0.5)",
//               stagger: 0.2,
//             });

//             // Animate in - right spans
//             gsap.to(rightSpans, {
//               rotation: 0,
//               y: 0,
//               scale: 1,
//               opacity: 1,
//               duration: 0.8,
//               ease: "elastic.out(1, 0.5)",
//               stagger: 0.2,
//             });
//           } else {
//             // Animate out - left spans (reverse to left)
//             gsap.to(leftSpans, {
//               rotation: -90,
//               y: -yOffset,
//               scale: 0.5,
//               opacity: 0,
//               duration: 0.6,
//               ease: "power2.in",
//               stagger: 0.1,
//             });

//             // Animate out - right spans (reverse to right)
//             gsap.to(rightSpans, {
//               rotation: 90,
//               y: -yOffset,
//               scale: 0.5,
//               opacity: 0,
//               duration: 0.6,
//               ease: "power2.in",
//               stagger: 0.1,
//             });
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     observer.observe(el);

//     // Handle resize
//     const handleResize = () => {
//       const newYOffset = getYOffset();
//       // Re-initialize positions if screen size changes significantly
//       if (Math.abs(newYOffset - yOffset) > 20) {
//         // Only reinitialize if there's a significant change
//         window.location.reload();
//       }
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       observer.disconnect();
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <>
//       <section className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-700 py-4 sm:py-6 lg:py-8">
//         <h1
//           ref={textRef}
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold text-white text-center leading-tight sm:leading-snug max-w-4xl"
//         >
//           <span className="block text-black bg-amber-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded mb-2 sm:mb-3 lg:mb-4">
//             Creative text reveal
//           </span>
//           <span className="block mb-2 sm:mb-3 lg:mb-4">from both sides</span>
//           <span className="block text-black bg-amber-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded mb-2 sm:mb-3 lg:mb-4">
//             using dual animation
//           </span>
//           <span className="block">with GSAP magic</span>
//         </h1>
//       </section>
//     </>
//   );
// };

// export default TextReveal;.


import React, { useEffect, useRef } from "react";

// Mock GSAP for demo - in real usage, import actual GSAP
const gsap = {
  set: (elements, props) => {
    elements.forEach((el) => {
      Object.assign(el.style, {
        transform: `rotate(${props.rotation}deg) translateY(${props.y}px) scale(${props.scale})`,
        opacity: props.opacity,
        transformOrigin: props.transformOrigin,
      });
    });
  },
  to: (elements, config) => {
    const { scrollTrigger, stagger, duration, ease, ...props } = config;

    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transition = `all ${duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
        Object.assign(el.style, {
          transform: `rotate(${props.rotation}deg) translateY(${props.y}px) scale(${props.scale})`,
          opacity: props.opacity,
        });
      }, index * stagger * 1000);
    });
  },
};

const TextReveal = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const spans = el.querySelectorAll("span");

    // Split spans into left and right sides
    const leftSpans = [];
    const rightSpans = [];

    spans.forEach((span, index) => {
      if (index % 2 === 0) {
        leftSpans.push(span);
      } else {
        rightSpans.push(span);
      }
    });

    // Get responsive y-offset based on screen size
    const getYOffset = () => {
      const width = window.innerWidth;
      if (width < 640) return 50; // mobile
      if (width < 1024) return 75; // tablet
      return 100; // desktop
    };

    const yOffset = getYOffset();

    // Set initial states for left side (animate from left)
    gsap.set(leftSpans, {
      rotation: -90,
      y: yOffset,
      scale: 0.5,
      opacity: 0,
      transformOrigin: "left center",
    });

    // Set initial states for right side (animate from right)
    gsap.set(rightSpans, {
      rotation: 90,
      y: yOffset,
      scale: 0.5,
      opacity: 0,
      transformOrigin: "right center",
    });

    // Simulate scroll trigger with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in - left spans
            gsap.to(leftSpans, {
              rotation: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              stagger: 0.2,
            });

            // Animate in - right spans
            gsap.to(rightSpans, {
              rotation: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
              stagger: 0.2,
            });
          } else {
            // Animate out - left spans (reverse to left)
            gsap.to(leftSpans, {
              rotation: -90,
              y: -yOffset,
              scale: 0.5,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
              stagger: 0.1,
            });

            // Animate out - right spans (reverse to right)
            gsap.to(rightSpans, {
              rotation: 90,
              y: -yOffset,
              scale: 0.5,
              opacity: 0,
              duration: 0.6,
              ease: "power2.in",
              stagger: 0.1,
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    // Handle resize
    const handleResize = () => {
      const newYOffset = getYOffset();
      // Re-initialize positions if screen size changes significantly
      if (Math.abs(newYOffset - yOffset) > 20) {
        // Only reinitialize if there's a significant change
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-black via-black to-black py-4 sm:py-6 lg:py-8 overflow-hidden">

        {/* Animated background shapes with slate/amber theme */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          {/* <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 animate-bounce">
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
              <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="currentColor" />
            </svg>
          </div> */}

          {/* <div className="absolute top-3/4 right-1/4 w-24 h-24 opacity-15 animate-pulse">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="8,4" />
            </svg>
          </div>

          <div className="absolute top-1/2 right-1/6 w-20 h-20 opacity-20 animate-spin" style={{ animationDuration: '8s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300">
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)" />
            </svg>
          </div>

          <div className="absolute bottom-1/4 left-1/6 w-28 h-28 opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
            <svg viewBox="0 0 100 100" className="w-full h-full text-slate-300">
              <path d="M50,10 L90,90 L10,90 Z" fill="currentColor" />
            </svg>
          </div> */}

          {/* Gradient orbs maintaining slate/amber theme */}
          {/* <div className="absolute top-1/3 left-1/6 w-40 h-40 bg-amber-400 rounded-full opacity-5 blur-xl animate-pulse"></div> */}
          {/* <div className="absolute bottom-1/3 right-1/6 w-52 h-52 bg-slate-300 rounded-full opacity-3 blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div> */}
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="white" stroke="BLACK" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Glass morphism container */}
        <div className="relative z-10 backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl">
          {/* Decorative corner elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="absolute -top-6 -right-6 w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-slate-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          <h1
            ref={textRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold text-white text-center leading-tight sm:leading-snug max-w-4xl"
          >
            <span className="block text-black bg-amber-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded mb-2 sm:mb-3 lg:mb-4 shadow-xl border-2 border-amber-300 transform hover:scale-105 transition-transform duration-300">
              Creative text reveal
            </span>
            <span className="block mb-2 sm:mb-3 lg:mb-4 drop-shadow-lg">from both sides</span>
            <span className="block text-black bg-amber-400 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded mb-2 sm:mb-3 lg:mb-4 shadow-xl border-2 border-amber-300 transform hover:scale-105 transition-transform duration-300">
              using dual animation
            </span>
            <span className="block drop-shadow-lg">with GSAP magic</span>
          </h1>

          {/* Decorative elements at bottom */}
          {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-3">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
            </div>
          </div> */}

          {/* Side decorative lines */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400 opacity-60"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white opacity-40 mt-2"></div>
          </div>

          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rotate-180">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400 opacity-60"></div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white opacity-40 mt-2"></div>
          </div>
        </div>

        {/* Floating particles using your color scheme */}
        {/* <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-30 animate-pulse ${i % 3 === 0 ? 'bg-amber-400' : 'bg-white'
                }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div> */}

        {/* Corner accent shapes */}
        {/* <div className="absolute top-0 left-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
            <path d="M0,0 Q50,50 100,0 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400">
            <path d="M0,0 Q50,50 100,0 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div> */}
      </section>
    </>
  );
};

export default TextReveal;