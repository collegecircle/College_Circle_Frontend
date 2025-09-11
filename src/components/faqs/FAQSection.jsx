// import React, { useState, useRef } from "react";
// import "./faqs.css";
// import { FaPlus } from "react-icons/fa"; // ✅ Correct import

// const FAQSection = () => {
//   const [activeFAQ, setActiveFAQ] = useState(null);
//   const faqRef = useRef(null);

//   const toggleFAQ = (index) => {
//     setActiveFAQ((prev) => (prev === index ? null : index));
//   };

//   const faqs = [
//     {
//       question: "Do you provide home interior design only in Hyderabad?",
//       answer:
//         "While our studio is based in Hyderabad, we offer our premium interior design services across India, depending on the project scope and requirements.",
//     },
//     {
//       question: "How long does it take to complete a project?",
//       answer:
//         "The timeline depends on the complexity and scope of the project.",
//       li1: "Full home interiors: 6 to 12 weeks",
//       li2: "Single-room design: 3 to 6 weeks",
//       li3: "Renovations: Varies based on scope",
//       end: "We provide a detailed timeline after understanding your specific needs.",
//     },
//     {
//       question: "How long does it take to complete a project?",
//       answer:
//         "The timeline depends on the complexity and scope of the project.",
//       li1: "Full home interiors: 6 to 12 weeks",
//       li2: "Single-room design: 3 to 6 weeks",
//       li3: "Renovations: Varies based on scope",
//       end: "We provide a detailed timeline after understanding your specific needs.",
//     },
//     {
//       question: "How long does it take to complete a project?",
//       answer:
//         "The timeline depends on the complexity and scope of the project.",
//       li1: "Full home interiors: 6 to 12 weeks",
//       li2: "Single-room design: 3 to 6 weeks",
//       li3: "Renovations: Varies based on scope",
//       end: "We provide a detailed timeline after understanding your specific needs.",
//     },
//     {
//       question: "How long does it take to complete a project?",
//       answer:
//         "The timeline depends on the complexity and scope of the project.",
//       li1: "Full home interiors: 6 to 12 weeks",
//       li2: "Single-room design: 3 to 6 weeks",
//       li3: "Renovations: Varies based on scope",
//       end: "We provide a detailed timeline after understanding your specific needs.",
//     },
//     {
//       question: "How long does it take to complete a project?",
//       answer:
//         "The timeline depends on the complexity and scope of the project.",
//       li1: "Full home interiors: 6 to 12 weeks",
//       li2: "Single-room design: 3 to 6 weeks",
//       li3: "Renovations: Varies based on scope",
//       end: "We provide a detailed timeline after understanding your specific needs.",
//     },
//     // ... other FAQs
//   ];

//   return (
//     <div className="faq">
//       <ul className="faq-list">
//         {faqs.map((faq, index) => (
//           <li
//             key={index}
//             className={`faqli ${activeFAQ === index ? "open" : ""}`}
//           >
//             <button
//               className="faq-toggle"
//               onClick={() => toggleFAQ(index)}
//               aria-expanded={activeFAQ === index}
//             >
//               {faq.question}{" "}
//               <FaPlus
//                 className={`transition-transform duration-300 ${
//                   activeFAQ === index ? "rotate-45" : ""
//                 }`}
//               />
//             </button>
//             <div id={`faq${index}`} className="collapse">
//               {activeFAQ === index && (
//                 <div>
//                   <p>{faq.answer}</p>
//                   {faq.li1 && (
//                     <p className="mt-1 flex gap-2">
//                       <span>→</span>
//                       {faq.li1}
//                     </p>
//                   )}
//                   {faq.li2 && (
//                     <p className="mt-1 flex gap-2">
//                       <span>→</span>
//                       {faq.li2}
//                     </p>
//                   )}
//                   {faq.li3 && (
//                     <p className="mt-1 flex gap-2">
//                       <span>→</span>
//                       {faq.li3}
//                     </p>
//                   )}
//                   {faq.li4 && (
//                     <p className="mt-1 flex gap-2">
//                       <span>→</span>
//                       {faq.li4}
//                     </p>
//                   )}
//                   {faq.end && <p className="mt-2">{faq.end}</p>}
//                 </div>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FAQSection;

