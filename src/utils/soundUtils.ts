// Sound utility for managing audio throughout the app
export class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private isMuted: boolean = false;
  private volume: number = 0.5;

  private constructor() {
    this.initializeSounds();
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private initializeSounds() {
    // Initialize all available sounds
    const soundFiles = {
      click: '/click.mp3',
      whoosh: '/whoosh.mp3',
      ambient: '/ambient.mp3',
      pageTurn: '/page-turn.mp3',
      chime: '/CHIME -169854__gnotesoundz__wind-chime-crunch.mp3',
      ambientHiphop: '/Ambient Hiphop 189904__cqbcqb__ambient-beat3.mp3'
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = this.volume;
      audio.preload = 'auto';
      this.sounds[key] = audio;
    });
  }

  public playSound(soundName: string, loop: boolean = false) {
    if (this.isMuted) return;

    const sound = this.sounds[soundName];
    if (sound) {
      try {
        sound.currentTime = 0;
        sound.loop = loop;
        sound.volume = this.volume;
        sound.play().catch(error => {
          console.warn(`Could not play sound ${soundName}:`, error);
        });
      } catch (error) {
        console.warn(`Error playing sound ${soundName}:`, error);
      }
    }
  }

  public stopSound(soundName: string) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  public stopAllSounds() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    Object.values(this.sounds).forEach(sound => {
      sound.volume = this.volume;
    });
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAllSounds();
    }
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public getVolume(): number {
    return this.volume;
  }

  // Convenience methods for specific actions
  public playClickSound() {
    this.playSound('click');
  }

  public playWhooshSound() {
    this.playSound('whoosh');
  }

  public playAmbientSound() {
    this.playSound('ambient', true);
  }

  public playPageTurnSound() {
    this.playSound('pageTurn');
  }

  public playChimeSound() {
    this.playSound('chime');
  }

  public stopAmbientSound() {
    this.stopSound('ambient');
  }
}

// Export a singleton instance
export const soundManager = SoundManager.getInstance();

// Convenience functions for components
export const playClick = () => soundManager.playClickSound();
export const playWhoosh = () => soundManager.playWhooshSound();
export const playAmbient = () => soundManager.playAmbientSound();
export const playPageTurn = () => soundManager.playPageTurnSound();
export const playChime = () => soundManager.playChimeSound();
export const stopAmbient = () => soundManager.stopAmbientSound();
