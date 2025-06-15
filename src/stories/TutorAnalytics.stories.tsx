import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TutorAnalytics from '../components/TutorAnalytics'; // Changed to default import

export default {
  title: 'Components/TutorAnalytics',
  component: TutorAnalytics,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // tutorId: { control: 'text' }, // Example prop
  },
} as Meta<typeof TutorAnalytics>;

export const Default: StoryObj<typeof TutorAnalytics> = {
  args: {
    // tutorId: 'tutor-xyz-123',
  },
};
