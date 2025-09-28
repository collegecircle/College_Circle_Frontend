import axios from "axios";
import { Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CoursesContainer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/announcements/get-active-announcements`
      );

      setCourseData(res?.data.data.activeAnnouncements);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const CourseCard = ({ course, isDark }) => {
    const { title, description, imageUrl, bullets, announcementDate } = course;

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

    const formatDate = (firestoreDate) => {
      if (!firestoreDate?._seconds) return "";
      const date = new Date(firestoreDate._seconds * 1000);
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
            {bullets?.map((bullet, index) => (
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

  return (
    <section className="py-8 pb-16 flex flex-col space-y-16 max-w-7xl mx-auto px-4 sm:px-4 lg:px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-10">
        Announcements
      </h1>
      <div className="space-y-0">
        {courseData?.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            isDark={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default CoursesContainer;
