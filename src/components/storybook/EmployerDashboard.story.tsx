import React from "react";
import EmployerDashboard from "../../pages/EmployerDashboard";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/EmployerDashboard",
  component: EmployerDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <EmployerDashboard />;
}
