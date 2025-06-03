import React, { createContext, useContext, ReactNode, useCallback, useMemo } from 'react';

// 1. Define the context type
interface SoundContextType {
  playClickSound: () => void;
  isSoundEnabled: boolean;
}

// 2. Create the context with a default value (or undefined if you prefer to always check)
// Using 'null' as a default and checking for it in the hook is a common pattern.
const SoundContext = createContext<SoundContextType | null>(null);

// 3. Create the SoundProvider component
interface SoundProviderProps {
  children: ReactNode;
  playClickSound: () => void;
  isSoundEnabled: boolean;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children, playClickSound, isSoundEnabled }) => {
  // Memoize playClickSound if it's passed as a prop and might change identity unnecessarily
  // For this specific case, playClickSound is already a useCallback in Home.tsx, so this might be redundant
  // but good practice if the prop source wasn't memoized.
  const memoizedPlayClickSound = useCallback(() => {
    if (playClickSound) {
      playClickSound();
    }
  }, [playClickSound]);

  const contextValue = useMemo(
    () => ({
      playClickSound: memoizedPlayClickSound,
      isSoundEnabled: isSoundEnabled,
    }),
    [memoizedPlayClickSound, isSoundEnabled]
  );

  return (
    <SoundContext.Provider value={contextValue}>
      {children}
    </SoundContext.Provider>
  );
};

// 4. Create the custom hook useSound
export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === null) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
