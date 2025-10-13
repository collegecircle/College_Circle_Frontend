import React, { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaPaintBrush,
  FaHome,
  FaLeaf,
  FaLightbulb,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdDesignServices } from "react-icons/md";
import { Link } from "react-router-dom";

// import { useContactPopup } from "../ContactPopup";

const Footer = () => {
  const [animationKey, setAnimationKey] = useState(0);
  //   const { openContactPopup } = useContactPopup();

  useEffect(() => {
    // Simulate AOS animations with CSS transitions
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-in");
      }, index * 200);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-black via-black to-black text-white overflow-hidden">
      {/* Decorative Background Elements - Yellow accents (10%) */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16" data-animate>
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* <FaPaintBrush className="text-yellow-400 text-2xl" /> */}
            <h2 className="text-4xl md:text-5xl font-light tracking-wide text-white">
              College Circle
            </h2>
            {/* <FaHome className="text-yellow-400 text-2xl" /> */}
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Connecting college communities and creating meaningful educational
            experiences that empower students to achieve their goals
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About Section */}
          <div className="space-y-6" data-animate>
            <div className="flex items-center gap-3">
              {/* <MdDesignServices className="text-yellow-400 text-2xl" /> */}
              <h3 className="text-xl font-semibold text-white">Our Mission</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We believe education is the foundation of success. Our platform
              connects students, educators, and institutions to create a
              thriving academic community focused on growth and achievement.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-semibold text-yellow-400">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Student Communities",
                  path: "/colleges",
                },
                { name: "Academic Resources", path: "/study-materials" },
                {
                  name: "Career Guidance",
                  path: "/colab",
                },
                {
                  name: "courses",
                  path: "/courses",
                },
                {
                  name: "Mentorship Programs",
                  path: "/colab",
                },
                // { name: "Event Management", path: "/events" },
                {
                  name: "College Connect",
                  path: "/colleges",
                },
              ].map((service, index) => (
                <li key={index} className="group cursor-pointer">
                  <Link
                    to={service.path}
                    onClick={scrollToTop}
                    className="relative text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-semibold text-yellow-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Dashboard", path: "/dashboard" },
                // { name: "About Us", path: "/about" },
                { name: "Contact", path: "/colab" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
              ].map((link, index) => (
                <li key={index} className="group cursor-pointer">
                  <Link
                    to={link.path}
                    onClick={scrollToTop}
                    className="relative text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6" data-animate>
            <h3 className="text-xl font-semibold text-yellow-400">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                {/* <MdEmail className="text-yellow-400 text-lg mt-1 flex-shrink-0" /> */}
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a
                    href="mailto:contact.collegecircle@gmail.com"
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    contact.collegecircle@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                {/* <FaPhone className="text-yellow-400 text-lg mt-1 flex-shrink-0" /> */}
                <div>
                  <p className="text-gray-400 text-sm">Support</p>
                  <a
                    href="tel:+918333849231"
                    className="text-white hover:text-yellow-400 transition-colors duration-300"
                  >
                    +91 8333849231
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {/* <MdLocationOn className="text-yellow-400 text-lg mt-1 flex-shrink-0" /> */}
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <div className="text-white text-sm leading-relaxed">
                    Online Platform
                    <br />
                    Connecting Colleges Worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="text-center py-12 border-t border-gray-700/50"
          data-animate
        >
          <h3 className="text-3xl md:text-4xl font-light mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
            Ready to Join Our Community?
          </h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Connect with students, access resources, and build your academic
            network. Start your journey today!
          </p>
          {/* <button
            onClick={openContactPopup}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
          >
            Join CollegeCircle
          </button> */}
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-6 mb-8" data-animate>
          {[
            { icon: FaFacebookF, href: "#", color: "hover:bg-yellow-500" },
            { icon: FaTwitter, href: "#", color: "hover:bg-yellow-400" },
            {
              icon: FaInstagram,
              href: "https://www.instagram.com/collegecircle_cc",
              color: "hover:bg-yellow-500",
            },
            { icon: FaLinkedinIn, href: "#", color: "hover:bg-yellow-600" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full bg-gray-800 border border-gray-600 text-gray-300 hover:text-black transition-all duration-300 hover:scale-110 hover:border-transparent ${social.color}`}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="text-white">
            &copy; {new Date().getFullYear()} CollegeCircle All Rights Reserved.
          </p>
          <p className="mt-2 md:mt-0 text-white flex items-center gap-1">
            Crafted with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            by{" "}
            <a
              href="https://veereshnaik.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
            >
              Veeresh/AbhiramKaleru
            </a>
          </p>
        </div>
      </div>

      <style>{`
        [data-animate] {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        [data-animate].animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
