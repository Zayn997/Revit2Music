# IFC to Music Mobile App - Comprehensive Project Plan

## Project Overview

Transform architectural IFC (Industry Foundation Classes) files from Revit into playable music, where building elements (columns, beams, walls, etc.) are mapped to musical instruments and parameters, creating a unique sonic representation of architecture.

---

## Project Architecture

### System Flow
```
Revit Model → IFC Export → Python Converter → MIDI/Audio Files → Mobile App → User Playback
```

### Two-Component System

1. **Desktop Converter (Python)** - Processes IFC files into music
2. **Mobile App (iOS/Android)** - Plays and visualizes the generated music

---

## Phase 1: Python IFC-to-MIDI Converter

### 1.1 Core Functionality

#### Input
- IFC file (.ifc format) exported from Revit

#### Processing
- Parse IFC file structure
- Extract building elements and their properties
- Map architectural data to musical parameters
- Generate MIDI sequences
- Export to audio formats

#### Output
- MIDI files (.mid)
- Optional: MP3/WAV audio files
- Optional: JSON metadata file (for app visualization)

### 1.2 Required Python Libraries

```python
# IFC Processing
ifcopenshell          # IFC file parsing and data extraction

# Music Generation
mido                  # MIDI file creation and manipulation
music21               # Advanced music theory and notation
pretty_midi           # Alternative MIDI library

# Audio Conversion (Optional)
fluidsynth           # MIDI to audio conversion
pydub                # Audio file manipulation

# Data Processing
numpy                # Numerical computations
pandas               # Data organization and analysis
```

### 1.3 Architectural Data Extraction

#### Key Building Elements to Extract

**Columns (IfcColumn)**
- Position (X, Y, Z coordinates)
- Height
- Cross-sectional dimensions
- Material properties
- Structural load capacity
- Floor level

**Beams (IfcBeam)**
- Span length
- Position
- Cross-section
- Material
- Connection points

**Walls (IfcWall)**
- Length
- Height
- Thickness
- Material
- Orientation

**Slabs (IfcSlab)**
- Area
- Thickness
- Level
- Material

**Spaces (IfcSpace)**
- Volume
- Function/usage
- Floor area

### 1.4 Architecture-to-Music Mapping System

#### Mapping Schema Examples

| Architectural Parameter | Musical Parameter | Mapping Logic |
|------------------------|-------------------|---------------|
| **Column Height** | Pitch | Taller = Higher notes (e.g., 3m = C4, 6m = C5) |
| **Column Cross-Section** | Note Velocity | Larger = Louder (velocity 40-127) |
| **Grid Position (X)** | Instrument/Track | X-axis divided into instrument zones |
| **Grid Position (Y)** | Time/Sequence | Y-axis determines when note plays |
| **Floor Level** | Octave | Floor 1 = Octave 3, Floor 2 = Octave 4, etc. |
| **Material Type** | Instrument Family | Concrete = Piano, Steel = Strings, Wood = Guitar |
| **Load/Stress** | Note Duration | Higher load = Longer notes |
| **Element Count** | Rhythm Density | More elements = More notes |

#### Instrument Assignment Strategy

**By Element Type:**
- Columns → Piano or Bass
- Beams → Strings (Violin, Cello)
- Walls → Pads or Sustained instruments
- Slabs → Drums or Percussion
- Stairs → Arpeggios or Scales
- Doors/Windows → High-pitched accents (Bells, Chimes)

**By Material:**
- Concrete → Piano, Deep Bass
- Steel → Metallic sounds, Synth
- Wood → Acoustic Guitar, Marimba
- Glass → Bells, Glockenspiel

### 1.5 Music Generation Strategies

#### Strategy 1: Spatial Sequencing
- Map building plan to a 2D grid
- X-axis = time progression
- Y-axis = pitch or instrument selection
- Play elements as sequence moves through space

#### Strategy 2: Parametric Composition
- Sort elements by specific parameter (height, area, etc.)
- Create melodic progression based on parameter values
- Generate harmonic structure from relationships

#### Strategy 3: Layered Approach
- Each element type = separate instrument track
- Play all tracks simultaneously
- Create rich, orchestral texture

#### Strategy 4: Floor-by-Floor
- Each floor becomes a musical section
- Vertical progression through building = temporal progression
- Can create verse/chorus structure

### 1.6 Python Script Structure

