import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InstagramFollowButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;

    gsap.fromTo(
      el,
      { rotation: -100, y: 100, scale: 0.5, opacity: 0 },
      {
        rotation: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 0%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Hover effect
    gsap.set(el, { transformOrigin: "center" });
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.1, duration: 0.3, ease: "power1.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power1.out" });
    });

    return () => {
      el.removeEventListener("mouseenter", () => { });
      el.removeEventListener("mouseleave", () => { });
    };
  }, []);

  return (
    <div className="py-1">
      <div
        ref={buttonRef}
        className="instagram-follow-button flex items-center gap-3 bg-blue-600 p-3 rounded-lg shadow-lg cursor-pointer transition-all"
      >
        <p className="text-white font-semibold">Follow on Instagram</p>
        <img
          loading="lazy"
          width="30px"
          src="https://www.hashproacademy.com/global/icons/instagram.webp"
          alt="Instagram Icon"
        />
      </div>
    </div>
  );
};

export default InstagramFollowButton;


// const InstagramFollowButton = () => {
//   return (
//     <div className="mb-8">
//       <div className="instagram-follow-button flex items-center gap-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 p-4 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 border border-white/10">
//         <p className="text-white font-bold text-lg">Follow on Instagram</p>
//         <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
//           <img
//             loading="lazy"
//             width="24px"
//             height="24px"
//             src="https://www.hashproacademy.com/global/icons/instagram.webp"
//             alt="Instagram Icon"
//             className="transition-transform duration-300 hover:rotate-12"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };


// export default InstagramFollowButton;