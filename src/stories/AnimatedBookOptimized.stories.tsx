import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AnimatedBookOptimizedComponent from '../components/AnimatedBookOptimized'; // Renamed import
import { ThemeProvider } from '../contexts/ThemeContext';

const meta: Meta<typeof AnimatedBookOptimizedComponent> = { // Changed to Renamed import
  title: 'Components/AnimatedBookOptimized',
  component: AnimatedBookOptimizedComponent, // Changed to Renamed import
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px', background: '#f0f0f0' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    autoPlay: { control: 'boolean' },
    timerDuration: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedBookOptimizedComponent>; // Changed to Renamed import

export const Default: Story = {
  args: {
    autoPlay: true,
    timerDuration: 5000,
  },
};

export const NonAutoPlaying: Story = {
  args: {
    autoPlay: false,
    timerDuration: 5000,
  },
};
