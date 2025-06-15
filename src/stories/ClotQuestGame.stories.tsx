import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ClotQuestGame from '../components/ClotQuestGame'; // Adjust path as necessary
import { ThemeProvider } from '../contexts/ThemeContext'; // Assuming it might use theme
// If it uses sound, import SoundProvider
// import { SoundProvider } from '../contexts/SoundContext';

const meta: Meta<typeof ClotQuestGame> = {
  title: 'Games/ClotQuestGame',
  component: ClotQuestGame,
  decorators: [
    (Story) => (
      <ThemeProvider>
        {/* <SoundProvider playClickSound={() => {}} isSoundEnabled={true}> */}
          <div style={{ padding: '1rem', backgroundColor: '#222', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Story />
          </div>
        {/* </SoundProvider> */}
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Define argTypes for props if any
    // onGameComplete: { action: 'gameComplete' },
  },
};

export default meta;

type Story = StoryObj<typeof ClotQuestGame>;

export const Default: Story = {
  args: {
    // Add default props here if any
  },
};
