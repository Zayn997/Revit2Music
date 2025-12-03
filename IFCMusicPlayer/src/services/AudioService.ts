import { createAudioPlayer, AudioPlayer } from "expo-audio";
import { PlaybackStatus, MusicTrack } from "../types";

class AudioService {
  private static player: AudioPlayer | null = null;
  private static currentTrack: MusicTrack | null = null;
  private static isInitialized: boolean = false;

  static async initialize(): Promise<void> {
    try {
      // expo-audio handles audio mode configuration automatically
      this.isInitialized = true;
      console.log("Audio service initialized successfully");
    } catch (error) {
      console.error("Error initializing audio service:", error);
    }
  }

  static async loadTrack(track: MusicTrack): Promise<boolean> {
    try {
      // Remove previous player if exists
      if (this.player) {
        this.player.remove();
        this.player = null;
      }

      // Ensure URI has proper format
      const audioUri = track.uri.startsWith("file://")
        ? track.uri
        : `file://${track.uri}`;

      // Create new audio player with the track (expo-audio expects a source object)
      this.player = createAudioPlayer({ uri: audioUri });
      this.currentTrack = track;

      console.log("Track loaded successfully:", track.title);
      return true;
    } catch (error) {
      console.error("Error loading track:", error);
      return false;
    }
  }

  static async play(): Promise<void> {
    try {
      if (this.player) {
        this.player.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }

  static async pause(): Promise<void> {
    try {
      if (this.player) {
        this.player.pause();
      }
    } catch (error) {
      console.error("Error pausing audio:", error);
    }
  }

  static async stop(): Promise<void> {
    try {
      if (this.player) {
        this.player.pause();
        // Prefer seek API if available
        const anyPlayer = this.player as any;
        if (typeof anyPlayer.seekTo === "function") {
          anyPlayer.seekTo(0);
        } else {
          // Fallback to property when API isn't available
          try {
            (this.player as any).currentTime = 0;
          } catch {}
        }
      }
    } catch (error) {
      console.error("Error stopping audio:", error);
    }
  }

  static async seekTo(positionSeconds: number): Promise<void> {
    try {
      if (this.player) {
        const anyPlayer = this.player as any;
        if (typeof anyPlayer.seekTo === "function") {
          anyPlayer.seekTo(positionSeconds);
        } else {
          try {
            (this.player as any).currentTime = positionSeconds;
          } catch {}
        }
      }
    } catch (error) {
      console.error("Error seeking:", error);
    }
  }

  static async getStatus(): Promise<PlaybackStatus | null> {
    try {
      if (!this.player) return null;

      return {
        isPlaying: this.player.playing,
        position: this.player.currentTime * 1000, // Convert to milliseconds
        duration: this.player.duration * 1000, // Convert to milliseconds
        isLoaded: true,
      };
    } catch (error) {
      console.error("Error getting status:", error);
      return null;
    }
  }

  static getCurrentTrack(): MusicTrack | null {
    return this.currentTrack;
  }

  static async unload(): Promise<void> {
    try {
      if (this.player) {
        this.player.remove();
        this.player = null;
        this.currentTrack = null;
      }
    } catch (error) {
      console.error("Error unloading sound:", error);
    }
  }

  static setVolume(volume: number): void {
    try {
      if (this.player) {
        this.player.volume = Math.max(0, Math.min(1, volume));
      }
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  }

  static getVolume(): number {
    return this.player?.volume || 1;
  }
}

export default AudioService;
