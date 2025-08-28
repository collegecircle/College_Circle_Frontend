import { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Sparkles,
  Home,
  Info,
  Image,
  Mail,
} from "lucide-react";

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);
  const [serviceHover, setServiceHover] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(prevScroll > currentScroll || currentScroll < 10);
      setPrevScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  const navItems = [
    { path: "#home", label: "Home", icon: Home },
    { path: "#colleges", label: "Colleges", icon: Home },
    { path: "#jobs", label: "Jobs", icon: Home },
    { path: "#courses", label: "Courses", icon: Home },
    { path: "#about", label: "About", icon: Info },
    // {
    //   label: "Services",
    //   icon: Sparkles,
    //   hasSubmenu: true,
    //   subItems: [
    //     {
    //       path: "/residential",
    //       label: "Residential Interiors",
    //       desc: "Create your perfect living space",
    //     },
    //     {
    //       path: "/commercial",
    //       label: "Commercial Interiors",
    //       desc: "Professional workplace designs",
    //     },
    //     {
    //       path: "/turnkey",
    //       label: "Turnkey Solutions",
    //       desc: "End-to-end project management",
    //     },
    //     {
    //       path: "/furniture",
    //       label: "Custom Furniture",
    //       desc: "Bespoke furniture solutions",
    //     },
    //     {
    //       path: "/renovation",
    //       label: "Renovation & Remodeling",
    //       desc: "Transform existing spaces",
    //     },
    //     {
    //       path: "/landscaping",
    //       label: "Landscaping",
    //       desc: "Beautiful outdoor spaces",
    //     },
    //     {
    //       path: "/3d-rendering",
    //       label: "3D Rendering",
    //       desc: "Visualize your dream space",
    //     },
    //   ],
    // },
    { path: "#gallery", label: "Gallery", icon: Image },
    { path: "#contact", label: "Contact", icon: Mail },
    { path: "#faqs", label: "Faqs", icon: Mail },
    { path: "#Events", label: "Events", icon: Mail },
  ];

  const handleServiceClick = (e) => {
    e.preventDefault();
    setServiceHover(!serviceHover);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${visible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl border-b border-gray-800"></div>

      {/* Animated yellow accent border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

      <nav className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 hover:bg-yellow-600">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-10 h-10 bg-yellow-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">InteriorCo</h1>
              <p className="text-xs text-gray-300 -mt-1">Design Studio</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                {item.hasSubmenu ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServiceHover(true)}
                    onMouseLeave={() => setServiceHover(false)}
                  >
                    <button
                      onClick={handleServiceClick}
                      className={`group flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${serviceHover
                        ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                        }`}
                    >
                      {/* <item.icon className="w-4 h-4 mr-2" /> */}
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform duration-300 ${serviceHover ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Modern Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 transition-all duration-300 transform origin-top ${serviceHover
                        ? "opacity-100 visible scale-100"
                        : "opacity-0 invisible scale-95"
                        }`}
                    >
                      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                        {/* Dropdown header */}
                        <div className="p-4 bg-gray-800 border-b border-gray-700">
                          <h3 className="text-white font-semibold text-lg">
                            Our Services
                          </h3>
                          <p className="text-gray-300 text-sm">
                            Premium design solutions
                          </p>
                        </div>

                        {/* Services Grid */}
                        <div className="p-2 max-h-80 overflow-y-auto">
                          {item.subItems.map((subItem, subIdx) => (
                            <a
                              key={subIdx}
                              href={subItem.path}
                              className="group flex items-start p-3 rounded-xl hover:bg-gray-800 transition-all duration-300 border border-transparent hover:border-yellow-400/20"
                            >
                              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 group-hover:bg-yellow-600">
                                <Sparkles className="w-4 h-4 text-black" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium text-sm group-hover:text-yellow-400 transition-colors duration-300">
                                  {subItem.label}
                                </h4>
                                <p className="text-gray-300 text-xs mt-1 transition-colors duration-300">
                                  {subItem.desc}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>

                        {/* CTA Footer */}
                        <div className="p-4 bg-gray-800 border-t border-gray-700">
                          <button className="w-full bg-yellow-500 text-black py-2 px-4 rounded-xl font-medium hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
                            Schedule Consultation
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className="group flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                  >
                    {/* <item.icon className="w-4 h-4 mr-2" /> */}
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop CTA */}
            <a
              href="tel:+919398788407"
              className="hidden lg:flex items-center px-6 py-2 bg-yellow-500 text-black rounded-xl font-medium hover:bg-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 hover:scale-105"
            >
              <Phone className="w-4 h-4 mr-2" />
              +91 93987 88407
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full transition-all duration-300 ${isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
            }`}
        >
          <div className="mx-4 mt-2 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.hasSubmenu ? (
                    <div>
                      <button
                        onClick={() => setServiceHover(!serviceHover)}
                        className="w-full flex items-center justify-between p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                      >
                        <div className="flex items-center">
                          {/* <item.icon className="w-5 h-5 mr-3" /> */}
                          {item.label}
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${serviceHover ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {/* Mobile Submenu */}
                      <div
                        className={`ml-8 mt-2 space-y-1 transition-all duration-300 overflow-hidden ${serviceHover
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                          }`}
                      >
                        {item.subItems.map((subItem, subIdx) => (
                          <a
                            key={subIdx}
                            href={subItem.path}
                            className="block p-2 rounded-lg text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all duration-300"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.path}
                      className="flex items-center p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* <item.icon className="w-5 h-5 mr-3" /> */}
                      {item.label}
                    </a>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-800">
                <a
                  href="tel:+919398788407"
                  className="flex items-center justify-center w-full p-3 bg-yellow-500 text-black rounded-xl font-medium hover:bg-yellow-600 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +91 93987 88407
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ModernNavbar;
