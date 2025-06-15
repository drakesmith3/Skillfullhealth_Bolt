import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TutorSidebar from '../components/TutorSidebar';

export default {
  title: 'Components/TutorSidebar',
  component: TutorSidebar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ display: 'flex', height: '100vh' }}>
          <Story />
          <div style={{ padding: '20px', flexGrow: 1 }}>
            <p>Main content area beside the sidebar.</p>
          </div>
        </div>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof TutorSidebar>;

export const Default: StoryObj<typeof TutorSidebar> = {
  args: {},
};
