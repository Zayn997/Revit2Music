from ifc_to_music_converter.generators.composition_engine import compose_tracks
from ifc_to_music_converter.generators.midi_generator import create_midi

def test_compose_and_midi():
    cfg = {"note_range": [36, 84]}
    columns = [{"type": "IfcColumn", "height": 3.0} for _ in range(3)]
    beams = [{"type": "IfcBeam", "length": 5.0} for _ in range(2)]
    walls = []
    slabs = []
    tracks = compose_tracks(columns, beams, walls, slabs, cfg)
    mid = create_midi(tracks)
    assert len(mid.tracks) == len(tracks)
    assert sum(len(t.get("events", [])) for t in tracks) > 0
