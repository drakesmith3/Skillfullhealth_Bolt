import type { Meta, StoryObj } from '@storybook/react';
import ThemeToggle from '../components/ThemeToggle'; // Changed to default import
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext'; // Corrected path for ThemeProvider and useTheme

export default {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <Story />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} as Meta<typeof ThemeToggle>;

export const Default: StoryObj<typeof ThemeToggle> = {
  args: {},
};