```
ifc_to_music_converter/
│
├── main.py                      # Entry point
├── config.py                    # Configuration settings
│
├── parsers/
│   ├── ifc_parser.py           # IFC file reading and parsing
│   └── element_extractor.py    # Extract specific element data
│
├── mappers/
│   ├── mapping_rules.py        # Architecture → Music mapping logic
│   ├── instrument_assigner.py  # Instrument assignment
│   └── scale_generator.py      # Musical scale/key selection
│
├── generators/
│   ├── midi_generator.py       # MIDI file creation
│   ├── composition_engine.py   # Musical composition logic
│   └── audio_exporter.py       # Convert MIDI to audio (optional)
│
├── utils/
│   ├── data_normalizer.py      # Normalize architectural data ranges
│   └── music_theory.py         # Music theory utilities
│
└── outputs/
    ├── midi/                    # Generated MIDI files
    ├── audio/                   # Generated audio files
    └── metadata/                # JSON metadata for mobile app
```

### 1.7 Configuration File Example

```yaml
# config.yaml

# Musical Settings
key: "C_major"                   # Musical key
tempo: 120                       # BPM
time_signature: [4, 4]          # Time signature

# Scale Settings
scale_type: "major"              # major, minor, pentatonic, etc.
note_range: [36, 84]            # MIDI note range (C2 to C6)

# Mapping Settings
element_mappings:
  columns:
    instrument: 0                # MIDI instrument (0 = Acoustic Grand Piano)
    parameter: "height"
    map_to: "pitch"
  
  beams:
    instrument: 40               # Violin
    parameter: "length"
    map_to: "duration"
  
  walls:
    instrument: 88               # Pad (warm)
    parameter: "area"
    map_to: "velocity"

# Composition Settings
composition_strategy: "spatial_sequencing"
duration_per_element: 0.5       # seconds
overlap_allowed: true

# Export Settings
export_midi: true
export_audio: true
audio_format: "mp3"
sample_rate: 44100
```

### 1.8 Key Functions

```python
# main.py - Pseudo-code structure

def main(ifc_file_path, config_file_path):
    # 1. Load configuration
    config = load_config(config_file_path)
    
    # 2. Parse IFC file
    ifc_data = parse_ifc(ifc_file_path)
    
    # 3. Extract building elements
    columns = extract_columns(ifc_data)
    beams = extract_beams(ifc_data)
    walls = extract_walls(ifc_data)
    
    # 4. Normalize data
    normalized_data = normalize_architectural_data(columns, beams, walls)
    
    # 5. Apply mapping rules
    musical_data = apply_mapping_rules(normalized_data, config)
    
    # 6. Generate composition
    composition = generate_composition(musical_data, config)
    
    # 7. Create MIDI
    midi_file = create_midi(composition, config)
    
    # 8. Export audio (optional)
    if config.export_audio:
        audio_file = convert_midi_to_audio(midi_file, config)
    
    # 9. Generate metadata for mobile app
    metadata = generate_metadata(normalized_data, composition)
    
    return midi_file, audio_file, metadata
```

---

## Phase 2: Mobile Application

### 2.1 Platform Choice

**React Native (JavaScript/TypeScript)** ✅ Selected
- Single codebase for iOS and Android
- JavaScript/TypeScript - familiar to web developers
- Large ecosystem with excellent audio libraries
- Hot reload for fast development
- Strong community support
- Great UI component libraries (React Native Paper, Native Base)
- Expo option for even faster development

### 2.2 Mobile App Features

#### Core Features (MVP)
1. **File Management**
   - Import music files (MIDI/MP3/WAV)
   - Browse library of converted building-music files
   - File metadata display (building name, date, etc.)

2. **Music Player**
   - Play/Pause controls
   - Progress bar with seek
   - Volume control
   - Track information display

3. **Visualization**
   - Waveform visualization
   - Building element indicator (which element is playing)
   - Optional: 2D/3D building visualization

4. **Settings**
   - Audio quality settings
   - Visualization preferences
   - File management

#### Advanced Features (Future)
1. **Interactive Mapping Editor**
   - Adjust instrument assignments
   - Modify mapping parameters
   - Real-time preview

2. **Building Visualization**
   - 3D model viewer
   - Highlight elements as they play
   - Interactive exploration

3. **Social Features**
   - Share generated music
   - Community library
   - Comments and ratings

4. **Export Options**
   - Export to streaming services
   - Share as social media content
   - Generate videos with visualization

### 2.3 Mobile App Architecture (React Native)

