
import { Meta, StoryObj } from '@storybook/react';
import HowItWorks from '../HowItWorks';

const meta = {
  title: 'Sections/HowItWorks',
  component: HowItWorks,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HowItWorks>;

export default meta;
type Story = StoryObj<typeof meta>;

// Add the required props to match the HowItWorksProps interface
export const Default: Story = {
  args: {
    isActive: true,
    sectionName: "HowItWorks",
  },
};
