import React, { memo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface ScrollSoundProps {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const ScrollSound: React.FC<ScrollSoundProps> = memo(({ isSoundEnabled, toggleSound, volume, setVolume }) => {
  return (
    <div className="fixed bottom-4 right-20 flex flex-col items-center space-y-2 z-50">
      {/* Toggle Sound Button */}
      <button
        onClick={() => {
          console.log('Sound button clicked!');
          toggleSound();
        }}
        className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
        role="switch"
        aria-checked={isSoundEnabled}
      >
        {isSoundEnabled ? <Volume2 className="h-6 w-6 text-gray-700 dark:text-gray-200 animate-pulse" />
                       : <VolumeX className="h-6 w-6 text-gray-700 dark:text-gray-200 animate-pulse" />}
      </button>
      {/* Volume Slider */}
      {isSoundEnabled && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.currentTarget.value))}
          className="w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer transition-opacity duration-500 opacity-100"
          aria-label="Volume control"
        />
      )}
    </div>
  );
});

export default ScrollSound;
