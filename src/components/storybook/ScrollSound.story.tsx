
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ScrollSound from "../ScrollSound";

const meta: Meta<typeof ScrollSound> = {
  title: "Components/ScrollSound",
  component: ScrollSound,
  argTypes: {
    isSoundEnabled: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollSound>;

export const Default: Story = {
  args: {
    isSoundEnabled: true,
    toggleSound: () => alert("Toggled sound"),
  },
  render: (args) => (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <ScrollSound {...args} />
    </div>
  ),
};
