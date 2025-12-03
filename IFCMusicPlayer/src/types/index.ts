// Type definitions for IFC Music Player

export interface MusicTrack {
  id: string;
  uri: string;
  title: string;
  artist?: string;
  duration?: number;
  size?: number;
  artwork?: string;
  metadata?: BuildingMetadata;
}

export interface BuildingMetadata {
  project_info?: {
    building_name: string;
    project_id: string;
    export_date: string;
    revit_version?: string;
  };
  music_info?: {
    duration: number;
    tempo: number;
    key: string;
    total_tracks: number;
  };
  mapping_config?: {
    strategy: string;
    elements_mapped: number;
  };
  element_breakdown?: {
    [key: string]: {
      count: number;
      instrument: string;
      midi_instrument: number;
    };
  };
  timeline?: TimelineEntry[];
}

export interface TimelineEntry {
  timestamp: number;
  element_type: string;
  element_id: string;
  note: string;
  velocity: number;
}

export interface PlaybackStatus {
  isPlaying: boolean;
  position: number;
  duration: number;
  isLoaded: boolean;
}
