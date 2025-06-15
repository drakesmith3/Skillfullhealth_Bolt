import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import EarthLogo from '../components/EarthLogo'; // Adjust path
import { ThemeProvider } from '../contexts/ThemeContext';

const meta: Meta<typeof EarthLogo> = {
  title: 'Components/EarthLogo',
  component: EarthLogo,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', background: '#1a202c' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: { control: { type: 'range', min: 50, max: 300, step: 10 } },
    rotationSpeed: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
  },
};

export default meta;

type Story = StoryObj<typeof EarthLogo>;

export const Default: Story = {
  args: {
    size: 150,
    rotationSpeed: 0.5,
  },
};

export const LargerSize: Story = {
  args: {
    size: 250,
    rotationSpeed: 0.3,
  },
};

export const FasterRotation: Story = {
  args: {
    size: 100,
    rotationSpeed: 1.5,
  },
};

export const Static: Story = {
  args: {
    size: 120,
    rotationSpeed: 0,
  },
};
