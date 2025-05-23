
import React from "react";
import HowItWorks from "../../components/HowItWorks";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Components/HowItWorks",
  component: HowItWorks,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <HowItWorks isActive={true} sectionName="HowItWorks" />;
}
