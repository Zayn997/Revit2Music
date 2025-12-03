## Goals
- Convert Revit-exported IFC into music (MIDI + optional MP3/WAV)
- Provide a mobile app to import, play, and visualize the generated tracks with metadata

## Deliverables
- Python converter producing `outputs/midi/*.mid`, `outputs/audio/*.mp3|*.wav` and `outputs/metadata/*.json`
- React Native app (Android/iOS) with Library, Player, and Settings screens
- Minimal tests and a sample run on a provided IFC file

## Python Converter
1. Project setup
- Create a Python package with directories: `parsers`, `mappers`, `generators`, `utils`, plus `main.py` and `config.yaml`
- Pin dependencies: `ifcopenshell`, `mido` (core), `pretty_midi`/`music21` (optional), `fluidsynth`/`pydub` (optional)

2. IFC parsing & extraction
- Load `.ifc` with `ifcopenshell`
- Extract: `IfcColumn`, `IfcBeam`, `IfcWall`, `IfcSlab`, `IfcSpace`
- Collect key properties: dimensions, position, level, material, counts

3. Normalization
- Map architectural values into bounded ranges (e.g., heights → [36,84] MIDI notes)
- Handle units (meters vs. millimeters) and missing data

4. Mapping rules
- Columns: height → pitch, cross-section → velocity, level → octave
- Beams: length → duration, material → instrument (strings)
- Walls: area → velocity, orientation → timing offset
- Slabs: area → percussion density
- Global: key, tempo, time signature, note range, quantization

5. Composition engine
- Start with Spatial Sequencing (2D grid: X=time, Y=pitch)
- Provide Parametric and Layered strategies as config options

6. MIDI/audio generation
- Use `mido` to write multi-track MIDI, instruments per element type
- Optional: render audio via `fluidsynth` to MP3/WAV

7. Metadata JSON
- Emit `building_music_metadata.json` with project info, mapping summary, per-element timeline

8. CLI & config
- `main.py --ifc <path> --config <path> --out <dir> [--audio]`
- `config.yaml` controls key, tempo, strategy, instrument assignments

9. Testing & sample
- Unit tests: parsers, mapping, MIDI writer
- Integration test: end-to-end on a sample IFC producing at least one track

## Mobile App (React Native)
1. Project scaffolding
- Initialize RN project (TS template)
- Install: `react-native-track-player`, `react-native-fs`, `react-native-document-picker`, navigation and UI libs

2. Services
- `AudioPlayerService`: setup, queue management, play/pause/seek/skip, repeat mode
- `FileService`: import/list/delete local `.mid/.mp3/.wav`, load metadata JSON

3. Screens & navigation
- Library: list imported tracks, import button, delete
- Player: artwork placeholder, progress/seek slider, play/pause/skip, metadata summary
- Settings: basic preferences (audio quality, visualization toggles)
- Bottom tabs with stack navigator

4. Visualization (MVP)
- Simple progress bar and textual element stats from metadata
- Future: waveform and building element timeline

5. Device testing
- Run on Android emulator/device (Windows); iOS later on macOS

## File Workflow
- Export IFC from Revit
- Run Python converter locally → produce MIDI/audio/metadata
- Transfer files to device or import via file picker
- Play and visualize in the mobile app

## Milestones
- POC converter: columns → piano notes; single MIDI
- Full converter: beams/walls/slabs, multiple strategies, metadata
- App MVP: import, library, player controls, basic metadata display

## Inputs Needed
- A sample `.ifc` you’re comfortable sharing
- Preference: generate MIDI only or also MP3/WAV
- Initial musical style: key/tempo/instrument families

## Confirmation
- Approve this plan to proceed with creating the Python converter skeleton and the RN app scaffold, followed by a first end-to-end run on your IFC.