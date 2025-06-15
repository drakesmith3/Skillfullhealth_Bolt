import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import SuccessStories from '../components/SuccessStories'; // Changed to default import

export default {
  title: 'Components/SuccessStories',
  component: SuccessStories,
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
  argTypes: {},
} as Meta<typeof SuccessStories>;

export const Default: StoryObj<typeof SuccessStories> = {
  args: {},
};
