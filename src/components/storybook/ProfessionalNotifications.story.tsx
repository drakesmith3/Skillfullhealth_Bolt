import React from "react";
import ProfessionalNotifications from "../../pages/ProfessionalNotifications";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/ProfessionalNotifications",
  component: ProfessionalNotifications,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <ProfessionalNotifications />;
}
