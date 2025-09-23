import React from "react";
import PageHeader from "../../gobalComponents/PageHeader";

const NewCoursePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex flex-col">
      <PageHeader
        title="Courses"
        highlightedWord=""
        highlightColor="yellow-400"
        underlineColor="yellow-400"
        description="Enhance your expertise with industry-relevant courses and Stuff"
      />
    </div>
  );
};

export default NewCoursePage;
