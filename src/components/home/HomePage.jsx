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
// import RollingGallery from "../gobalComponents/Gallery";
// import TextHoverEffect from "../gobalComponents/TextHoverEffect"
// import { FloatingDockDemo } from "./FloatingDockDemo";
// import HeroScrollDemo from "./ContainerScroll";
// import JobCardsComponent from "./JobsPage";
// import AllPagesCards from "./AllPagesCards";


// const HomePage = () => {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     if (heroRef.current) {
//       heroRef.current.classList.add("animate-fade-in");
//     }
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       {/* <section id="home" className="hero-section max-h-screen py-4">
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
//             items={[
//               { label: "Home", href: "#home" },
//               { label: "About", href: "#about" },
//               { label: "Services", href: "#services" },
//               { label: "Event", href: "#announcements" },
//               { label: "Instagram", href: "#instagram" },
//               { label: "Faqs", href: "#faqs" },
//             ]}
//             activeHref="/"
//             className="custom-nav"
//             ease="power2.easeOut"
//             baseColor="#ffffff"
//             pillColor="#000000"
//             hoveredPillTextColor="#000000"
//             pillTextColor="#ffffff"
//           />
//         </div>

//         <div
//           ref={heroRef}
//           className="hero-content flex justify-center items-center text-center px-6 py-12"
//         >
//           <div className="hero-inner max-w-3xl">
//             <h1 className="hero-title text-4xl md:text-6xl font-bold leading-tight">
//               <span className="title-line-1 block text-gray-800">
//                 Empower Your Future,
//               </span>
//               <span className="title-line-2 block text-indigo-600 relative">
//                 Learn Without Limits
//                 <div className="title-underline absolute left-0 bottom-0 w-24 h-1 bg-indigo-500 mt-2"></div>
//               </span>
//             </h1>

//             <div className="hero-divider my-6 border-t bg-indigo-500"></div>

//             <p className="hero-description text-lg text-gray-600">
//               At <strong>CollegeCircle</strong>, we don't just teach courses—we build careers.
//               Our programs empower you with the skills and confidence to thrive in the real world.
//             </p>

//             <div className="flex items-center justify-center gap-6 mt-8">
//               <button className="bg-black text-white px-6 py-2 rounded-full font-medium border-2 border-white transition-all duration-300 hover:bg-white hover:text-black hover:text-black ">
//                 College Connect
//               </button>

//               <button className="bg-white text-black px-6 py-2 rounded-full font-medium border-2 border-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg">
//                 Explore Courses
//               </button>
//             </div>
//           </div>
//         </div>


//         <div className="floating-element floating-1"></div>
//         <div className="floating-element floating-2"></div>
//         <div className="floating-element floating-3"></div>
//       </section> */}

//       <section id="home" className="hero-section max-h-screen py-4">
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
//             items={[
//               { label: "Home", href: "#home" },
//               { label: "About", href: "#about" },
//               { label: "Services", href: "#services" },
//               { label: "Event", href: "#announcements" },
//               { label: "Instagram", href: "#instagram" },
//               { label: "Faqs", href: "#faqs" },
//               { label: "Colleges", href: "#colleges" },
//             ]}
//             activeHref="/"
//             className="custom-nav"
//             ease="power2.easeOut"
//             baseColor="#ffffff"
//             pillColor="#000000"
//             hoveredPillTextColor="#000000"
//             pillTextColor="#ffffff"
//           />
//         </div>

//         <div
//           ref={heroRef}
//           className="hero-content flex justify-center items-center text-center px-1 py-10"
//         >
//           <div className="hero-inner max-w-3xl">
//             <h1 className="hero-title text-4xl md:text-6xl font-bold">
//               {/* Replace the span with TextHoverEffect */}
//               <div className="title-line-1 block text-gray-800 h-20">
//                 <TextHoverEffect text="Grow Bold," duration={0.3} />
//               </div>
//               <span className="title-line-2 block text-[#f8d00d] relative">
//                 <TextHoverEffect text="Stronger." duration={1.3} />
//                 {/* <div className="title-underline absolute left-0 bottom-0 w-24 h-1 bg-indigo-500 mt-2"></div> */}
//               </span>
//             </h1>

//             {/* <div className="hero-divider my-6 border-t bg-indigo-500"></div> */}

//             <p className="hero-description text-lg text-gray-600">
//               At <strong>CollegeCircle</strong>, we don't just teach courses—we build careers.
//               Our programs empower you with the skills and confidence to thrive in the real world.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
//               <button className="bg-black text-white px-6 py-2 rounded-full font-medium border-2 border-white transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
//                 College Connect
//               </button>

