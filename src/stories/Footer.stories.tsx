import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer'; // Corrected path
import { ThemeProvider } from '../contexts/ThemeContext'; // Corrected path
import { SoundProvider } from '../contexts/SoundContext'; // Corrected path

interface FooterProps {
  // Define other props that Footer accepts
  // Ensure showReturnToTop is not defined here if it's not a valid prop
}

const meta: Meta<FooterProps> = {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <SoundProvider playClickSound={() => console.log('Storybook: playClickSound mock')} isSoundEnabled={true}>
            <Story />
          </SoundProvider>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Footer typically spans full width
  },
  argTypes: {
    // Removed showReturnToTop as it's not a recognized prop
    // Add other relevant argTypes for existing props
  },
};

export default meta;

type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {
    playClickSound: () => console.log('Storybook: playClickSound mock from args'),
    // Removed showReturnToTop: true,
    // Add args for other existing props
  },
};

export const WithoutReturnToTop: Story = {
  args: {
    playClickSound: () => console.log('Storybook: playClickSound mock from args'),
    // Removed showReturnToTop: false,
    // Add args for other existing props
  },
};
