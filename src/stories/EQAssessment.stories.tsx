import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import EQAssessment from '../components/EQAssessment'; // Default export

export default {
  title: 'Components/EQAssessment',
  component: EQAssessment,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} as Meta<typeof EQAssessment>;

export const Default: StoryObj<typeof EQAssessment> = {
  args: {
    // assessmentId: 'eq-test-1', // Example prop
  },
};
