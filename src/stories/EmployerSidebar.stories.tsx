import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import  EmployerSidebar  from '../components/EmployerSidebar'; // Default export

export default {
  title: 'Components/EmployerSidebar',
  component: EmployerSidebar,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'padded', // Sidebar might need some padding
  },
  tags: ['autodocs'],
  argTypes: {},
} as Meta<typeof EmployerSidebar>;

export const Default: StoryObj<typeof EmployerSidebar> = {
  args: {
    // Assuming some default props might be needed, e.g.
    // onNavigate: (path: string) => console.log('Navigate to:', path),
    // activePage: 'dashboard',
  },
};
