import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Card3D from '../components/Card3D';
import { ThemeProvider } from '../contexts/ThemeContext'; // Assuming it might use theme

// Updated Card3DProps to match the component's actual props
interface Card3DProps {
  title: string;
  value: string | React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'default';
  className?: string;
}

const meta: Meta<Card3DProps> = {
  title: 'Components/Card3D',
  component: Card3D,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', background: '#f0f0f0' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' }, // Control for string input, ReactNode can be passed directly in args
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'default'],
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<Card3DProps>;

export const Default: Story = {
  args: {
    title: 'Default Card Title',
    value: 'This is the value of the card.',
    variant: 'primary',
  },
};

export const WithReactNodeValue: Story = {
  args: {
    title: 'Card With ReactNode',
    value: (
      <div style={{ color: 'blue', fontWeight: 'bold' }}>
        This is a ReactNode value!
      </div>
    ),
    variant: 'secondary',
  },
};

export const TertiaryVariant: Story = {
  args: {
    title: 'Tertiary Variant Card',
    value: 'This card uses the tertiary variant.',
    variant: 'tertiary',
  },
};
