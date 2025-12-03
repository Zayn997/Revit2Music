import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import FileService from '../services/FileService';
import AudioService from '../services/AudioService';

const LibraryScreen = ({ navigation }: any) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    load();
  }, []);
  
  const load = async () => {
    setLoading(true);
    try {
      await FileService.initialize();
      const musicFiles = await FileService.listMusicFiles();
      setFiles(musicFiles);
    } catch (e) {
      console.log('Error loading files:', e);
    }
    setLoading(false);
  };
  const importFile = async () => {
    const f: any = await FileService.pickMusicFile();
    if (f) {
      await FileService.importMusicFile(f.uri, f.name);
      load();
    }
  };
  const play = async (file: any) => {
    await AudioService.load(file.path);
    await AudioService.play();
    navigation.navigate('Player');
  };
  const del = async (file: any) => {
    await FileService.deleteMusicFile(file.path);
    load();
  };
  const renderItem = ({ item }: any) => (
    <View style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={() => play(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => del(item)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
        <Text>Library</Text>
        <TouchableOpacity onPress={importFile}>
          <Text>Import</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <FlatList data={files} renderItem={renderItem} keyExtractor={(i: any) => i.path || i.name} />
      )}
    </View>
  );
};

export default LibraryScreen;
