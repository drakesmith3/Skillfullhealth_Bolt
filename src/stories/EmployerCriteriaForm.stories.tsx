import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import EmployerCriteriaForm from '../components/EmployerCriteriaForm'; // Default import

export default {
  title: 'Components/EmployerCriteriaForm',
  component: EmployerCriteriaForm,
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
} as Meta<typeof EmployerCriteriaForm>;

export const Default: StoryObj<typeof EmployerCriteriaForm> = {
  args: {},
};
