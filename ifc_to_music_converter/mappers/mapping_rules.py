def clamp(v, lo, hi):
    if v is None:
        return lo
    if v < lo:
        return lo
    if v > hi:
        return hi
    return v

def scale_to_range(v, src_lo, src_hi, dst_lo, dst_hi):
    if src_hi == src_lo:
        return dst_lo
    ratio = (v - src_lo) / (src_hi - src_lo)
    return int(dst_lo + ratio * (dst_hi - dst_lo))

def height_to_pitch(height, note_lo, note_hi, min_h, max_h):
    h = clamp(height, min_h, max_h)
    return scale_to_range(h, min_h, max_h, note_lo, note_hi)

def area_to_velocity(area, vel_lo, vel_hi, min_a, max_a):
    a = clamp(area, min_a, max_a)
    return scale_to_range(a, min_a, max_a, vel_lo, vel_hi)

def length_to_duration(length, min_l, max_l, base_ticks):
    l = clamp(length, min_l, max_l)
    return int(base_ticks * (1 + (l - min_l) / max(1e-9, (max_l - min_l))))

def element_mapping(element, cfg):
    note_lo, note_hi = cfg.get("note_range", [36, 84])
    vel_lo, vel_hi = 40, 127
    base_ticks = 480
    t = element.get("type")
    if t == "IfcColumn":
        h = element.get("height") or 3.0
        note = height_to_pitch(h, note_lo, note_hi, 2.0, 6.0)
        vel = area_to_velocity(0.5, vel_lo, vel_hi, 0.1, 1.0)
        dur = length_to_duration(h, 2.0, 6.0, base_ticks)
        return note, vel, dur
    if t == "IfcBeam":
        l = element.get("length") or 3.0
        note = height_to_pitch(l, note_lo, note_hi, 2.0, 12.0)
        vel = area_to_velocity(0.5, vel_lo, vel_hi, 0.1, 1.0)
        dur = length_to_duration(l, 2.0, 12.0, base_ticks)
        return note, vel, dur
    if t == "IfcWall":
        a = element.get("area") or 10.0
        note = height_to_pitch(a, note_lo, note_hi, 5.0, 200.0)
        vel = area_to_velocity(a, vel_lo, vel_hi, 5.0, 200.0)
        dur = length_to_duration(a, 5.0, 200.0, base_ticks)
        return note, vel, dur
    if t == "IfcSlab":
        a = element.get("area") or 20.0
        note = height_to_pitch(a, note_lo, note_hi, 10.0, 500.0)
        vel = area_to_velocity(a, vel_lo, vel_hi, 10.0, 500.0)
        dur = length_to_duration(a, 10.0, 500.0, base_ticks)
        return note, vel, dur
    note = note_lo
    vel = vel_lo
    dur = base_ticks
    return note, vel, dur
