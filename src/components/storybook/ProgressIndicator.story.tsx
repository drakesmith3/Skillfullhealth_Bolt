import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ProgressIndicator, { ProgressIndicatorProps } from "../ProgressIndicator";

export default {
  title: "Components/ProgressIndicator",
  component: ProgressIndicator,
  argTypes: {
    currentSection: { control: { type: "number" } },
    totalSections: { control: { type: "number" } },
    chapterTitles: { control: { type: "array" } },
  },
} as ComponentMeta<typeof ProgressIndicator>;

const Template: ComponentStory<typeof ProgressIndicator> = (args) => (
  <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <ProgressIndicator {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  currentSection: 0,
  totalSections: 5,
  scrollToSection: (index: number) => alert(`Scroll to section ${index}`),
  chapterTitles: ["Introduction", "Features", "How It Works", "Feedback", "Footer"],
};