//               <button className="bg-white text-black px-6 py-2 rounded-full font-medium border-2 border-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg cursor-pointer">
//                 Explore Courses
//               </button>
//             </div>

//           </div>
//         </div>

//         <div className="floating-element floating-1"></div>
//         <div className="floating-element floating-2"></div>
//         <div className="floating-element floating-3"></div>
//       </section>
//       <section
//         id="instagram"
//         // className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800
//         className="max-h-screen bg-gradient-to-br from-black via-black to-black
//              px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
//              py-4 sm:py-12 md:py-16 lg:py-20 
//              flex flex-col items-center justify-center"
//       >
//         {/* Instagram Follow Button */}
//         <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8 ">
//           <InstagramFollowButton />
//         </div>

//         {/* Carousel Container */}
//         <div className="w-full max-w-7xl mx-auto">
//           <Carousel />
//         </div>

//         {/* Optional: Add some bottom spacing for better mobile experience */}
//         {/* <div className="h-8 sm:h-12 md:h-16 lg:h-20"></div> */}
//       </section>
//       {/* FAQ Section */}

//       <section className="">
//         <RollingGallery autoplay={true} pauseOnHover={true} />
//       </section>
//       <section id="faqs" className="faq-section">
//         <FAQSection />
//       </section>

//       {/* Text Reveal Section */}
//       <section>
//         <TextReveal />
//       </section>
//       <section>
//         <HeroScrollDemo />
//       </section>
//     </>
//   );
// };

// export default HomePage;



// import React, { useEffect, useRef } from "react";
// import { ArrowRight } from "lucide-react";
// // import PillNav from "../../ReactBits/PillNav";
// import Particles from "../../ReactBits/Particles";
// import logo from "/assets/cclogo.PNG";
// import InstagramFollowButton from "../../gobalComponents/InstagramFollowButton";
// import Carousel from "../../gobalComponents/Carousel";
// import FAQSection from "../faqs/FAQSection";
// import "./HomePage.css";
// import TextReveal from "../../gobalComponents/TextReveal";
// import RollingGallery from "../../gobalComponents/Gallery";
// import TextHoverEffect from "../../gobalComponents/TextHoverEffect";
// import { FloatingDockDemo } from "../FloatingDockDemo";
// import HeroScrollDemo from "../ContainerScroll";
// // import JobCardsComponent from "../jobs/JobsPage";
// // import AllPagesCards from "../AllPagesCards";
// import HomePreviewSection from "../HomePreviewSection";

// const HomePage = ({ navigateTo }) => {
//   const heroRef = useRef(null);

//   useEffect(() => {
//     if (heroRef.current) {
//       heroRef.current.classList.add("animate-fade-in");
//     }
//   }, []);

//   return (
//     <>
//       {/* Hero Section */}
//       <section id="home" className="hero-section max-h-screen py-4">
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

//         {/* <div className="navigation-container">
//           <PillNav
//             logo={logo}
//             logoAlt="Company Logo"
//             items={[
//               { label: "Home", href: "#home" },
//               { label: "About", href: "#about" },
//               { label: "Services", href: "#services" },
//               { label: "Event", href: "#announcements" },
//               { label: "Instagram", href: "#instagram" },
//               { label: "Faqs", href: "#faqs" },
//               {
//                 label: "Jobs",
//                 href: "#jobs",
//                 onClick: (e) => {
//                   e.preventDefault();
//                   navigateTo('jobs');
//                 }
//               },
//               {
//                 label: "Colleges",
//                 href: "#colleges",
//                 onClick: (e) => {
//                   e.preventDefault();
//                   navigateTo('colleges');
//                 }
//               },
//               {
//                 label: "Courses",
//                 href: "#courses",
//                 onClick: (e) => {
//                   e.preventDefault();
//                   navigateTo('courses');
//                 }
//               },
//             ]}
//             activeHref="/"
//             className="custom-nav"
//             ease="power2.easeOut"
//             baseColor="#ffffff"
//             pillColor="#000000"
//             hoveredPillTextColor="#000000"
//             pillTextColor="#ffffff"
//           />
//         </div> */}

//         <div
//           ref={heroRef}
//           className="hero-content flex justify-center items-center text-center px-1 py-10"
//         >
//           <div className="hero-inner max-w-3xl">
//             <h1 className="hero-title text-4xl md:text-6xl font-bold">
//               <div className="title-line-1 block text-gray-800 h-20">
//                 <TextHoverEffect text="Grow Bold," duration={0.3} />
//               </div>
//               <span className="title-line-2 block text-[#f8d00d] relative">
//                 <TextHoverEffect text="Stronger." duration={1.3} />
//               </span>
//             </h1>

