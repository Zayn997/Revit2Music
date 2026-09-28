import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FileService from "../services/FileService";
import { MusicTrack } from "../types";

export default function LibraryScreen({ navigation }: { navigation?: any }) {
  const nav = navigation || useNavigation<any>();
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    setLoading(true);
    const savedTracks = await FileService.getSavedTracks();
    setTracks(savedTracks);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTracks();
    setRefreshing(false);
  };

  const handleImport = async () => {
    const result = await FileService.pickMusicFile();
    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      const file = result.assets[0];
      const imported = await FileService.importMusicFile(file.uri, file.name);
      if (imported) {
        Alert.alert("Success", "Music file imported successfully");
        await loadTracks();
      } else {
        Alert.alert("Error", "Failed to import music file");
      }
    }
  };

  const handlePlayTrack = (track: MusicTrack) => {
    nav.navigate("Player", { track });
  };

  const handleDeleteTrack = (track: MusicTrack) => {
    Alert.alert(
      "Delete Track",
      `Are you sure you want to delete "${track.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await FileService.deleteTrack(track);
            if (success) {
              Alert.alert("Success", "Track deleted successfully");
              await loadTracks();
            } else {
              Alert.alert("Error", "Failed to delete track");
            }
          },
        },
      ]
    );
  };

  const renderTrackItem = ({ item }: { item: MusicTrack }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => handlePlayTrack(item)}
    >
      <View style={styles.trackIcon}>
        <Text style={styles.musicNote}>♪</Text>
      </View>
      <View style={styles.trackInfo}>
        <Text style={styles.trackName} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.trackArtist} numberOfLines={1}>
          {item.artist || "Unknown Artist"}
        </Text>
        {item.size && (
          <Text style={styles.trackSize}>
            {FileService.formatFileSize(item.size)}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTrack(item)}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🎵</Text>
      <Text style={styles.emptyText}>No music files yet</Text>
      <Text style={styles.emptySubtext}>
        Tap the + button to import your IFC music
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.navigate("Intro")}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Music Library</Text>
        <TouchableOpacity style={styles.importButton} onPress={handleImport}>
          <Text style={styles.importButtonText}>+ Import</Text>
        </TouchableOpacity>
      </View>

      {tracks.length === 0 && !loading ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#1DB954"
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1f1f1f",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backText: { color: "#fff", fontSize: 14 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  importButton: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  importButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  listContent: {
    padding: 15,
    flexGrow: 1,
  },
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  trackIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  musicNote: {
    fontSize: 24,
    color: "#fff",
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  trackArtist: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 2,
  },
  trackSize: {
    fontSize: 12,
    color: "#666",
  },
  deleteButton: {
    padding: 10,
  },
  deleteIcon: {
    fontSize: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    color: "#aaa",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
