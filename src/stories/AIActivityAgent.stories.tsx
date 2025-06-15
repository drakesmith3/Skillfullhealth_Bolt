import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AIActivityAgent from '../components/AIActivityAgent';
import { ThemeProvider } from '../contexts/ThemeContext';

const meta: Meta<typeof AIActivityAgent> = {
  title: 'Components/AIActivityAgent',
  component: AIActivityAgent,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Define argTypes for props if any, e.g.:
    // initialMessages: { control: 'object' },
    // onNewLog: { action: 'newLog' },
  },
};

export default meta;

type Story = StoryObj<typeof AIActivityAgent>;

export const Default: Story = {
  args: {
    // Add default props here if any
    // initialMessages: [{ id: '1', text: 'Hello from AI', sender: 'ai' }],
  },
};
