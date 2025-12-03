import * as FileSystem from "expo-file-system/legacy";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MusicTrack } from "../types";

class FileService {
  private static baseDir(): string {
    const fsAny = FileSystem as any;
    return (
      fsAny.documentDirectory ||
      fsAny.cacheDirectory ||
      fsAny.directories?.documentDirectory ||
      ""
    );
  }

  private static musicDir(): string {
    return `${this.baseDir()}music/`;
  }

  private static metadataDir(): string {
    return `${this.baseDir()}metadata/`;
  }
  private static readonly TRACKS_STORAGE_KEY = "@music_tracks";

  static async initialize(): Promise<void> {
    try {
      // Create music directory if it doesn't exist
      const musicDirInfo = await FileSystem.getInfoAsync(this.musicDir());
      if (!musicDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.musicDir(), {
          intermediates: true,
        });
      }

      // Create metadata directory if it doesn't exist
      const metadataDirInfo = await FileSystem.getInfoAsync(this.metadataDir());
      if (!metadataDirInfo.exists) {
        await FileSystem.makeDirectoryAsync(this.metadataDir(), {
          intermediates: true,
        });
      }

      console.log("File service initialized");
    } catch (error) {
      console.error("Error initializing file service:", error);
    }
  }

  static async pickMusicFile(): Promise<DocumentPicker.DocumentPickerResult | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "audio/*",
          "audio/midi",
          "audio/x-midi",
          "audio/mpeg",
          "audio/wav",
        ],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return null;
      }

      return result;
    } catch (error) {
      console.error("Error picking file:", error);
      return null;
    }
  }

  static async pickMetadataFile(): Promise<DocumentPicker.DocumentPickerResult | null> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return null;
      }

      return result;
    } catch (error) {
      console.error("Error picking metadata file:", error);
      return null;
    }
  }

  static async importMusicFile(
    sourceUri: string,
    filename: string
  ): Promise<MusicTrack | null> {
    try {
      const destPath = `${this.musicDir()}${filename}`;

      // Copy file to app directory
      await FileSystem.copyAsync({
        from: sourceUri,
        to: destPath,
      });

      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(destPath);

      // Create track object
      const track: MusicTrack = {
        id: Date.now().toString(),
        uri: destPath,
        title: filename.replace(/\.[^/.]+$/, ""),
        artist: "IFC Music",
        // Size is not provided by FileSystem.getInfoAsync; omit for now
      };

      // Save to storage
      await this.saveTrack(track);

      console.log("Music file imported:", filename);
      return track;
    } catch (error) {
      console.error("Error importing music file:", error);
      return null;
    }
  }

  static async importMetadataFile(
    sourceUri: string,
    trackId: string
  ): Promise<any | null> {
    try {
      const destPath = `${this.metadataDir()}${trackId}.json`;

      // Copy file
      await FileSystem.copyAsync({
        from: sourceUri,
        to: destPath,
      });

      // Read and parse JSON
      const content = await FileSystem.readAsStringAsync(destPath);
      const metadata = JSON.parse(content);

      console.log("Metadata file imported");
      return metadata;
    } catch (error) {
      console.error("Error importing metadata file:", error);
      return null;
    }
  }

  static async listMusicFiles(): Promise<string[]> {
    try {
      const files = await FileSystem.readDirectoryAsync(this.musicDir());
      return files.filter(
        (file: string) =>
          file.endsWith(".mp3") ||
          file.endsWith(".wav") ||
          file.endsWith(".mid") ||
          file.endsWith(".midi")
      );
    } catch (error) {
      console.error("Error listing music files:", error);
      return [];
    }
  }

  static async deleteTrack(track: MusicTrack): Promise<boolean> {
    try {
      // Delete music file
      await FileSystem.deleteAsync(track.uri, { idempotent: true });

      // Delete metadata if exists
      const metadataPath = `${this.metadataDir()}${track.id}.json`;
      await FileSystem.deleteAsync(metadataPath, { idempotent: true });

      // Remove from storage
      await this.removeTrack(track.id);

      console.log("Track deleted:", track.title);
      return true;
    } catch (error) {
      console.error("Error deleting track:", error);
      return false;
    }
  }

  static async saveTrack(track: MusicTrack): Promise<void> {
    try {
      const tracks = await this.getSavedTracks();
      tracks.push(track);
      await AsyncStorage.setItem(
        this.TRACKS_STORAGE_KEY,
        JSON.stringify(tracks)
      );
    } catch (error) {
      console.error("Error saving track:", error);
    }
  }

  static async removeTrack(trackId: string): Promise<void> {
    try {
      const tracks = await this.getSavedTracks();
      const updatedTracks = tracks.filter((t) => t.id !== trackId);
      await AsyncStorage.setItem(
        this.TRACKS_STORAGE_KEY,
        JSON.stringify(updatedTracks)
      );
    } catch (error) {
      console.error("Error removing track:", error);
    }
  }

  static async getSavedTracks(): Promise<MusicTrack[]> {
    try {
      const tracksJson = await AsyncStorage.getItem(this.TRACKS_STORAGE_KEY);
      if (tracksJson) {
        return JSON.parse(tracksJson);
      }
      return [];
    } catch (error) {
      console.error("Error getting saved tracks:", error);
      return [];
    }
  }

  static async getMetadata(trackId: string): Promise<any | null> {
    try {
      const metadataPath = `${this.metadataDir()}${trackId}.json`;
      const fileInfo = await FileSystem.getInfoAsync(metadataPath);

      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(metadataPath);
        return JSON.parse(content);
      }

      return null;
    } catch (error) {
      console.error("Error getting metadata:", error);
      return null;
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  }
}

export default FileService;
