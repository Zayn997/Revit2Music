# IFC Music Player

A mobile application built with Expo that plays music generated from architectural IFC (Industry Foundation Classes) files. This app transforms building elements into playable music, creating a unique sonic representation of architecture.

## Features

- 🎵 **Music Library**: Import and manage IFC-generated music files
- ▶️ **Audio Player**: Play music with full playback controls
- 🏗️ **Building Metadata**: View architectural information embedded in the music
- 📊 **Element Visualization**: See which building elements are mapped to instruments
- ⚙️ **Settings**: Customize app preferences

## Technology Stack

- **Expo** (~54.0.25) - React Native framework
- **React Navigation** - Navigation library for screens and tabs
- **expo-audio** - Audio playback functionality
- **expo-file-system** - File management
- **expo-document-picker** - Import files from device
- **TypeScript** - Type-safe development

## Getting Started

### Prerequisites

- Node.js 16+ installed
- Expo CLI
- iOS Simulator (Mac) or Android Emulator/Device

### Installation

1. Clone the repository:

```bash
cd IFCMusicPlayer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your device:

- **Android**: Press `a` in the terminal or run `npm run android`
- **iOS**: Press `i` in the terminal or run `npm run ios` (Mac only)
- **Expo Go**: Scan the QR code with the Expo Go app

## Project Structure

```
IFCMusicPlayer/
├── src/
│   ├── services/
│   │   ├── AudioService.ts      # Audio playback management
│   │   └── FileService.ts        # File import/export
│   ├── screens/
│   │   ├── LibraryScreen.tsx     # Music library view
│   │   ├── PlayerScreen.tsx      # Music player
│   │   └── SettingsScreen.tsx    # App settings
│   ├── navigation/
│   │   └── AppNavigator.tsx      # Navigation setup
│   └── types/
│       └── index.ts              # TypeScript definitions
├── assets/                       # Images and icons
├── App.tsx                       # Main app component
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript configuration
```

## Usage

### Importing Music Files

1. Generate music files from IFC using the Python converter
2. Transfer files to your mobile device
3. Open the IFC Music Player app
4. Tap the "Import" button on the Library screen
5. Select your music file
6. The file will be imported and saved to your library

### Playing Music

1. Navigate to the Library screen
2. Tap on a track to start playing
3. View building metadata and element breakdowns
4. Use playback controls to play/pause and seek

### Supported File Formats

- **Audio**: MP3, WAV
- **Metadata**: JSON (optional, contains building information)

## Architecture-to-Music Mapping

The app displays information about how building elements were mapped to music:

- **Columns** → Piano/Bass
- **Beams** → Strings (Violin, Cello)
- **Walls** → Pads/Sustained instruments
- **Slabs** → Percussion

Each track can include metadata showing:

- Building name and project info
- Number of elements mapped
- Musical key and tempo
- Element breakdown by type

## Development

### Running Tests

```bash
npm test
```

### Building for Production

**Android**:

```bash
eas build --platform android
```

**iOS**:

```bash
eas build --platform ios
```

## Roadmap

- [ ] Add waveform visualization
- [ ] Support for MIDI file playback
- [ ] 3D building visualization
- [ ] Interactive mapping editor
- [ ] Cloud storage integration
- [ ] Social sharing features

## Related Projects

This mobile app works in conjunction with:

- **IFC-to-Music Converter** (Python) - Converts IFC files to music

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is part of the IFC-to-Music ecosystem.

## Contact

For questions or support, please open an issue in the repository.
