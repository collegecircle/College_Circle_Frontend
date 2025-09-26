import React, { useState } from "react";
import JobsManagement from "../adminDashboard/JobsManagement";
import CollegesManagement from "../adminDashboard/CollegesManagement";
import CoursesManagement from "../adminDashboard/CoursesManagement";
import {
  Menu,
  X,
  Briefcase,
  GraduationCap,
  BookOpen,
  LogOut,
  Video,
} from "lucide-react";
import OnlineCourseManagement from "./OnlineCourseManagement";
import AnnouncementManagement from "./AnnouncementManagement";

const AdminDashboard = ({ navigateTo, handleLogout }) => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "colleges", label: "Colleges", icon: GraduationCap },
    { id: "study-materials", label: "study-materials", icon: BookOpen },
    { id: "online-courses", label: "Online Courses", icon: Video },
    { id: "announcements", label: "Announcements", icon: BookOpen },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "jobs":
        return <JobsManagement />;
      case "colleges":
        return <CollegesManagement />;
      case "study-materials":
        return <CoursesManagement />;
      case "online-courses":
        return <OnlineCourseManagement />;
      case "announcements":
        return <AnnouncementManagement />;
      default:
        return <JobsManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 ">
            {/* Left side: Title */}
            <div className="flex items-center min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                Admin Dashboard
              </h1>
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden xl:flex space-x-1 mx-4">
              {tabs.map((tab) => {
                // const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
                                            flex items-center px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap
                                            ${
                                              activeTab === tab.id
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                            }
                                        `}
                  >
                    {/* <Icon className="w-4 h-4 mr-2" /> */}
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* Right side: Logout + Mobile menu button */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Logout Button - Responsive sizing */}
              <button
                onClick={handleLogout}
                className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow transition-colors duration-200"
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Logout</span>
                <span className="xs:hidden">Out</span>
              </button>

              {/* Mobile menu button - Shows on tablet and mobile */}
              <div className="xl:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                >
                  {isMobileMenuOpen ? (
                    <X className="block h-5 w-5 sm:h-6 sm:w-6" />
                  ) : (
                    <Menu className="block h-5 w-5 sm:h-6 sm:w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="xl:hidden pb-3 sm:pb-4 border-t border-gray-100 mt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`
            px-3 sm:px-4 py-3 sm:py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 w-full
            ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }
          `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tablet Navigation Bar - Shows only on tablet sizes */}
      <div className="hidden md:block xl:hidden bg-white border-b shadow-sm sticky top-14 sm:top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-center space-x-1 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                                        flex items-center px-4 lg:px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 min-w-0 flex-1 justify-center
                                        ${
                                          activeTab === tab.id
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        }
                                    `}
                >
                  {/* <Icon className="w-4 h-4 mr-2 flex-shrink-0" /> */}
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="bg-white rounded-lg shadow-sm border min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-200px)]">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Mobile Tab Indicator - Only on small screens */}
            <div className="md:hidden mb-4 sm:mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <span>Current:</span>
                  <div className="flex items-center space-x-2 text-blue-600 font-medium">
                    {(() => {
                      const currentTab = tabs.find(
                        (tab) => tab.id === activeTab
                      );
                      const Icon = currentTab?.icon;
                      return (
                        <>
                          {/* <Icon className="w-4 h-4 flex-shrink-0" /> */}
                          <span className="truncate">{currentTab?.label}</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full overflow-x-auto">{renderContent()}</div>
          </div>
        </div>
      </main>

      {/* Bottom spacing for mobile */}
      <div className="h-12 sm:h-16 md:h-8"></div>
    </div>
  );
};

export default AdminDashboard;
