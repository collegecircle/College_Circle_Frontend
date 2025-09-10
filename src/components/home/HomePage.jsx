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

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section max-h-screen py-4">
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

        <div className="relative z-50">
          <CircularBeamDemo />
        </div>
        <div className="floating-element floating-1"></div>
        <div className="floating-element floating-2"></div>
        <div className="floating-element floating-3"></div>
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
        <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
          <InstagramFollowButton />
        </div>

        <div className="w-full max-w-7xl mx-auto">
          <Carousel />
        </div>
      </section>
      <section className="">
        <RollingGallery autoplay={true} pauseOnHover={true} />
      </section>
      <section>
        <TextReveal />
      </section>
      <section id="faqs" className="faq-section">
        <FAQSection />
      </section>
      <section>
        <HeroScrollDemo />
      </section>
    </>
  );
};

export default HomePage;