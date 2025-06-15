import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import EmployerCriteriaWeights from '../components/EmployerCriteriaWeights'; // Default import

export default {
  title: 'Components/EmployerCriteriaWeights',
  component: EmployerCriteriaWeights,
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
} as Meta<typeof EmployerCriteriaWeights>;

export const Default: StoryObj<typeof EmployerCriteriaWeights> = {
  args: {},
};