```
ifc-music-player/
│
├── android/                     # Android native code
├── ios/                         # iOS native code
│
├── src/
│   ├── App.js                  # Main app component
│   │
│   ├── screens/
│   │   ├── HomeScreen.js       # Library/home view
│   │   ├── PlayerScreen.js     # Music player screen
│   │   ├── LibraryScreen.js    # Track library
│   │   └── SettingsScreen.js   # App settings
│   │
│   ├── components/
│   │   ├── PlayerControls.js   # Play/pause/seek controls
│   │   ├── WaveformVisualizer.js  # Audio visualization
│   │   ├── BuildingVisualizer.js  # Building data display
│   │   ├── TrackListItem.js    # Individual track component
│   │   └── ProgressBar.js      # Custom progress bar
│   │
│   ├── services/
│   │   ├── AudioService.js     # Audio playback logic
│   │   ├── FileService.js      # File management
│   │   └── MetadataService.js  # Parse JSON metadata
│   │
│   ├── navigation/
│   │   └── AppNavigator.js     # React Navigation setup
│   │
│   ├── store/
│   │   ├── reducers/           # Redux reducers (optional)
│   │   ├── actions/            # Redux actions (optional)
│   │   └── store.js            # Redux store setup
│   │
│   ├── styles/
│   │   ├── colors.js           # Color palette
│   │   ├── typography.js       # Font styles
│   │   └── globalStyles.js     # Shared styles
│   │
│   ├── utils/
│   │   ├── constants.js        # App constants
│   │   └── helpers.js          # Helper functions
│   │
│   └── assets/
│       ├── fonts/
│       ├── images/
│       └── sample_music/
│
├── package.json
├── babel.config.js
├── metro.config.js
└── app.json
```

### 2.4 Required React Native Libraries/Packages

```json
// package.json

{
  "name": "ifc-music-player",
  "version": "1.0.0",
  "dependencies": {
    // Core React Native
    "react": "18.2.0",
    "react-native": "0.73.0",
    
    // Navigation
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-screens": "^3.29.0",
    "react-native-safe-area-context": "^4.8.2",
    
    // Audio Playback
    "react-native-track-player": "^4.0.1",     // Best for music playback
    "react-native-sound": "^0.11.2",           // Alternative audio library
    
    // File Management
    "react-native-fs": "^2.20.0",              // File system access
    "react-native-document-picker": "^9.1.1",  // Pick files from device
    "react-native-share": "^10.0.2",           // Share functionality
    
    // UI Components
    "react-native-paper": "^5.11.3",           // Material Design components
    "react-native-vector-icons": "^10.0.3",    // Icon library
    "react-native-linear-gradient": "^2.8.3",  // Gradient backgrounds
    
    // Visualization
    "react-native-svg": "^14.1.0",             // SVG support
    "react-native-waveform": "^1.0.0",         // Audio waveform
    "react-native-canvas": "^0.1.38",          // Canvas for custom viz
    
    // State Management (Optional but recommended)
    "redux": "^5.0.0",
    "react-redux": "^9.0.4",
    "@reduxjs/toolkit": "^2.0.1",
    
    // Utilities
    "axios": "^1.6.2",                         // HTTP requests (if using web service)
    "moment": "^2.29.4",                       // Date/time handling
    "react-native-async-storage": "^1.21.0"    // Local storage
  },
  "devDependencies": {
    "@babel/core": "^7.23.6",
    "@babel/preset-env": "^7.23.6",
    "@babel/runtime": "^7.23.6",
    "@react-native/eslint-config": "^0.73.1",
    "@react-native/metro-config": "^0.73.3",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  }
}
```

### Recommended Audio Library Setup

**react-native-track-player** (Primary Choice)
```javascript
// services/AudioService.js
import TrackPlayer, { 
  Capability, 
  State 
} from 'react-native-track-player';

// Initialize audio service
export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop,
      Capability.SeekTo,
    ],
    compactCapabilities: [
      Capability.Play,
      Capability.Pause,
    ],
  });
};

// Add track
export const addTrack = async (track) => {
  await TrackPlayer.add({
    id: track.id,
    url: track.url,
    title: track.title,
    artist: track.artist,
    artwork: track.artwork,
  });
};

// Playback controls
export const play = () => TrackPlayer.play();
export const pause = () => TrackPlayer.pause();
export const seekTo = (seconds) => TrackPlayer.seekTo(seconds);
```

### 2.5 Mobile App User Flow

```
1. Launch App
   ↓
2. Main Screen (Library View)
   - List of available music tracks
   - Search/Filter options
   ↓
3. Select Track
   ↓
4. Player Screen
   - Play controls
   - Visualization
   - Building metadata display
   ↓
5. Playback
   - Real-time visualization
   - Element highlighting (optional)
   ↓
6. Settings/Options
   - Adjust preferences
   - Manage files
```

### 2.6 UI/UX Design Considerations

#### Color Scheme
- Architectural theme (grays, blues, metallics)
- Clean, modern interface
- Dark mode support

#### Typography
- Clear, readable fonts
- Hierarchical information display
- Building metadata emphasized

#### Interactions
- Intuitive gesture controls (swipe, tap, pinch)
- Smooth animations
- Responsive feedback

