import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HeaderWithParticlesOptimized from '../components/HeaderWithParticlesOptimized';
import { ThemeProvider } from '../contexts/ThemeContext';
import { SoundProvider } from '../contexts/SoundContext';
import { BrowserRouter } from 'react-router-dom'; // Needed due to <Link> components

const meta: Meta<typeof HeaderWithParticlesOptimized> = {
  title: 'Components/HeaderWithParticlesOptimized',
  component: HeaderWithParticlesOptimized,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          <SoundProvider playClickSound={() => console.log('Storybook: playClickSound mock')} isSoundEnabled={true}>
            <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
              <Story />
            </div>
          </SoundProvider>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isActive: { control: 'boolean' },
    sectionName: { control: 'text' },
    scrollToSection: { action: 'scrollToSection' },
    playClickSound: { action: 'playClickSound' },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderWithParticlesOptimized>;

export const Default: Story = {
  args: {
    isActive: true,
    sectionName: 'HomeHeaderStory',
    scrollToSection: (sectionIndex: number) => console.log(`Storybook: scrollToSection mock called with ${sectionIndex}`),
    playClickSound: () => console.log('Storybook: playClickSound mock from args'),
  },
};

export const LightTheme: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider>
          {/* Force light theme by not having 'dark' in localStorage initially or by specific context value if possible */}
          {/* For simplicity, relying on ThemeProvider default which should be light */}
          <SoundProvider playClickSound={() => console.log('Storybook: playClickSound mock')} isSoundEnabled={true}>
            <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
              <Story />
            </div>
          </SoundProvider>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    // If your ThemeProvider has a way to set initial theme, use it here.
    // For now, we assume default is light and Storybook controls can toggle dark mode if ThemeProvider listens to it.
    theme: 'light', // This is a pseudo-parameter, actual theme control depends on ThemeProvider
  }
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => {
      // Ensure dark theme is applied for this story
      React.useEffect(() => {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        return () => {
          document.documentElement.classList.remove('dark');
          localStorage.removeItem('theme'); // Clean up
        };
      }, []);
      return (
        <BrowserRouter>
          <ThemeProvider>
            <SoundProvider playClickSound={() => console.log('Storybook: playClickSound mock')} isSoundEnabled={true}>
              <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
                <Story />
              </div>
            </SoundProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    }
  ],
  parameters: {
    theme: 'dark', // This is a pseudo-parameter
  }
};

export const Inactive: Story = {
  args: {
    ...Default.args,
    isActive: false,
  },
};
