import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ScrollSound from "../ScrollSound";

export default {
  title: "Components/ScrollSound",
  component: ScrollSound,
  argTypes: {
    isSoundEnabled: { control: { type: "boolean" } },
  },
} as ComponentMeta<typeof ScrollSound>;

const Template: ComponentStory<typeof ScrollSound> = (args) => (
  <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <ScrollSound {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isSoundEnabled: true,
  toggleSound: () => alert("Toggled sound"),
};
