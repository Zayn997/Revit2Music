from ifc_to_music_converter.mappers.mapping_rules import height_to_pitch
from ifc_to_music_converter.generators.midi_generator import create_midi

def test_height_to_pitch_bounds():
    n1 = height_to_pitch(2.0, 36, 84, 2.0, 6.0)
    n2 = height_to_pitch(6.0, 36, 84, 2.0, 6.0)
    assert 36 <= n1 <= 84
    assert 36 <= n2 <= 84

def test_create_midi_empty():
    mid = create_midi([])
    assert len(mid.tracks) == 0
