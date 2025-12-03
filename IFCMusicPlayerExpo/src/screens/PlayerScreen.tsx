import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AudioService from '../services/AudioService';

const PlayerScreen = () => {
  const [status, setStatus] = useState<any>(null);
  useEffect(() => {
    const id = setInterval(async () => {
      const s = await AudioService.getStatus();
      setStatus(s);
    }, 500);
    return () => clearInterval(id);
  }, []);
  const isPlaying = !!status && status.isPlaying;
  const toggle = async () => {
    if (isPlaying) await AudioService.pause();
    else await AudioService.play();
  };
  const position = status?.positionMillis ? Math.floor(status.positionMillis / 1000) : 0;
  const duration = status?.durationMillis ? Math.floor(status.durationMillis / 1000) : 0;
  const pct = duration ? (position / duration) * 100 : 0;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Player</Text>
      <Text>{position} / {duration}</Text>
      <View style={{ width: '80%', height: 4, backgroundColor: '#333', marginTop: 12 }}>
        <View style={{ width: `${pct}%`, height: 4, backgroundColor: '#1DB954' }} />
      </View>
      <TouchableOpacity onPress={toggle} style={{ padding: 16 }}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayerScreen;
