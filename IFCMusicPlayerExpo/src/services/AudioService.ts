import { createAudioPlayer } from "expo-audio";
import type { AudioPlayer } from "expo-audio";

class AudioService {
  static player: AudioPlayer | null = null;

  static async initialize() {
    try {
      // Skip audio mode configuration - expo-audio handles it automatically
      console.log("Audio service initialized");
    } catch (error) {
      console.log("Audio initialization error:", error);
    }
  }

  static async load(uri: string) {
    try {
      if (this.player) {
        this.player.remove();
        this.player = null;
      }
      console.log("Loading audio from:", uri);
      // Ensure URI has proper format
      const audioUri = uri.startsWith("file://") ? uri : `file://${uri}`;
      // Per expo-audio docs, createAudioPlayer expects a source object
      // e.g., createAudioPlayer({ uri, headers })
      this.player = createAudioPlayer({ uri: audioUri });
      console.log("Audio loaded successfully");
    } catch (error) {
      console.log("Error loading audio:", error);
      console.log("Full error:", JSON.stringify(error));
      throw error;
    }
  }

  static async play() {
    try {
      if (this.player) {
        this.player.play();
      }
    } catch (error) {
      console.log("Error playing audio:", error);
    }
  }

  static async pause() {
    try {
      if (this.player) {
        this.player.pause();
      }
    } catch (error) {
      console.log("Error pausing audio:", error);
    }
  }

  static async getStatus() {
    try {
      if (!this.player) return null;
      return {
        isPlaying: this.player.playing,
        positionMillis: this.player.currentTime * 1000,
        durationMillis: this.player.duration * 1000,
      };
    } catch (error) {
      console.log("Error getting status:", error);
      return null;
    }
  }
}

export default AudioService;
