def convert_midi_to_audio(midi_path, audio_path, sample_rate, soundfont_path):
    try:
        import pretty_midi
        import numpy as np
        from scipy.io.wavfile import write
        pm = pretty_midi.PrettyMIDI(midi_path)
        audio = pm.fluidsynth(soundfont=soundfont_path, sample_rate=sample_rate)
        write(audio_path, sample_rate, (audio * 32767).astype(np.int16))
        return True
    except Exception:
        return False
