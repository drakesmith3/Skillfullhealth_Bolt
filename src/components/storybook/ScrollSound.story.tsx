
import React from "react";
import ScrollSound from "../ScrollSound";

// Define the component story without depending on @storybook/react
const meta = {
  title: "Components/ScrollSound",
  component: ScrollSound,
  argTypes: {
    isSoundEnabled: { control: { type: "boolean" } },
  },
};

export default meta;

// Create the default story without using StoryObj
export function Default() {
  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ScrollSound 
        isSoundEnabled={true}
        toggleSound={() => alert("Toggled sound")}
      />
    </div>
  );
}