//             <p className="hero-description text-lg text-gray-600">
//               At <strong>CollegeCircle.CC</strong>, Connecting college communities and creating meaningful educational experiences that empower students to achieve their goals
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
//               <button
//                 onClick={() => navigateTo('jobs')}
//                 className="bg-black text-white px-6 py-2 rounded-full font-medium border-2 border-white transition-all duration-300 hover:bg-white hover:text-black cursor-pointer flex items-center space-x-2"
//               >
//                 <span>Finding Jobs</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>

//               <button
//                 onClick={() => navigateTo('colleges')}
//                 className="bg-white text-black px-6 py-2 rounded-full font-medium border-2 border-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg cursor-pointer flex items-center space-x-2"
//               >
//                 <span>College Connect</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>

//               <button
//                 onClick={() => navigateTo('courses')}
//                 className="bg-[#f8d00d] text-black px-6 py-2 rounded-full font-medium border-2 border-[#f8d00d] transition-all duration-300 hover:bg-black hover:text-[#f8d00d] hover:shadow-lg cursor-pointer flex items-center space-x-2"
//               >
//                 <span>Explore Courses</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="floating-element floating-1"></div>
//         <div className="floating-element floating-2"></div>
//         <div className="floating-element floating-3"></div>
//       </section>

//       {/* Services Preview Section */}
//       <HomePreviewSection navigateTo={navigateTo} />

//       <section
//         id="instagram"
//         className="max-h-screen bg-gradient-to-br from-black via-black to-black
//              px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
//              py-4 sm:py-12 md:py-16 lg:py-20 
//              flex flex-col items-center justify-center"
//       >
//         <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
//           <InstagramFollowButton />
//         </div>

//         <div className="w-full max-w-7xl mx-auto">
//           <Carousel />
//         </div>
//       </section>
//       <section className="">
//         <RollingGallery autoplay={true} pauseOnHover={true} />
//       </section>
//       <section>
//         <TextReveal />
//       </section>
//       <section id="faqs" className="faq-section">
//         <FAQSection />
//       </section>
//       <section>
//         <HeroScrollDemo />
//       </section>
//     </>
//   );
// };

// export default HomePage;



import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Particles from "../../ReactBits/Particles";
import logo from "/assets/cclogo.PNG";
import InstagramFollowButton from "../../gobalComponents/InstagramFollowButton";
import Carousel from "../../gobalComponents/Carousel";
import FAQSection from "../faqs/FAQSection";
import "./HomePage.css";
import TextReveal from "../../gobalComponents/TextReveal";
import RollingGallery from "../../gobalComponents/Gallery";
import TextHoverEffect from "../../gobalComponents/TextHoverEffect";
import { FloatingDockDemo } from "../FloatingDockDemo";
import HeroScrollDemo from "../ContainerScroll";
import HomePreviewSection from "../HomePreviewSection";
import { useNavigate } from "react-router-dom";
import CircularBeamDemo from "../../gobalComponents/CircularBeamDemo";
import { motion } from "framer-motion";
import ContactForm from "../faqs/Contact";
import InfiniteLogoScroll from "../../gobalComponents/InfiniteLogoScroll";


