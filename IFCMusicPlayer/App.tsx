import React, { useEffect } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BasicNavigator from "./src/navigation/BasicNavigator";
import AudioService from "./src/services/AudioService";
import FileService from "./src/services/FileService";

export default function App() {
  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    await AudioService.initialize();
    await FileService.initialize();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#121212" }}>
      <BasicNavigator />
    </GestureHandlerRootView>
  );
}
