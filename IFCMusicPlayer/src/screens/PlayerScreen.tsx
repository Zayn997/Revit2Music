import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AudioService from "../services/AudioService";
import FileService from "../services/FileService";
import { MusicTrack, BuildingMetadata } from "../types";

const { width } = Dimensions.get("window");

interface PlayerScreenProps {
  route: any;
  navigation: any;
}

export default function PlayerScreen({ route, navigation }: PlayerScreenProps) {
  const nav = navigation || useNavigation<any>();
  const [track, setTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [metadata, setMetadata] = useState<BuildingMetadata | null>(null);

  useEffect(() => {
    if (route?.params?.track) {
      loadTrack(route.params.track);
    }
    const interval = setInterval(updatePlaybackStatus, 500);
    return () => clearInterval(interval);
  }, [route?.params?.track]);

  const loadTrack = async (newTrack: MusicTrack) => {
    const success = await AudioService.loadTrack(newTrack);
    if (success) {
      setTrack(newTrack);

      // Load metadata if available
      const trackMetadata = await FileService.getMetadata(newTrack.id);
      if (trackMetadata) {
        setMetadata(trackMetadata);
      }

      // Start playing
      await AudioService.play();
      setIsPlaying(true);
    }
  };

  const updatePlaybackStatus = async () => {
    const status = await AudioService.getStatus();
    if (status) {
      setIsPlaying(status.isPlaying);
      setPosition(status.position);
      setDuration(status.duration);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await AudioService.pause();
      setIsPlaying(false);
    } else {
      await AudioService.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = async (value: number) => {
    await AudioService.seekTo(value);
    setPosition(value);
  };

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const renderSlider = () => {
    const percentage = duration > 0 ? (position / duration) * 100 : 0;

    return (
      <View style={styles.sliderContainer}>
        <View style={styles.sliderTrack}>
          <View style={[styles.sliderFill, { width: `${percentage}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Artwork */}
        <View style={styles.artworkContainer}>
          <View style={styles.artwork}>
            <Text style={styles.artworkIcon}>🏗️</Text>
          </View>
        </View>

        {/* Track Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {track?.title || "No Track Playing"}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {track?.artist || "Unknown Artist"}
          </Text>
        </View>

        {/* Building Metadata */}
        {metadata && metadata.project_info && (
          <View style={styles.metadataContainer}>
            <Text style={styles.metadataTitle}>🏢 Building Information</Text>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Project:</Text>
              <Text style={styles.metadataValue}>
                {metadata.project_info.building_name}
              </Text>
            </View>
            {metadata.mapping_config && (
              <View style={styles.metadataRow}>
                <Text style={styles.metadataLabel}>Elements Mapped:</Text>
                <Text style={styles.metadataValue}>
                  {metadata.mapping_config.elements_mapped}
                </Text>
              </View>
            )}
            {metadata.music_info && (
              <>
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Key:</Text>
                  <Text style={styles.metadataValue}>
                    {metadata.music_info.key}
                  </Text>
                </View>
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Tempo:</Text>
                  <Text style={styles.metadataValue}>
                    {metadata.music_info.tempo} BPM
                  </Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* Progress Bar */}
        {renderSlider()}

        {/* Playback Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleSeek(Math.max(0, position - 10000))}
          >
            <Text style={styles.controlIcon}>⏪</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
            <Text style={styles.playIcon}>{isPlaying ? "⏸" : "▶️"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => handleSeek(Math.min(duration, position + 10000))}
          >
            <Text style={styles.controlIcon}>⏩</Text>
          </TouchableOpacity>
        </View>

        {/* Element Breakdown */}
        {metadata && metadata.element_breakdown && (
          <View style={styles.elementsContainer}>
            <Text style={styles.elementsTitle}>Element Breakdown</Text>
            {Object.entries(metadata.element_breakdown).map(([key, value]) => (
              <View key={key} style={styles.elementRow}>
                <Text style={styles.elementType}>{key.toUpperCase()}</Text>
                <Text style={styles.elementCount}>{value.count} elements</Text>
                <Text style={styles.elementInstrument}>
                  🎵 {value.instrument}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  artworkContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  artwork: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 10,
    backgroundColor: "#1f1f1f",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  artworkIcon: {
    fontSize: 100,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  artist: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
  },
  metadataContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  metadataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  metadataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  metadataLabel: {
    fontSize: 14,
    color: "#aaa",
  },
  metadataValue: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  sliderContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: "#333",
    borderRadius: 2,
    overflow: "hidden",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#1DB954",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#aaa",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  controlButton: {
    padding: 15,
    marginHorizontal: 20,
  },
  controlIcon: {
    fontSize: 30,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#1DB954",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  playIcon: {
    fontSize: 40,
  },
  elementsContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  elementsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  elementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  elementType: {
    fontSize: 14,
    color: "#1DB954",
    fontWeight: "600",
    flex: 1,
  },
  elementCount: {
    fontSize: 12,
    color: "#aaa",
    flex: 1,
    textAlign: "center",
  },
  elementInstrument: {
    fontSize: 12,
    color: "#fff",
    flex: 1,
    textAlign: "right",
  },
});