const HomePage = ({ user }) => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.classList.add("animate-fade-in");
    }
  }, []);

  const handleNavigation = (path) => {
    // If user is not authenticated, redirect to /userlogin for protected routes
    if (!user && ['jobs', 'colleges', 'courses'].includes(path)) {
      navigate('/userlogin');
    } else {
      navigate(`/${path}`);
    }
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Button clicked!"); // Debug log
    window.open(
      "https://www.instagram.com/collegecircle.cc?igsh=MTgxdWJpbDE5NXRhZQ==",
      "_blank" // Opens in new tab
    );
  };

  return (
    <>
      {/* Hero Section */}
      {/* <section id="home" className="hero-section max-h-screen py-4"> */}
      {/* <div className="particles-container">
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
        </div> */}

      {/* <div
          ref={heroRef}
          className="hero-content flex justify-center items-center text-center px-1 py-10"
        >
          <div className="hero-inner max-w-3xl">
            <h1 className="hero-title text-4xl md:text-6xl font-bold">
              <div className="title-line-1 block text-gray-800 h-20">
                <TextHoverEffect text="Grow Bold," duration={0.3} />
              </div>
              <span className="title-line-2 block text-[#f8d00d] relative">
                <TextHoverEffect text="Stronger." duration={1.3} />
              </span>
            </h1>

            <p className="hero-description text-lg text-gray-600">
              At <strong>CollegeCircle.CC</strong>, Connecting college communities and creating meaningful educational experiences that empower students to achieve their goals
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <button
                onClick={() => handleNavigation('jobs')}
                className="bg-black text-white px-6 py-2 rounded-full font-medium border-2 border-white transition-all duration-300 hover:bg-white hover:text-black cursor-pointer flex items-center space-x-2"
              >
                <span>Finding Jobs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigation('colleges')}
                className="bg-white text-black px-6 py-2 rounded-full font-medium border-2 border-black transition-all duration-300 hover:bg-black hover:text-white hover:shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <span>College Connect</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigation('courses')}
                className="bg-[#f8d00d] text-black px-6 py-2 rounded-full font-medium border-2 border-[#f8d00d] transition-all duration-300 hover:bg-black hover:text-[#f8d00d] hover:shadow-lg cursor-pointer flex items-center space-x-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div> */}

      {/* <div className="relative">
          <CircularBeamDemo />
        </div>
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div> */}
      {/* </section> */}

      <section id="home" className="hero-section max-h-screen " style={{ position: 'relative', zIndex: 1 }}>
        <div className="particles-container" style={{ zIndex: 1 }}>
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

        {/* Navbar should have zIndex: 50 or higher */}

        <div className="relative" style={{ zIndex: 2 }}>
          <CircularBeamDemo />
        </div>

        <div className="floating-element floating-1" style={{ zIndex: 1 }}></div>
        <div className="floating-element floating-2" style={{ zIndex: 1 }}></div>
        <div className="floating-element floating-3" style={{ zIndex: 1 }}></div>
      </section>

      {/* Services Preview Section */}
      <HomePreviewSection user={user} navigateTo={handleNavigation} />

      <section
        id="instagram"
        className="max-h-screen bg-gradient-to-br from-black via-black to-black
             px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 
             py-4 sm:py-12 md:py-16 lg:py-20 
             flex flex-col items-center justify-center"
      >
        <div>
          {/* <InstagramFollowButton /> */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Pure <span className="text-yellow-400">Guidence</span>
            </h2>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <Carousel />
        </div>
      </section>
      <section className="">
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </section>
      <section>
        <InfiniteLogoScroll />
      </section>
      <section>
        <TextReveal />
      </section>
      <section id="faqs" className="faq-section">
        <FAQSection />
      </section>
      {/* <section>
        <HeroScrollDemo />
      </section> */}

      <section className="px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 pt-6 sm:pt-8 md:pt-10 flex items-center justify-center"
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-lg sm:shadow-xl p-4 xs:p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100 w-full max-w-xs xs:max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">

            {/* Grid pattern background */}
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

            {/* Responsive decorative circles */}
            <div className="absolute bottom-0 right-0 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-yellow-50 rounded-full -mr-8 -mb-8 xs:-mr-10 xs:-mb-10 sm:-mr-12 sm:-mb-12 md:-mr-16 md:-mb-16 lg:-mr-20 lg:-mb-20"></div>
            <div className="absolute top-0 left-0 w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 bg-yellow-50 rounded-full -ml-4 -mt-4 xs:-ml-5 xs:-mt-5 sm:-ml-6 sm:-mt-6 md:-ml-8 md:-mt-8 lg:-ml-10 lg:-mt-10"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center">

              {/* Responsive heading */}
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight text-black max-w-full xs:max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl px-2 xs:px-0">
                College Circle - Your Gateway to Opportunities
              </h3>

              {/* Responsive paragraph */}
              <p className="text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl text-gray-700 mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 max-w-full xs:max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl px-2 xs:px-0 leading-relaxed">
                A Single Platform where student can connect with each other, find jobs, explore courses, gain skill, explore oppertunities, get expert guidence and achive growth.
              </p>

              {/* Responsive button */}
              <motion.button
                // onClick={openContactPopup}
                onClick={handleRedirect}
                onTap={handleRedirect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white font-medium py-2.5 px-6 xs:py-3 xs:px-7 sm:py-3.5 sm:px-8 md:py-4 md:px-9 lg:py-4 lg:px-10 rounded-full text-sm xs:text-base sm:text-lg md:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center min-w-fit"
              >
                <span className="mr-1.5 xs:mr-2">JOIN CIRCLE</span>
                <svg
                  className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;