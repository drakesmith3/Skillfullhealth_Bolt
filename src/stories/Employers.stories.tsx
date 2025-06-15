import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import  Employers  from '../components/Employers'; // Default export

export default {
  title: 'Components/Employers',
  component: Employers,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen', // Employers page might be full screen
  },
  tags: ['autodocs'],
  argTypes: {},
} as Meta<typeof Employers>;

export const Default: StoryObj<typeof Employers> = {
  args: {},
};
