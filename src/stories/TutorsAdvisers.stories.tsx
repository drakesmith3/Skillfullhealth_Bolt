import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TutorsAdvisers from '../components/TutorsAdvisers'; // Changed to default import

export default {
  title: 'Components/TutorsAdvisers',
  component: TutorsAdvisers,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} as Meta<typeof TutorsAdvisers>;

export const Default: StoryObj<typeof TutorsAdvisers> = {
  args: {},
};
