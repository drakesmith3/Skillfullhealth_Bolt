import React from "react";
import ClientDashboard from "../../pages/ClientDashboard";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/ClientDashboard",
  component: ClientDashboard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <ClientDashboard />;
}
