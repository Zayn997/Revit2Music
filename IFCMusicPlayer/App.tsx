import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./src/navigation/AppNavigator";
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
