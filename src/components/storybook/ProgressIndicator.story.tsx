
import React from "react";
import ProgressIndicator from "../ProgressIndicator";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Components/ProgressIndicator",
  component: ProgressIndicator,
  argTypes: {
    currentSection: { control: { type: "number" } },
    totalSections: { control: { type: "number" } },
    chapterTitles: { control: { type: "array" } },
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ProgressIndicator 
        currentSection={0}
        totalSections={5}
        scrollToSection={(index) => alert(`Scroll to section ${index}`)}
        chapterTitles={["Introduction", "Features", "How It Works", "Feedback", "Footer"]}
      />
    </div>
  );
}
