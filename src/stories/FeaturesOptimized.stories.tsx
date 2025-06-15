import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import FeaturesOptimized from '../components/FeaturesOptimized'; // Default import

export default {
  title: 'Components/FeaturesOptimized',
  component: FeaturesOptimized,
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
  argTypes: {},
} as Meta<typeof FeaturesOptimized>;

export const Default: StoryObj<typeof FeaturesOptimized> = {
  args: {},
};
