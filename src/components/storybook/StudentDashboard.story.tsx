import React from "react";
import StudentDashboard from "../../pages/StudentDashboard";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/StudentDashboard",
  component: StudentDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <StudentDashboard />;
}
