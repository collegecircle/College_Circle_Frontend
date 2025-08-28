// import React, { useEffect, useRef } from "react";
// import { ArrowRight } from "lucide-react";
// import PillNav from "../ReactBits/PillNav";
// import Particles from "../ReactBits/Particles";
// import logo from "../assets/react.svg";
// import InstagramFollowButton from "../gobalComponents/InstagramFollowButton";
// import Carousel from "../gobalComponents/Carousel";
// import FAQSection from "./FAQSection";
// import "./HomePage.css";
// import ModernNavbar from "./Navbar";
// import TextReveal from "../gobalComponents/TextReveal";
// import FloatingNavButton from "../gobalComponents/FloatingNavButton ";

// const HomePage = () => {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     if (heroRef.current) {
//       heroRef.current.classList.add("animate-fade-in");
//     }
//   }, []);

//   return (
//     <>
//       <section className="hero-section">
//         <div className="particles-container">
//           <Particles
//             particleColors={["#ffffff", "#f8d00d", "#000000"]}
//             particleCount={200}
//             particleSpread={10}
//             speed={0.1}
//             particleBaseSize={100}
//             moveParticlesOnHover={true}
//             alphaParticles={false}
//             disableRotation={false}
//           />
//         </div>

//         <div className="navigation-container">
//           <PillNav
//             logo={logo}
//             logoAlt="Company Logo"
//             // items={[
//             //   { label: "Home", href: "/home" },
//             //   { label: "Connect", href: "/about" },
//             //   { label: "Jobs", href: "/services" },
//             //   { label: "Events", href: "/contact" },
//             //   { label: "Courses", href: "/courses" },
//             // ]}
//             items={[
//               { label: 'Home', href: '#home' },
//               { label: 'About', href: '#about' },
//               { label: 'Services', href: '#services' },
//               { label: 'Contact', href: '#contact' }
//             ]}
//             activeHref="#home"
//             className="custom-nav"
//             ease="power2.easeOut"
//             baseColor="#ffffff"
//             pillColor="#000000"
//             hoveredPillTextColor="#000000"
//             pillTextColor="#ffffff"
//           />
//           {/* <ModernNavbar /> */}
//         </div>

//         <div
//           ref={heroRef}
//           className="hero-content flex justify-center items-center"
//         >
//           <div className="hero-inner">
//             <h1 className="hero-title">
//               <span className="title-line-1">Learn with Purpose,</span>
//               <span className="title-line-2">
//                 grow with confidence
//                 <div className="title-underline"></div>
//               </span>
//             </h1>

//             <div className="hero-divider"></div>

//             <p className="hero-description">
//               At Hashpro we believe that you need to choose a career and not
//               just a course. Our programs don't just focus on teaching you
//               subjects rather help you build yourself.
//             </p>

//             <div className="flex items-center justify-center gap-4">
//               <button className="text-white px-4 py-1 border-2 rounded-full">
//                 College Connect
//               </button>

//               {/* <button className="btn-job-apply">Job Apply</button> */}

//               <button className="text-white px-4 py-1 border-2 rounded-full">
//                 Courses
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="floating-element floating-1"></div>
//         <div className="floating-element floating-2"></div>
//         <div className="floating-element floating-3"></div>
//         <div className="bottom-gradient"></div>
//       </section>
//       <section className="p-4 pt-10  overflow-hidden">
//         <InstagramFollowButton />
//         <div className="flex w-full  p-4 gap-4">
//           <Carousel />
//         </div>
//       </section>

//       <section className="faq-section">
//         <FAQSection />
//       </section>
//       <section>
//         <TextReveal />
//       </section>
//       <section id="home">Home Section</section>
//       <section id="about">About Section</section>
//       <section id="services">Services Section</section>
//       <section id="contact">Contact Section</section>
//       <FloatingNavButton />
//     </>
//   );
// };

// export default HomePage;

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import PillNav from "../ReactBits/PillNav";
import Particles from "../ReactBits/Particles";
import logo from "../assets/react.svg";
import InstagramFollowButton from "../gobalComponents/InstagramFollowButton";
import Carousel from "../gobalComponents/Carousel";
import FAQSection from "./FAQSection";
import "./HomePage.css";
import ModernNavbar from "./Navbar";
import TextReveal from "../gobalComponents/TextReveal";
import RollingGallery from "../gobalComponents/Gallery";

const HomePage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section py-4">
        <div className="particles-container">
          <Particles
            particleColors={["#ffffff", "#f8d00d", "#000000"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        <div className="navigation-container">
          {/* <PillNav
            logo={logo}
            logoAlt="Company Logo"
            items={[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Services", href: "#services" },
              { label: "Event", href: "#announcements" },
              { label: "Instagram", href: "#instagram" },
              { label: "Faqs", href: "#faqs" },
            ]}
            activeHref="/"
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="#ffffff"
            pillColor="#000000"
            hoveredPillTextColor="#000000"
            pillTextColor="#ffffff"
          /> */}
          <ModernNavbar />
        </div>

        <div
          ref={heroRef}
          className="hero-content flex justify-center items-center"
        >
          <div className="hero-inner">
            <h1 className="hero-title">
              <span className="title-line-1">Learn with Purpose  hey,</span>
              <span className="title-line-2">
                grow with confidence
                <div className="title-underline"></div>
              </span>
            </h1>

            <div className="hero-divider"></div>

            <p className="hero-description">
              At Hashpro we believe that you need to choose a career and not
              just a course. Our programs don't just focus on teaching you
              subjects rather help you build yourself.
            </p>

            <div className="flex items-center justify-center gap-4">
              <button className=" black text-white px-4 py-1 border-2 rounded-full">
                College Connect
              </button>

              <button className=" white text-white px-4 py-1 border-2 rounded-full">
                Courses
              </button>
            </div>
            {/* 
            <div className="flex flex-col  md:flex-row mx-auto justify center gap-4 w-fit mt-12">
              <a href="#">
                <button className="black mx-auto">College Connect</button>
              </a>
              <a href="#">
                <button className="white mx-auto">Get Courses</button>
              </a>
            </div> */}
          </div>
        </div>

        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
        <div className="bottom-gradient"></div>
      </section>
      <section
        id="instagram"
        // className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800
        className="min-h-screen bg-gradient-to-br from-black via-black to-black
             px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
             py-4 sm:py-12 md:py-16 lg:py-20 
             flex flex-col items-center justify-center"
      >
        {/* Instagram Follow Button */}
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 ">
          <InstagramFollowButton />
        </div>

        {/* Carousel Container */}
        <div className="w-full max-w-7xl mx-auto">
          <Carousel />
        </div>

        {/* Optional: Add some bottom spacing for better mobile experience */}
        {/* <div className="h-8 sm:h-12 md:h-16 lg:h-20"></div> */}
      </section>
      {/* FAQ Section */}

      <section className="">
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </section>
      <section id="faqs" className="faq-section">
        <FAQSection />
      </section>

      {/* Text Reveal Section */}
      <section>
        <TextReveal />
      </section>
    </>
  );
};

export default HomePage;
