import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface IntroScreenProps {
  navigation: any;
}

export default function IntroScreen({ navigation }: IntroScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IFC Music Player</Text>
      <Text style={styles.subtitle}>Transform Architecture into Music</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Library")}
      >
        <Text style={styles.buttonText}>Go to Library</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

