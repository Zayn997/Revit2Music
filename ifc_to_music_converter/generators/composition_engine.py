def spatial_sequence(elements, note_picker, velocity_picker, duration_picker, ticks_per_step):
    events = []
    x = 0
    for e in elements:
        note = note_picker(e)
        vel = velocity_picker(e)
        dur = duration_picker(e)
        events.append({"note": note, "velocity": vel, "time_on": 0 if x == 0 else ticks_per_step, "time_off": dur})
        x += 1
    return events

def compose_tracks(columns, beams, walls, slabs, cfg):
    from ..mappers.mapping_rules import element_mapping
    from ..mappers.instrument_assigner import instrument_for_element
    ticks = 480
    tracks = []
    def pick_note(e):
        n, v, d = element_mapping(e, cfg)
        return n
    def pick_vel(e):
        n, v, d = element_mapping(e, cfg)
        return v
    def pick_dur(e):
        n, v, d = element_mapping(e, cfg)
        return d
    for group in [(columns, "IfcColumn"), (beams, "IfcBeam"), (walls, "IfcWall"), (slabs, "IfcSlab")]:
        elems, type_name = group
        if not elems:
            continue
        prog = instrument_for_element(type_name, None)
        evs = spatial_sequence(elems, pick_note, pick_vel, pick_dur, ticks)
        tracks.append({"program": prog, "events": evs})
    return tracks
