
import React from "react";
import Footer from "../Footer";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Components/Footer",
  component: Footer,
  argTypes: {
    isActive: { control: { type: "boolean" } },
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Footer isActive={true} />
    </div>
  );
}