---

## Phase 3: Integration & Workflow

### 3.1 Complete User Workflow

```
ARCHITECT/USER WORKFLOW:

1. Design building in Revit
   ↓
2. Export to IFC format (.ifc file)
   ↓
3. Run Python Converter
   - Input: IFC file
   - Configure mapping preferences
   - Generate music files
   ↓
4. Transfer files to mobile device
   - Cloud storage (Dropbox, Google Drive)
   - Direct USB transfer
   - Email/messaging
   ↓
5. Open Mobile App
   ↓
6. Import music files
   ↓
7. Play and enjoy architectural music!
```

### 3.2 File Transfer Options

#### Option 1: Cloud Integration
- Implement cloud storage integration (Google Drive, Dropbox)
- Auto-sync generated files
- Access from anywhere

#### Option 2: Direct Import
- Use device file picker
- Manual file transfer via cable/email
- Import from local storage

#### Option 3: Web Service (Advanced)
- Upload IFC to web server
- Server processes and generates music
- Download directly to mobile app
- Requires backend infrastructure

### 3.3 Metadata File Format

```json
// building_music_metadata.json

{
  "project_info": {
    "building_name": "Modern Office Tower",
    "project_id": "PRJ-2024-001",
    "export_date": "2024-12-01",
    "revit_version": "2024"
  },
  
  "music_info": {
    "duration": 180.5,
    "tempo": 120,
    "key": "C_major",
    "total_tracks": 6
  },
  
  "mapping_config": {
    "strategy": "spatial_sequencing",
    "elements_mapped": 237
  },
  
  "element_breakdown": {
    "columns": {
      "count": 48,
      "instrument": "Piano",
      "midi_instrument": 0
    },
    "beams": {
      "count": 156,
      "instrument": "Violin",
      "midi_instrument": 40
    },
    "walls": {
      "count": 33,
      "instrument": "Pad",
      "midi_instrument": 88
    }
  },
  
  "timeline": [
    {
      "timestamp": 0.0,
      "element_type": "column",
      "element_id": "COL-001",
      "note": "C4",
      "velocity": 80
    },
    {
      "timestamp": 0.5,
      "element_type": "beam",
      "element_id": "BEAM-045",
      "note": "E4",
      "velocity": 70
    }
    // ... more timeline entries
  ]
}
```

---

## Phase 4: Development Roadmap

### Stage 1: Proof of Concept (2-3 weeks)
**Python Converter - Basic Version**
- [ ] Set up development environment
- [ ] Install required libraries
- [ ] Create basic IFC parser
- [ ] Extract column data only
- [ ] Implement simple height-to-pitch mapping
- [ ] Generate basic MIDI file
- [ ] Test with sample IFC file

**Deliverable:** Working script that converts column heights to piano notes

### Stage 2: Enhanced Converter (3-4 weeks)
**Python Converter - Full Version**
- [ ] Add support for beams, walls, slabs
- [ ] Implement multiple mapping strategies
- [ ] Add instrument assignment logic
- [ ] Create configuration system
- [ ] Add MIDI to audio conversion
- [ ] Generate metadata JSON
- [ ] Create user documentation

**Deliverable:** Complete, configurable IFC-to-Music converter

### Stage 3: Mobile App MVP (4-6 weeks)
**Basic Mobile App**
- [ ] Set up mobile project (Flutter/React Native)
- [ ] Implement file import functionality
- [ ] Create basic audio player
- [ ] Design simple UI
- [ ] Add play/pause/seek controls
- [ ] Implement metadata display
- [ ] Test on physical devices

**Deliverable:** Functional mobile music player for generated tracks

### Stage 4: Visualization (3-4 weeks)
**Add Visual Elements**
- [ ] Waveform visualization
- [ ] Element timeline indicator
- [ ] Building statistics display
- [ ] Track progress visualization
- [ ] UI polish and animations

**Deliverable:** Enhanced app with rich visualizations

### Stage 5: Advanced Features (4-6 weeks)
**Optional Enhancements**
- [ ] 3D building visualization
- [ ] Interactive mapping editor
- [ ] Cloud integration
- [ ] Social features
- [ ] Advanced audio effects
- [ ] Export capabilities

**Deliverable:** Feature-complete application

---

## Technical Requirements

### Development Environment

#### Python Development
- Python 3.8 or higher
- IDE: PyCharm, VS Code, or Jupyter Notebook
- Virtual environment for package management

#### Mobile Development (React Native)
- **Node.js** 16+ (LTS version recommended)
- **npm** or **yarn** package manager
- **React Native CLI** (not Expo CLI for this project)
- **Code Editor:** VS Code with React Native extensions
- **Android Studio** (for Android development)
  - Android SDK
  - Android Emulator or physical device
