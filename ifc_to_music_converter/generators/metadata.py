def build_metadata(tracks):
    total_events = 0
    breakdown = {}
    for t in tracks:
        total_events += len(t.get("events", []))
        k = t.get("program", 0)
        breakdown[k] = breakdown.get(k, 0) + len(t.get("events", []))
    return {"total_tracks": len(tracks), "total_events": total_events, "breakdown_by_program": breakdown}
