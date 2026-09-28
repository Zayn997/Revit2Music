import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LibraryScreen from "../screens/LibraryScreen";
import PlayerScreen from "../screens/PlayerScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { MusicTrack } from "../types";
import IntroScreen from "../screens/IntroScreen";

type TabKey = "Intro" | "Library" | "Player" | "Settings";

export default function BasicNavigator() {
  const [tab, setTab] = useState<TabKey>("Intro");
  const [track, setTrack] = useState<MusicTrack | null>(null);

  const navigation = useMemo(
    () => ({
      navigate: (name: TabKey, params?: any) => {
        if (name === "Player" && params?.track) setTrack(params.track);
        setTab(name);
      },
    }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {tab !== "Intro" ? (
          <TouchableOpacity style={styles.back} onPress={() => setTab("Intro")}> 
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <Text style={styles.headerText}>IFC Music Player</Text>
        <View style={styles.backPlaceholder} />
      </View>

      <View style={styles.content}>
        {tab === "Intro" && <IntroScreen navigation={navigation} />}
        {tab === "Library" && <LibraryScreen navigation={navigation} />}
        {tab === "Player" && (
          <PlayerScreen navigation={navigation} route={{ params: { track } }} />
        )}
        {tab === "Settings" && <SettingsScreen />}
      </View>

      {tab !== "Intro" && (
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab} onPress={() => setTab("Library")}> 
            <Text style={styles.tabText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setTab("Player")}>
            <Text style={styles.tabText}>Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setTab("Settings")}>
            <Text style={styles.tabText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  back: { paddingVertical: 8, paddingHorizontal: 4 },
  backText: { color: "#fff", fontSize: 14 },
  backPlaceholder: { width: 50 },
  content: { flex: 1 },
  tabs: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#333",
    backgroundColor: "#1a1a1a",
  },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center" },
  tabText: { color: "#fff" },
});
