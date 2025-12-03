import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function SettingsScreen() {
  const handleClearCache = () => {
    Alert.alert("Clear Cache", "This will remove all temporary files.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => {
          Alert.alert("Success", "Cache cleared successfully");
        },
      },
    ]);
  };

  const handleAbout = () => {
    Alert.alert(
      "About IFC Music Player",
      "Version 1.0.0\n\nTransforming architectural IFC files into playable music.\n\nBuilt with Expo and React Native.",
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Audio Settings</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Audio Quality</Text>
          <Text style={styles.settingValue}>High</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Background Playback</Text>
          <Text style={styles.settingValue}>Enabled</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>

        <TouchableOpacity style={styles.settingItem} onPress={handleClearCache}>
          <Text style={styles.settingLabel}>Clear Cache</Text>
          <Text style={styles.settingAction}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
          <Text style={styles.settingLabel}>App Information</Text>
          <Text style={styles.settingAction}>ℹ️</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Version</Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>IFC Music Player</Text>
        <Text style={styles.footerSubtext}>
          Transforming Architecture into Music
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#aaa",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  settingLabel: {
    fontSize: 16,
    color: "#fff",
  },
  settingValue: {
    fontSize: 14,
    color: "#aaa",
  },
  settingAction: {
    fontSize: 20,
  },
  footer: {
    alignItems: "center",
    padding: 40,
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 12,
    color: "#666",
  },
});
