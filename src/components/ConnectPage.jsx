// components/ConnectPage.js
import React from "react";
import StudentGroups from "./StudentGroups";

const ConnectPage = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-gray-800">Connect</h1>
    <div className="grid md:grid-cols-2 gap-6">
      <StudentGroups />
    </div>
  </div>
);

export default ConnectPage;
