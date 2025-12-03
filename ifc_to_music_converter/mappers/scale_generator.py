def midi_scale(key, scale_type, note_lo, note_hi):
    steps = [0, 2, 4, 5, 7, 9, 11]
    if scale_type == "minor":
        steps = [0, 2, 3, 5, 7, 8, 10]
    tonic = 60
    notes = []
    for n in range(note_lo, note_hi + 1):
        if (n - tonic) % 12 in steps:
            notes.append(n)
    return notes