- **Xcode** (for iOS development, Mac only)
  - iOS Simulator
  - CocoaPods
- **Watchman** (for file watching on Mac/Linux)

### Hardware Requirements
- Modern computer (Windows/Mac/Linux)
- 8GB+ RAM recommended
- Mobile device for testing (iOS 12+ or Android 8+)

### Software Tools
- Git for version control
- Postman (if implementing web service)
- Audio editing software (Audacity) for testing
- Revit (for creating/exporting IFC files)

---

## Testing Strategy

### Python Converter Testing
1. **Unit Tests**
   - Test IFC parsing functions
   - Test mapping algorithms
   - Test MIDI generation

2. **Integration Tests**
   - End-to-end conversion
   - Different IFC file types
   - Various building complexities

3. **Output Validation**
   - MIDI file playback quality
   - Audio conversion accuracy
   - Metadata correctness

### Mobile App Testing
1. **Functional Testing**
   - File import/export
   - Playback controls
   - UI interactions

2. **Performance Testing**
   - Large file handling
   - Battery consumption
   - Memory usage

3. **Compatibility Testing**
   - Different device sizes
   - iOS vs Android
   - Various OS versions

---

## Potential Challenges & Solutions

### Challenge 1: Large IFC Files
**Problem:** Complex buildings = large files = slow processing
**Solutions:**
- Implement progress indicators
- Add element filtering options
- Optimize parsing algorithms
- Process in background threads

### Challenge 2: Musical Quality
**Problem:** Random data might create unpleasant music
**Solutions:**
- Use musical scales (not chromatic)
- Implement harmonic rules
- Add rhythm quantization
- Allow manual fine-tuning

### Challenge 3: Mobile Performance
**Problem:** Audio playback + visualization = battery drain
**Solutions:**
- Optimize rendering
- Use efficient audio codecs
- Implement power-saving mode
- Cache processed data

### Challenge 4: File Transfer
**Problem:** Getting files from desktop to mobile
**Solutions:**
- Cloud storage integration
- QR code sharing
- Local network transfer
- Email attachment support

---

## Future Expansion Ideas

### 1. Web Application
- Browser-based converter
- No Python installation needed
- Upload IFC, download music instantly

### 2. Real-time Generation
- Process IFC on mobile device
- Adjust mappings in real-time
- Immediate audio feedback

### 3. VR/AR Integration
- Walk through building while music plays
- Visual-spatial-audio experience
- Interactive building exploration

### 4. AI Enhancement
- Machine learning for better mappings
- Style transfer (make it sound like specific genres)
- Adaptive composition based on building function

### 5. Collaboration Features
- Share your building-music
- Community presets
- Collaborative compositions

### 6. Professional Use Cases
- Architectural presentations
- Marketing materials
- Installation art
- Building identity/branding

---

## Cost Estimation

### Development Costs (Time-based)

| Phase | Estimated Time | Complexity |
|-------|---------------|------------|
| Python Converter (Basic) | 2-3 weeks | Medium |
| Python Converter (Full) | 3-4 weeks | Medium-High |
| Mobile App (MVP) | 4-6 weeks | Medium |
| Visualization | 3-4 weeks | Medium |
| Advanced Features | 4-6 weeks | High |
| **Total** | **16-23 weeks** | - |

### Tools & Services (Annual Costs)

| Item | Cost | Notes |
|------|------|-------|
| Development Tools | Free | VS Code, Android Studio (free) |
| Apple Developer Account | $99/year | Required for iOS |
| Google Play Developer | $25 one-time | For Android |
| Cloud Storage (optional) | $0-60/year | Depends on usage |
| Web Hosting (optional) | $0-120/year | If implementing web service |
| **Total** | **$124-304/year** | - |

---

## Getting Started - Quick Start Guide

### Step 1: Set Up Python Environment (30 minutes)

```bash
# Create project directory
mkdir ifc-to-music
cd ifc-to-music

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install basic libraries
pip install ifcopenshell mido music21 numpy
```

### Step 2: Test IFC Parsing (1 hour)

Create `test_ifc_parser.py`:
```python
import ifcopenshell

# Load IFC file
ifc_file = ifcopenshell.open("sample_building.ifc")

# Get all columns
columns = ifc_file.by_type("IfcColumn")

print(f"Found {len(columns)} columns")

for column in columns[:5]:  # Print first 5
    print(f"Column: {column.Name}")
    # Extract properties
```

### Step 3: Create Simple MIDI (2 hours)

