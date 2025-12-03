import {
  documentDirectory,
  getInfoAsync,
  makeDirectoryAsync,
  copyAsync,
  readDirectoryAsync,
  deleteAsync,
} from "expo-file-system/legacy";
import * as DocumentPicker from "expo-document-picker";

class FileService {
  static MUSIC_DIRECTORY = (documentDirectory || "") + "music";

  static async initialize() {
    try {
      const info = await getInfoAsync(this.MUSIC_DIRECTORY);
      if (!info.exists) {
        await makeDirectoryAsync(this.MUSIC_DIRECTORY, { intermediates: true });
      }
    } catch (e) {
      console.log("Error initializing music directory:", e);
    }
  }

  static async pickMusicFile() {
    const result = await DocumentPicker.getDocumentAsync({ type: ["audio/*"] });
    // New API: check if canceled instead of type === 'success'
    if (!result.canceled && result.assets && result.assets.length > 0) {
      return result.assets[0];
    }
    return null;
  }

  static async importMusicFile(sourceUri: string, filename: string) {
    const dest = this.MUSIC_DIRECTORY + "/" + filename;
    await copyAsync({ from: sourceUri, to: dest });
    return dest;
  }

  static async listMusicFiles() {
    try {
      const files = await readDirectoryAsync(this.MUSIC_DIRECTORY);
      return files
        .filter(
          (name) =>
            name.endsWith(".mp3") ||
            name.endsWith(".wav") ||
            name.endsWith(".m4a")
        )
        .map((name) => ({ name, path: this.MUSIC_DIRECTORY + "/" + name }));
    } catch (e) {
      console.log("Error listing files:", e);
      return [];
    }
  }

  static async deleteMusicFile(path: string) {
    await deleteAsync(path, { idempotent: true });
  }
}

export default FileService;
