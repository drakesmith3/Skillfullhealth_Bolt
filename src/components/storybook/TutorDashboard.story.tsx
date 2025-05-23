import React from "react";
import TutorDashboard from "../../pages/TutorDashboard";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/TutorDashboard",
  component: TutorDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <TutorDashboard />;
}