Create `simple_midi_generator.py`:
```python
import mido
from mido import MidiFile, MidiTrack, Message

# Create MIDI file
mid = MidiFile()
track = MidiTrack()
mid.tracks.append(track)

# Add notes (C major scale)
notes = [60, 62, 64, 65, 67, 69, 71, 72]  # C, D, E, F, G, A, B, C

for note in notes:
    track.append(Message('note_on', note=note, velocity=64, time=0))
    track.append(Message('note_off', note=note, velocity=64, time=480))

# Save MIDI
mid.save('test_output.mid')
print("MIDI file created!")
```

### Step 4: Combine IFC + MIDI (3-4 hours)

Create your first integration that maps column heights to notes.

### Step 5: Set Up React Native Project (2-3 hours)

```bash
# Check if you have Node.js installed
node --version
npm --version

# Install React Native CLI globally
npm install -g react-native-cli

# Create new React Native project
npx react-native init IFCMusicPlayer
cd IFCMusicPlayer

# Install essential dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-track-player
npm install react-native-fs react-native-document-picker
npm install react-native-paper react-native-vector-icons

# Install iOS dependencies (Mac only)
cd ios
pod install
cd ..

# Run on Android
npx react-native run-android

# Run on iOS (Mac only)
npx react-native run-ios
```

**Create basic Player Screen:**

```javascript
// src/screens/PlayerScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlayerScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const progress = useProgress();

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IFC Music Player</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text>{formatTime(progress.position)}</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(progress.position / progress.duration) * 100}%` }
            ]} 
          />
        </View>
        <Text>{formatTime(progress.duration)}</Text>
      </View>

      {/* Play/Pause Button */}
      <TouchableOpacity 
        style={styles.playButton}
        onPress={togglePlayback}
      >
        <Icon 
          name={isPlaying ? "pause" : "play-arrow"} 
          size={60} 
          color="#fff" 
        />
      </TouchableOpacity>
    </View>
  );
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    marginHorizontal: 10,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 2,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerScreen;
```

---

## React Native Implementation Guide

### Complete App Setup

#### 1. Project Initialization

```bash
# Create project
npx react-native init IFCMusicPlayer --template react-native-template-typescript
cd IFCMusicPlayer

# Install all dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
npm install react-native-track-player
npm install react-native-fs react-native-document-picker
npm install react-native-paper react-native-vector-icons
npm install react-native-linear-gradient react-native-svg
npm install @reduxjs/toolkit react-redux
npm install react-native-async-storage

# iOS specific (Mac only)
cd ios && pod install && cd ..
```

#### 2. Core Service: Audio Player

```javascript
// src/services/AudioPlayerService.js

import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  RepeatMode,
  Event
} from 'react-native-track-player';

class AudioPlayerService {
  static async initialize() {
    try {
      await TrackPlayer.setupPlayer({
        maxCacheSize: 1024 * 10, // 10 MB
      });

      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.SeekTo,
          Capability.Skip,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
        progressUpdateEventInterval: 1,
      });

      console.log('Audio Player initialized successfully');
    } catch (error) {
      console.error('Error initializing audio player:', error);
    }
  }

  static async addTrack(track) {
    try {
      await TrackPlayer.add({
        id: track.id,
        url: track.url, // Can be local file path or URL
        title: track.title,
        artist: track.artist || 'IFC Music',
        artwork: track.artwork,
        duration: track.duration,
      });
    } catch (error) {
      console.error('Error adding track:', error);
    }
  }

  static async addMultipleTracks(tracks) {
    try {
      await TrackPlayer.add(tracks);
    } catch (error) {
      console.error('Error adding tracks:', error);
    }
  }

  static async play() {
    await TrackPlayer.play();
  }

  static async pause() {
    await TrackPlayer.pause();
  }

  static async stop() {
    await TrackPlayer.stop();
  }

  static async seekTo(position) {
    await TrackPlayer.seekTo(position);
  }

  static async skipToNext() {
    await TrackPlayer.skipToNext();
  }

  static async skipToPrevious() {
    await TrackPlayer.skipToPrevious();
  }

  static async setRepeatMode(mode) {
    await TrackPlayer.setRepeatMode(mode);
  }

  static async getCurrentTrack() {
    return await TrackPlayer.getActiveTrack();
  }

  static async getQueue() {
    return await TrackPlayer.getQueue();
  }

  static async reset() {
    await TrackPlayer.reset();
  }
}

export default AudioPlayerService;
```

#### 3. File Management Service

```javascript
// src/services/FileService.js

import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

class FileService {
  static MUSIC_DIRECTORY = `${RNFS.DocumentDirectoryPath}/music`;
  static METADATA_DIRECTORY = `${RNFS.DocumentDirectoryPath}/metadata`;

