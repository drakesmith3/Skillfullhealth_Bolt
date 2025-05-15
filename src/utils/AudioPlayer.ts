
/**
 * Utility for playing audio effects with proper error handling and volume control
 */
export class AudioPlayer {
  private static instance: AudioPlayer;
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private _muted: boolean = false;
  
  private constructor() {}
  
  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }
  
  /**
   * Play a sound effect with specified volume
   * @param src Path to the audio file
   * @param volume Volume level (0.0 to 1.0)
   * @returns Promise that resolves when playback starts or rejects on error
   */
  public play(src: string, volume: number = 0.2): Promise<void> {
    if (this._muted) {
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      try {
        // Check if audio is already cached
        let audio = this.audioCache.get(src);
        
        if (!audio) {
          audio = new Audio(src);
          this.audioCache.set(src, audio);
        }
        
        // Reset to beginning if already playing
        audio.currentTime = 0;
        audio.volume = Math.max(0, Math.min(1, volume));
        
        // Play and resolve promise
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => resolve())
            .catch((error) => {
              console.warn("Audio play was prevented:", error);
              resolve(); // Resolve anyway to prevent breaking the app flow
            });
        } else {
          resolve();
        }
      } catch (error) {
        console.warn("Error playing audio:", error);
        resolve(); // Resolve anyway to prevent breaking the app flow
      }
    });
  }
  
  /**
   * Preload audio files for faster playback
   * @param sources Array of audio file paths to preload
   */
  public preload(sources: string[]): void {
    sources.forEach(src => {
      if (!this.audioCache.has(src)) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        this.audioCache.set(src, audio);
      }
    });
  }
  
  public get muted(): boolean {
    return this._muted;
  }
  
  public set muted(value: boolean) {
    this._muted = value;
  }
  
  public toggleMute(): boolean {
    this._muted = !this._muted;
    return this._muted;
  }
}

// Export singleton instance
export const audioPlayer = AudioPlayer.getInstance();

// Preload common sound effects
audioPlayer.preload(['/page-turn.mp3']);
