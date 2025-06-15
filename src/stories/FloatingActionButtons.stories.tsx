import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import FloatingActionButtons from '../components/FloatingActionButtons'; // Corrected path
import { ThemeProvider } from '../contexts/ThemeContext'; // Corrected path
import { SoundProvider } from '../contexts/SoundContext'; // Corrected path
import { Toaster } from '../components/ui/toaster'; // Corrected path

const meta: Meta<typeof FloatingActionButtons> = {
  title: 'Components/FloatingActionButtons',
  component: FloatingActionButtons,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <SoundProvider playClickSound={() => console.log('Storybook: playClickSound mock')} isSoundEnabled={true}>
            <div style={{ minHeight: '300px', padding: '2rem', position: 'relative' }}> {/* Ensure enough space for FABs */}
              <Story />
              <Toaster /> {/* Required for toast notifications to appear */}
            </div>
          </SoundProvider>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded', // Use padded or fullscreen depending on how FABs are positioned
  },
  // Add argTypes if FloatingActionButtons accepts props
};

export default meta;

type Story = StoryObj<typeof FloatingActionButtons>;

export const Default: Story = {
  args: {
    // Add default props if any
  },
};
