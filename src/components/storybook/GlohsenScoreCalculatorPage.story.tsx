import React from "react";
import GlohsenScoreCalculatorPage from "../../pages/GlohsenScoreCalculatorPage";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Pages/GlohsenScoreCalculatorPage",
  component: GlohsenScoreCalculatorPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return <GlohsenScoreCalculatorPage />;
}
