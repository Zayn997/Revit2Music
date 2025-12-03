def normalize(value, src_lo, src_hi, dst_lo, dst_hi):
    if src_hi == src_lo:
        return dst_lo
    ratio = (value - src_lo) / (src_hi - src_lo)
    return dst_lo + ratio * (dst_hi - dst_lo)

class Normalizer:
    def __init__(self):
        self.min = None
        self.max = None

    def fit(self, values):
        vals = [v for v in values if v is not None]
        if not vals:
            self.min = 0.0
            self.max = 1.0
        else:
            self.min = float(min(vals))
            self.max = float(max(vals))

    def clamp(self, v):
        if v is None:
            return self.min
        if v < self.min:
            return self.min
        if v > self.max:
            return self.max
        return v

    def to_range(self, v, lo, hi):
        if self.max == self.min:
            return lo
        x = self.clamp(v)
        r = (x - self.min) / (self.max - self.min)
        return lo + r * (hi - lo)
