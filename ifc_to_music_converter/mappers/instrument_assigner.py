def instrument_for_element(element_type, material):
    t = element_type.lower()
    if t == "ifccolumn":
        return 0
    if t == "ifcbeam":
        return 40
    if t == "ifcwall":
        return 88
    if t == "ifcslab":
        return 118
    return 0
