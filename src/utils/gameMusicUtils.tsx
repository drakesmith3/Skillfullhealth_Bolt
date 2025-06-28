// Game-specific music utility for enhancing gaming experience
export interface GameMusic {
  id: string;
  name: string;
  gameIds: string[];
  src: string;
  mood: 'energetic' | 'focused' | 'calm' | 'intense' | 'motivational';
  bpm: number;
  duration: number; // in seconds
}

export class GameMusicManager {
  private static instance: GameMusicManager;
  private currentMusic: HTMLAudioElement | null = null;
  private musicLibrary: GameMusic[] = [];
  private volume: number = 0.3;
  private isMuted: boolean = false;

  private constructor() {
    this.initializeMusicLibrary();
  }

  public static getInstance(): GameMusicManager {
    if (!GameMusicManager.instance) {
      GameMusicManager.instance = new GameMusicManager();
    }
    return GameMusicManager.instance;
  }

  private initializeMusicLibrary() {
    // Using the available ambient tracks for different game moods
    this.musicLibrary = [
      {
        id: 'ambient_hiphop',
        name: 'Ambient Hip-Hop Focus',
        gameIds: ['diagnosis-detective', 'immunoquest', 'pharmfrenzy'],
        src: '/Ambient Hiphop 189904__cqbcqb__ambient-beat3.mp3',
        mood: 'focused',
        bpm: 90,
        duration: 180
      },
      {
        id: 'ambient_calm',
        name: 'Calm Learning Atmosphere',
        gameIds: ['know-human-body', 'water-cycle-puzzle', 'blood-group-rhesus'],
        src: '/ambient.mp3',
        mood: 'calm',
        bpm: 70,
        duration: 200
      },
      {
        id: 'ambient_grainbience',
        name: 'Atmospheric Study Music',
        gameIds: ['krebs-cycle', 'cholesterol-metabolism', 'protein-metabolism-building'],
        src: '/AMBIENCE 806473__cjw0333__grainbience-002.mp3',
        mood: 'focused',
        bpm: 75,
        duration: 240
      }
    ];
  }

  public getMusicForGame(gameId: string): GameMusic | null {
    return this.musicLibrary.find(music => music.gameIds.includes(gameId)) || this.musicLibrary[0];
  }

  public getAllMusic(): GameMusic[] {
    return this.musicLibrary;
  }

  public playMusicForGame(gameId: string): void {
    if (this.isMuted) return;

    const music = this.getMusicForGame(gameId);
    if (!music) return;

    this.stopCurrentMusic();

    this.currentMusic = new Audio(music.src);
    this.currentMusic.volume = this.volume;
    this.currentMusic.loop = true;
    
    this.currentMusic.play().catch(error => {
      console.warn(`Could not play game music ${music.name}:`, error);
    });
  }

  public stopCurrentMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
      this.currentMusic = null;
    }
  }

  public pauseCurrentMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
  }

  public resumeCurrentMusic(): void {
    if (this.currentMusic && this.currentMusic.paused && !this.isMuted) {
      this.currentMusic.play().catch(error => {
        console.warn('Could not resume game music:', error);
      });
    }
  }

  public setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume = this.volume;
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.pauseCurrentMusic();
    } else {
      this.resumeCurrentMusic();
    }
  }

  public isMusicMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentMusic(): GameMusic | null {
    if (!this.currentMusic) return null;
    
    return this.musicLibrary.find(music => 
      this.currentMusic?.src.includes(music.src.replace('/', ''))
    ) || null;
  }

  public isPlaying(): boolean {
    return this.currentMusic !== null && !this.currentMusic.paused;
  }

  // Get recommended music based on game difficulty and category
  public getRecommendedMusic(difficulty: string, category: string): GameMusic[] {
    const moodMap: { [key: string]: GameMusic['mood'] } = {
      'Beginner': 'calm',
      'Intermediate': 'focused',
      'Advanced': 'energetic',
      'Expert': 'intense',
      'Master': 'motivational',
      'Legend': 'intense'
    };

    const categoryMoodMap: { [key: string]: GameMusic['mood'] } = {
      'Anatomy': 'calm',
      'Physiology': 'focused',
      'Biochemistry': 'focused',
      'Pharmacology': 'energetic',
      'Diagnosis': 'intense',
      'Hematology': 'focused',
      'Immunology': 'energetic',
      'Genetics': 'focused',
      'Molecular Biology': 'intense',
      'Endocrinology': 'calm',
      'Orthopedics': 'energetic'
    };

    const preferredMood = moodMap[difficulty] || categoryMoodMap[category] || 'focused';
    
    return this.musicLibrary.filter(music => music.mood === preferredMood);
  }
}

// Export singleton instance
export const gameMusicManager = GameMusicManager.getInstance();

// Convenience functions
export const playGameMusic = (gameId: string) => gameMusicManager.playMusicForGame(gameId);
export const stopGameMusic = () => gameMusicManager.stopCurrentMusic();
export const pauseGameMusic = () => gameMusicManager.pauseCurrentMusic();
export const resumeGameMusic = () => gameMusicManager.resumeCurrentMusic();

// Music control component for games
export const GameMusicControls = ({ 
  gameId, 
  onVolumeChange, 
  onMuteToggle 
}: { 
  gameId: string;
  onVolumeChange?: (volume: number) => void;
  onMuteToggle?: (muted: boolean) => void;
}) => {
  const currentMusic = gameMusicManager.getCurrentMusic();
  const isPlaying = gameMusicManager.isPlaying();
  const volume = gameMusicManager.getVolume();
  const isMuted = gameMusicManager.isMusicMuted();

  return (
    <div className="flex items-center gap-3 p-3 bg-black/20 backdrop-blur-sm rounded-lg">
      <button
        onClick={() => {
          if (isPlaying) {
            gameMusicManager.pauseCurrentMusic();
          } else {
            gameMusicManager.playMusicForGame(gameId);
          }
        }}
        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      
      <div className="flex-1">
        <p className="text-white text-sm font-medium">
          {currentMusic?.name || 'No music selected'}
        </p>
        <p className="text-gray-400 text-xs">
          {currentMusic?.mood.charAt(0).toUpperCase() + currentMusic?.mood.slice(1)} • {currentMusic?.bpm} BPM
        </p>
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => {
          const newVolume = parseFloat(e.target.value);
          gameMusicManager.setVolume(newVolume);
          onVolumeChange?.(newVolume);
        }}
        className="w-20 accent-red-500"
      />

      <button
        onClick={() => {
          const newMuted = !isMuted;
          gameMusicManager.setMuted(newMuted);
          onMuteToggle?.(newMuted);
        }}
        className={`p-2 rounded-lg transition-colors ${
          isMuted ? 'bg-gray-500/20' : 'bg-blue-500/20 hover:bg-blue-500/30'
        }`}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
};
