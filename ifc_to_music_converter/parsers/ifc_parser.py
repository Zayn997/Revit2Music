def parse_ifc(path):
    import ifcopenshell
    return ifcopenshell.open(path)