  static async initialize() {
    try {
      // Create directories if they don't exist
      const musicDirExists = await RNFS.exists(this.MUSIC_DIRECTORY);
      const metadataDirExists = await RNFS.exists(this.METADATA_DIRECTORY);

      if (!musicDirExists) {
        await RNFS.mkdir(this.MUSIC_DIRECTORY);
      }
      if (!metadataDirExists) {
        await RNFS.mkdir(this.METADATA_DIRECTORY);
      }

      console.log('File service initialized');
    } catch (error) {
      console.error('Error initializing file service:', error);
    }
  }

  static async pickMusicFile() {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.audio,
          'audio/midi',
          'audio/x-midi',
        ],
      });

      return result[0];
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Error picking file:', error);
      }
      return null;
    }
  }

  static async pickMetadataFile() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.json],
      });

      return result[0];
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Error picking metadata:', error);
      }
      return null;
    }
  }

  static async importMusicFile(sourceUri, filename) {
    try {
      const destPath = `${this.MUSIC_DIRECTORY}/${filename}`;
      await RNFS.copyFile(sourceUri, destPath);
      return destPath;
    } catch (error) {
      console.error('Error importing music file:', error);
      return null;
    }
  }

  static async importMetadataFile(sourceUri, filename) {
    try {
      const destPath = `${this.METADATA_DIRECTORY}/${filename}`;
      await RNFS.copyFile(sourceUri, destPath);
      
      // Read and parse JSON
      const content = await RNFS.readFile(destPath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Error importing metadata:', error);
      return null;
    }
  }

  static async listMusicFiles() {
    try {
      const files = await RNFS.readDir(this.MUSIC_DIRECTORY);
      return files.filter(file => 
        file.name.endsWith('.mp3') || 
        file.name.endsWith('.wav') || 
        file.name.endsWith('.mid')
      );
    } catch (error) {
      console.error('Error listing music files:', error);
      return [];
    }
  }

  static async deleteMusicFile(filepath) {
    try {
      await RNFS.unlink(filepath);
      return true;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }
}

export default FileService;
```

#### 4. Main Player Screen (Complete)

```javascript
// src/screens/PlayerScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
  useActiveTrack,
  State,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

const PlayerScreen = ({ route }) => {
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const activeTrack = useActiveTrack();
  const [metadata, setMetadata] = useState(null);

  const isPlaying = playbackState.state === State.Playing;

  useEffect(() => {
    // Load metadata if available
    if (route.params?.metadata) {
      setMetadata(route.params.metadata);
    }
  }, [route.params]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handleSeek = async (value) => {
    await TrackPlayer.seekTo(value);
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient
      colors={['#1a1a2e', '#16213e', '#0f3460']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Album Art / Building Visualization */}
        <View style={styles.artworkContainer}>
          <Image
            source={
              activeTrack?.artwork
                ? { uri: activeTrack.artwork }
                : require('../assets/default-artwork.png')
            }
            style={styles.artwork}
          />
        </View>

        {/* Track Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {activeTrack?.title || 'No Track Playing'}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {activeTrack?.artist || 'Unknown Artist'}
          </Text>
        </View>

        {/* Building Metadata */}
        {metadata && (
          <View style={styles.metadataContainer}>
            <Text style={styles.metadataTitle}>Building Information</Text>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Project:</Text>
              <Text style={styles.metadataValue}>
                {metadata.project_info?.building_name}
              </Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Elements:</Text>
              <Text style={styles.metadataValue}>
                {metadata.mapping_config?.elements_mapped}
              </Text>
            </View>
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Key:</Text>
              <Text style={styles.metadataValue}>
                {metadata.music_info?.key}
              </Text>
            </View>
          </View>
        )}

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Slider
            style={styles.slider}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration || 1}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#404040"
            thumbTintColor="#1DB954"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatTime(progress.position)}
            </Text>
            <Text style={styles.timeText}>
              {formatTime(progress.duration)}
            </Text>
          </View>
        </View>

        {/* Playback Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={skipToPrevious}
          >
            <Icon name="skip-previous" size={40} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayback}
          >
            <Icon
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={50}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={skipToNext}
          >
            <Icon name="skip-next" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  artworkContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  artwork: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
  metadataContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  metadataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  metadataLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  metadataValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  progressContainer: {
    marginVertical: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#aaa',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 20,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default PlayerScreen;
```

#### 5. Library/Home Screen

```javascript
// src/screens/LibraryScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FileService from '../services/FileService';
import AudioPlayerService from '../services/AudioPlayerService';

const LibraryScreen = ({ navigation }) => {
  const [musicFiles, setMusicFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMusicFiles();
  }, []);

  const loadMusicFiles = async () => {
    setLoading(true);
    const files = await FileService.listMusicFiles();
    setMusicFiles(files);
    setLoading(false);
  };

  const handleImport = async () => {
    const musicFile = await FileService.pickMusicFile();
    if (musicFile) {
      const imported = await FileService.importMusicFile(
        musicFile.uri,
        musicFile.name
      );
      if (imported) {
        Alert.alert('Success', 'Music file imported successfully');
        loadMusicFiles();
      }
    }
  };

  const handlePlayTrack = async (file) => {
    await AudioPlayerService.reset();
    await AudioPlayerService.addTrack({
      id: file.name,
      url: `file://${file.path}`,
      title: file.name.replace(/\.[^/.]+$/, ''),
      artist: 'IFC Music',
    });
    await AudioPlayerService.play();
    navigation.navigate('Player');
  };

  const handleDeleteTrack = async (file) => {
    Alert.alert(
      'Delete Track',
      `Are you sure you want to delete ${file.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await FileService.deleteMusicFile(file.path);
            loadMusicFiles();
          },
        },
      ]
    );
  };

  const renderTrackItem = ({ item }) => (
    <TouchableOpacity
      style={styles.trackItem}
      onPress={() => handlePlayTrack(item)}
    >
      <View style={styles.trackIcon}>
        <Icon name="music-note" size={24} color="#1DB954" />
      </View>
      <View style={styles.trackInfo}>
        <Text style={styles.trackName} numberOfLines={1}>
          {item.name.replace(/\.[^/.]+$/, '')}
        </Text>
        <Text style={styles.trackSize}>
          {(item.size / 1024 / 1024).toFixed(2)} MB
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTrack(item)}
      >
        <Icon name="delete" size={24} color="#ff4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Music Library</Text>
        <TouchableOpacity style={styles.importButton} onPress={handleImport}>
          <Icon name="add" size={24} color="#fff" />
          <Text style={styles.importText}>Import</Text>
        </TouchableOpacity>
      </View>

      {musicFiles.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="library-music" size={80} color="#555" />
          <Text style={styles.emptyText}>No music files yet</Text>
          <Text style={styles.emptySubtext}>
            Tap Import to add your IFC music
          </Text>
        </View>
      ) : (
        <FlatList
          data={musicFiles}
          renderItem={renderTrackItem}
          keyExtractor={(item) => item.path}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#252525',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  importButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1DB954',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  importText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
  },
  listContent: {
    padding: 15,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  trackIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  trackSize: {
    fontSize: 12,
    color: '#888',
  },
  deleteButton: {
    padding: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#888',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default LibraryScreen;
```

#### 6. App Navigation Setup

```javascript
// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LibraryScreen from '../screens/LibraryScreen';
import PlayerScreen from '../screens/PlayerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: '#888',
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="library-music" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Player"
        component={PlayerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="play-circle-filled" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
```

#### 7. Main App Entry Point

```javascript
// App.js

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import AppNavigator from './src/navigation/AppNavigator';
import AudioPlayerService from './src/services/AudioPlayerService';
import FileService from './src/services/FileService';

const App = () => {
  useEffect(() => {
    const initialize = async () => {
      await AudioPlayerService.initialize();
      await FileService.initialize();
    };

    initialize();

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <AppNavigator />
    </>
  );
};

export default App;
```

---

## Resources & Learning Materials

### IFC & Revit
- [IFC Documentation](http://www.buildingsmart-tech.org/ifc/IFC4/final/html/)
- [IfcOpenShell Documentation](http://ifcopenshell.org/python)
- Revit IFC Export Guide

### Music Programming
- [Mido Documentation](https://mido.readthedocs.io/)
- [Music21 Documentation](http://web.mit.edu/music21/)
- MIDI Protocol Reference

### React Native Development
- [React Native Documentation](https://reactnative.dev/)
- [React Native Track Player](https://react-native-track-player.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper Components](https://callstack.github.io/react-native-paper/)

### Mobile Development
- [Flutter Documentation](https://flutter.dev/docs) (alternative platform)
- Audio Plugin Tutorials

### Inspiration
- "Music from Architecture" projects
- Generative music examples
- Data sonification projects

---

## Conclusion

This project bridges architecture and music in a creative, technical way. The two-phase approach (Python converter + Mobile app) keeps complexity manageable while creating a unique end product.

**Key Success Factors:**
1. Start simple - prove the concept works
2. Iterate on musical quality
3. Focus on user experience in mobile app
4. Document everything for future expansion

**Next Steps:**
1. Set up Python development environment
2. Get sample IFC file from Revit
3. Create proof-of-concept converter
4. Test and refine musical output
5. Begin mobile app development

Good luck with your architectural music project! 🎵🏗️
