from mido import MidiFile, MidiTrack, Message

def create_midi(tracks):
    mid = MidiFile()
    for t in tracks:
        track = MidiTrack()
        mid.tracks.append(track)
        if "program" in t:
            track.append(Message("program_change", program=t["program"], time=0))
        for ev in t.get("events", []):
            track.append(Message("note_on", note=ev["note"], velocity=ev["velocity"], time=ev.get("time_on", 0)))
            track.append(Message("note_off", note=ev["note"], velocity=ev["velocity"], time=ev.get("time_off", 480)))
    return mid

def save_midi(mid, path):
    mid.save(path)
