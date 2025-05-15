import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Footer from "../Footer";

export default {
  title: "Components/Footer",
  component: Footer,
  argTypes: {
    isActive: { control: { type: "boolean" } },
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => (
  <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
    <Footer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isActive: true,
};
