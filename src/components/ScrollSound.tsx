import React, { memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ScrollSoundProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const ScrollSound: React.FC<ScrollSoundProps> = memo(({ isSoundEnabled, toggleSound }) => {
  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-50"
      aria-label={isSoundEnabled ? "Disable scroll sound" : "Enable scroll sound"}
      role="switch"
      aria-checked={isSoundEnabled}
    >
      {isSoundEnabled ? <Volume2 className="h-6 w-6 text-gray-700" /> : <VolumeX className="h-6 w-6 text-gray-700" />}
    </button>
  );
});

export default ScrollSound;
