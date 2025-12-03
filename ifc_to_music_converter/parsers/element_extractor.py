def extract_by_type(ifc, type_name):
    return ifc.by_type(type_name)

def _num(v):
    try:
        return float(v)
    except Exception:
        return None

def _attr(e, name):
    return getattr(e, name, None)

def _basic(e, type_name):
    return {
        "id": e.GlobalId,
        "type": type_name,
        "name": e.Name,
        "level": getattr(getattr(e, "ContainedInStructure", None), "RelatingStructure", None).Name if getattr(e, "ContainedInStructure", None) else None,
    }

def _column(e):
    d = _basic(e, "IfcColumn")
    d["height"] = _num(_attr(e, "OverallHeight"))
    d["x"] = None
    d["y"] = None
    d["material"] = None
    return d

def _beam(e):
    d = _basic(e, "IfcBeam")
    d["length"] = None
    d["material"] = None
    return d

def _wall(e):
    d = _basic(e, "IfcWall")
    d["length"] = None
    d["height"] = None
    d["thickness"] = None
    d["area"] = None
    d["material"] = None
    return d

def _slab(e):
    d = _basic(e, "IfcSlab")
    d["area"] = None
    d["thickness"] = None
    d["material"] = None
    return d

def _space(e):
    d = _basic(e, "IfcSpace")
    d["volume"] = None
    d["area"] = None
    return d

def extract_columns(ifc):
    return [_column(e) for e in extract_by_type(ifc, "IfcColumn")]

def extract_beams(ifc):
    return [_beam(e) for e in extract_by_type(ifc, "IfcBeam")]

def extract_walls(ifc):
    return [_wall(e) for e in extract_by_type(ifc, "IfcWall")]

def extract_slabs(ifc):
    return [_slab(e) for e in extract_by_type(ifc, "IfcSlab")]

def extract_spaces(ifc):
    return [_space(e) for e in extract_by_type(ifc, "IfcSpace")]
