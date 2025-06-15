import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Logo3DHyperRealistic from '../components/Logo3DHyperRealistic'; // Corrected path
import { ThemeProvider } from '../contexts/ThemeContext'; // Corrected path

const meta: Meta<typeof Logo3DHyperRealistic> = {
  title: 'Components/Logo3DHyperRealistic',
  component: Logo3DHyperRealistic,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#333' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Logo3DHyperRealistic>;

export const DefaultSize: Story = {
  args: {
    size: 120,
  },
};

export const LargerSize: Story = {
  args: {
    size: 200,
  },
};

export const SmallerSize: Story = {
  args: {
    size: 80,
  },
};
