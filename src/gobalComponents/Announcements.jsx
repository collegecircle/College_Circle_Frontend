import { Calendar } from "lucide-react";
import React from "react";

export const courseData = [
  {
    id: 1,
    title: "Art of Influence",
    description:
      "Experience the 'Art of Influence' in our transformative program designed for career excellence. Tailored for optimal learning, hands-on with intimate groups, and interactive methodologies.",
    imageUrl:
      "https://img.freepik.com/premium-photo/great-picture-image-will-make-your-work-more-beautiful_987032-103686.jpg",
    priority: "high",
    bullets: [
      "Guest Lectures from different Industries for diverse knowledge",
      "A hands-on approach that encourages active participation",
      "Curated for Personal & Professional Growth",
    ],
    isActive: true,
    announcementDate: "2025-01-15",
  },
  {
    id: 2,
    title: "DMX BootCamp",
    description:
      "Immerse yourself in DMX - Digital Marketing Experiential Bootcamp, a program that delves deeper into the intricacies of the digital marketing landscape with a comprehensive exploration.",
    imageUrl:
      "https://images.pexels.com/photos/25811351/pexels-photo-25811351.jpeg?cs=srgb&dl=pexels-kichu98-25811351.jpg&fm=jpg",
    priority: "medium",
    bullets: [
      "Diverse Industry Insights through Guest Lectures",
      "Active Participation in a Practical Approach like Ad Decoding",
      "Comprehensive Curriculum for Specialized Skillsets & Projects",
    ],
    isActive: true,
    announcementDate: "2025-02-10",
  },
  {
    id: 3,
    title: "Digital Marketing",
    description:
      "Master the tools and techniques of Digital Marketing in our comprehensive program. From SEO to social media marketing, learn how to create effective digital strategies that drive results.",
    imageUrl: "https://s.hdnux.com/photos/01/30/10/14/23102253/3/1200x0.jpg",
    priority: "high",
    bullets: [
      "Industry-recognized certification",
      "Real-world projects and case studies",
      "24/7 access to learning resources",
    ],
    isActive: true,
    announcementDate: "2025-03-01",
  },
  {
    id: 4,
    title: "Leadership Masterclass",
    description:
      "Develop essential leadership skills in our intensive Leadership Masterclass. Learn effective communication, team management, and decision-making strategies from industry experts.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/28/16/48/november-1865371_1280.jpg",
    priority: "low",
    bullets: [
      "Personalized leadership assessment",
      "One-on-one mentoring sessions",
      "Networking opportunities with industry leaders",
    ],
    isActive: true,
    announcementDate: "2025-04-15",
  },
];
const CourseCard = ({
  title,
  description,
  imageUrl,
  bullets,
  isActive,
  announcementDate,
  isDark,
}) => {
  const theme = isDark
    ? {
        bg: "#000000",
        textColor: "text-white",
        accentColor: "text-[#f8d00d]",
        badgeBg: "bg-[#f8d00d]",
        badgeText: "text-black",
        borderColor: "border-[#f8d00d]",
        bulletColor: "text-[#f8d00d]",
        cardBorder: "border-gray-800",
      }
    : {
        bg: "#ffffff",
        textColor: "text-black",
        accentColor: "text-black",
        badgeBg: "bg-black",
        badgeText: "text-white",
        borderColor: "border-black",
        bulletColor: "text-gray-800",
        cardBorder: "border-gray-200",
      };

  // Format announcement date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{ backgroundColor: theme.bg }}
      className={`sticky top-[60px] sm:top-[80px] md:top-[120px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-5 md:p-8 rounded-xl ${theme.textColor} shadow-xl border ${theme.cardBorder} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="info md:col-span-1 lg:col-span-3 space-y-5">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div
            className={`flex items-center gap-2 ${theme.badgeBg} w-fit px-4 py-2 rounded-full ${theme.badgeText} shadow-md`}
          >
            <p className="my-auto font-bold text-xs uppercase">
              <Calendar className="h-4 w-4 inline-block mr-1" />
              {formatDate(announcementDate)}
            </p>
          </div>
        </div>

        <div>
          <h2
            className={`text-2xl md:text-3xl font-bold inline-block pb-2 ${theme.borderColor}`}
            style={{
              borderBottom: `2px solid`,
              borderColor: isDark ? "#f8d00d" : "black",
            }}
          >
            {title}
          </h2>
        </div>

        <p className="text-sm md:text-base leading-relaxed">{description}</p>

        <div className="flex flex-col gap-3 pt-2">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex gap-3 items-start group">
              <span
                className={`${theme.bulletColor} text-lg transform group-hover:translate-x-1 transition-transform duration-200`}
              >
                →
              </span>
              <p className="text-xs md:text-sm">{bullet}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-1 lg:col-span-2 flex items-center justify-center h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto rounded-lg object-cover shadow-lg hover:shadow-xl transition-shadow duration-300 max-h-80"
        />
      </div>
    </div>
  );
};

const CoursesContainer = () => {
  return (
    <section className="py-8 pb-16 flex flex-col space-y-16 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Our Courses
      </h1>
      <div className="space-y-0">
        {courseData.map((course, index) => (
          <CourseCard key={course.id} {...course} isDark={index % 2 === 0} />
        ))}
      </div>
    </section>
  );
};

export default CoursesContainer;
