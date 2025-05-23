import React from "react";
import ProfessionalDashboard from "../../pages/ProfessionalDashboard";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/ProfessionalDashboard",
  component: ProfessionalDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <ProfessionalDashboard />;
}
