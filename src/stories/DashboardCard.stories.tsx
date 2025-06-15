import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { BarChart2, Activity, DollarSign, CheckSquare } from 'lucide-react'; // Added more icons

// Updated DashboardCardProps to match the component's actual props
interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const meta: Meta<typeof DashboardCard> = {
  title: 'Components/DashboardCard',
  component: DashboardCard,
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: { control: 'text' },
    // children control is usually not needed as it's passed directly in args
    // icon control can be complex, better to pass specific icons in args
    className: { control: 'text' },
    // footer control can also be complex, better to pass specific ReactNode in args
  },
} as Meta<DashboardCardProps>; // Use the updated DashboardCardProps

export default meta;

type Story = StoryObj<typeof DashboardCard>;

export const Default: StoryObj<DashboardCardProps> = { // Use the updated DashboardCardProps
  args: {
    title: 'Total Users',
    icon: <BarChart2 size={24} />,
    children: <p className="text-2xl font-semibold">1,234</p>,
    footer: <p className="text-sm text-gray-500">Updated 5 minutes ago</p>,
  },
};

export const ActiveProjects: StoryObj<DashboardCardProps> = { // Use the updated DashboardCardProps
  args: {
    title: 'Active Projects',
    icon: <Activity size={24} />,
    children: <p className="text-2xl font-semibold">56</p>,
    footer: <a href="#" className="text-sm text-blue-500 hover:underline">View all projects</a>,
  },
};

export const Revenue: StoryObj<DashboardCardProps> = { // Use the updated DashboardCardProps
  args: {
    title: 'Monthly Revenue',
    icon: <DollarSign size={24} />,
    children: <p className="text-2xl font-semibold">$12,345</p>,
    footer: <p className="text-sm text-green-500">+5% from last month</p>,
  },
};

export const PendingTasks: StoryObj<DashboardCardProps> = { // Use the updated DashboardCardProps
  args: {
    title: 'Pending Tasks',
    icon: <CheckSquare size={24} />,
    children: <p className="text-2xl font-semibold">12</p>,
    // No footer for this example
  },
};
