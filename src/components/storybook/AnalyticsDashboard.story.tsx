
import React from "react";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";

const meta = {
  title: "Components/Analytics/AnalyticsDashboard",
  component: AnalyticsDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export function Default() {
  return (
    <div className="p-6 bg-gray-50">
      <AnalyticsDashboard />
    </div>
  );
}

export function DarkMode() {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <AnalyticsDashboard />
    </div>
  );
}