import React, { useState } from "react";
import { Plus } from "lucide-react";

const FAQSection = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      question: "Do you provide home interior design only in Hyderabad?",
      answer:
        "While our studio is based in Hyderabad, we offer our premium interior design services across India, depending on the project scope and requirements.",
    },
    {
      question: "How long does it take to complete a project?",
      answer:
        "The timeline depends on the complexity and scope of the project.",
      li1: "Full home interiors: 6 to 12 weeks",
      li2: "Single-room design: 3 to 6 weeks",
      li3: "Renovations: Varies based on scope",
      end: "We provide a detailed timeline after understanding your specific needs.",
    },
    {
      question: "What is included in your interior design services?",
      answer: "Our comprehensive interior design services include:",
      li1: "Space planning and layout design",
      li2: "Color schemes and material selection",
      li3: "Furniture and decor recommendations",
      li4: "3D visualization and renders",
      end: "We handle everything from concept to completion.",
    },
    {
      question: "Do you work within specific budgets?",
      answer:
        "Yes, we work with various budget ranges and always discuss costs upfront.",
      li1: "Budget consultation and planning",
      li2: "Transparent pricing with no hidden costs",
      li3: "Flexible payment options available",
      end: "We believe great design should be accessible to everyone.",
    },
    {
      question: "Can I see examples of your previous work?",
      answer:
        "Absolutely! We have an extensive portfolio showcasing our diverse projects.",
      li1: "Residential apartments and villas",
      li2: "Commercial spaces and offices",
      li3: "Renovations and makeovers",
      end: "Contact us to view our complete portfolio and client testimonials.",
    },
    {
      question: "What makes your design approach unique?",
      answer:
        "Our design philosophy combines functionality with aesthetic appeal.",
      li1: "Personalized design solutions",
      li2: "Sustainable and eco-friendly materials",
      li3: "Latest trends with timeless appeal",
      end: "Every project reflects our client's personality and lifestyle.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Responsive heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-10 md:mb-12 leading-tight">
          Frequently <span className="text-yellow-400">Asked Questions</span>
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-black-900 border border-black-700 rounded-lg transition-all duration-300 hover:border-yellow-400 ${activeFAQ === index ? "border-t-4 border-white bg-black-900" : ""
                }`}
            >
              {/* Responsive button */}
              <button
                className="w-full p-4 sm:p-5 md:p-6 text-left flex justify-between items-center focus:outline-none group"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeFAQ === index}
                aria-controls={`faq-content-${index}`}
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-200 pr-4 leading-relaxed">
                  {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:text-yellow-400 transition-all duration-300 transform flex-shrink-0"
                  style={{
                    transform: activeFAQ === index ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>

              {/* Responsive content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${activeFAQ === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  <div className="border-t border-gray-700 pt-3 sm:pt-4">
                    <p className="text-gray-300 mb-3 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>

                    {faq.li1 && (
                      <div className="space-y-2 ml-2 sm:ml-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="text-yellow-400 mt-1 text-sm sm:text-base flex-shrink-0">→</span>
                          <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.li1}</span>
                        </div>
                        {faq.li2 && (
                          <div className="flex items-start gap-2 sm:gap-3">
                            <span className="text-yellow-400 mt-1 text-sm sm:text-base flex-shrink-0">→</span>
                            <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.li2}</span>
                          </div>
                        )}
                        {faq.li3 && (
                          <div className="flex items-start gap-2 sm:gap-3">
                            <span className="text-yellow-400 mt-1 text-sm sm:text-base flex-shrink-0">→</span>
                            <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.li3}</span>
                          </div>
                        )}
                        {faq.li4 && (
                          <div className="flex items-start gap-2 sm:gap-3">
                            <span className="text-yellow-400 mt-1 text-sm sm:text-base flex-shrink-0">→</span>
                            <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{faq.li4}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {faq.end && (
                      <p className="text-gray-300 mt-3 sm:mt-4 italic text-sm sm:text-base leading-relaxed">
                        {faq.end}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive contact section */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-gray-400 mb-4 py-2 sm:py-4 text-sm sm:text-base">
            Still have questions? We're here to help!
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-colors duration-200 text-sm sm:text-base">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
