import argparse
import os
import json
import yaml
from parsers.ifc_parser import parse_ifc
from parsers.element_extractor import extract_columns, extract_beams, extract_walls, extract_slabs
from generators.composition_engine import compose_tracks
from generators.midi_generator import create_midi, save_midi
from generators.metadata import build_metadata

def load_config(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

def ensure_dirs(out_dir):
    os.makedirs(os.path.join(out_dir, "midi"), exist_ok=True)
    os.makedirs(os.path.join(out_dir, "audio"), exist_ok=True)
    os.makedirs(os.path.join(out_dir, "metadata"), exist_ok=True)

def write_metadata(meta, out_dir, name):
    p = os.path.join(out_dir, "metadata", name + "_metadata.json")
    with open(p, "w", encoding="utf-8") as f:
        json.dump(meta, f)
    return p

def run(ifc_path, cfg_path, out_dir, name):
    cfg = load_config(cfg_path)
    ensure_dirs(out_dir)
    ifc = parse_ifc(ifc_path)
    columns = extract_columns(ifc)
    beams = extract_beams(ifc)
    walls = extract_walls(ifc)
    slabs = extract_slabs(ifc)
    tracks = compose_tracks(columns, beams, walls, slabs, cfg)
    mid = create_midi(tracks)
    midi_path = os.path.join(out_dir, "midi", name + ".mid")
    save_midi(mid, midi_path)
    meta = build_metadata(tracks)
    meta_path = write_metadata(meta, out_dir, name)
    return midi_path, meta_path

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--ifc", required=True)
    p.add_argument("--config", default=os.path.join(os.path.dirname(__file__), "config.yaml"))
    p.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "outputs"))
    p.add_argument("--name", default="output")
    args = p.parse_args()
    midi_path, meta_path = run(args.ifc, args.config, args.out, args.name)
    print(midi_path)
    print(meta_path)

if __name__ == "__main__":
    main()
