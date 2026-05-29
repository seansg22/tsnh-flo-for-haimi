// WHO Child Growth Standards — gender-specific percentiles
// Sampled every 4 weeks (0–52). Values linearly interpolated between samples.

export type GrowthMetric = 'weight' | 'length' | 'head';
export type Gender = 'girl' | 'boy';

interface PercentilePoint {
  week: number;
  p3: number;
  p50: number;
  p97: number;
}

// ── Weight (kg) ───────────────────────────────────────────────────────────────
const weightGirl: PercentilePoint[] = [
  { week: 0,  p3: 2.4, p50: 3.2,  p97: 4.2  },
  { week: 4,  p3: 3.1, p50: 4.2,  p97: 5.4  },
  { week: 8,  p3: 4.0, p50: 5.2,  p97: 6.6  },
  { week: 12, p3: 4.7, p50: 6.0,  p97: 7.6  },
  { week: 16, p3: 5.3, p50: 6.7,  p97: 8.4  },
  { week: 20, p3: 5.7, p50: 7.3,  p97: 9.2  },
  { week: 24, p3: 6.1, p50: 7.7,  p97: 9.7  },
  { week: 28, p3: 6.5, p50: 8.1,  p97: 10.2 },
  { week: 32, p3: 6.8, p50: 8.5,  p97: 10.6 },
  { week: 36, p3: 7.0, p50: 8.8,  p97: 11.0 },
  { week: 40, p3: 7.3, p50: 9.1,  p97: 11.4 },
  { week: 44, p3: 7.5, p50: 9.4,  p97: 11.7 },
  { week: 48, p3: 7.7, p50: 9.6,  p97: 12.0 },
  { week: 52, p3: 7.9, p50: 9.9,  p97: 12.4 },
];

const weightBoy: PercentilePoint[] = [
  { week: 0,  p3: 2.5, p50: 3.3,  p97: 4.4  },
  { week: 4,  p3: 3.3, p50: 4.4,  p97: 5.8  },
  { week: 8,  p3: 4.2, p50: 5.5,  p97: 7.0  },
  { week: 12, p3: 5.1, p50: 6.4,  p97: 8.2  },
  { week: 16, p3: 5.7, p50: 7.2,  p97: 9.1  },
  { week: 20, p3: 6.2, p50: 7.8,  p97: 9.8  },
  { week: 24, p3: 6.7, p50: 8.3,  p97: 10.4 },
  { week: 28, p3: 7.1, p50: 8.7,  p97: 10.9 },
  { week: 32, p3: 7.4, p50: 9.2,  p97: 11.5 },
  { week: 36, p3: 7.7, p50: 9.5,  p97: 11.9 },
  { week: 40, p3: 7.9, p50: 9.8,  p97: 12.2 },
  { week: 44, p3: 8.2, p50: 10.1, p97: 12.6 },
  { week: 48, p3: 8.5, p50: 10.4, p97: 12.9 },
  { week: 52, p3: 8.7, p50: 10.6, p97: 13.2 },
];

// ── Length (cm) ───────────────────────────────────────────────────────────────
const lengthGirl: PercentilePoint[] = [
  { week: 0,  p3: 45.6, p50: 49.1, p97: 52.9 },
  { week: 4,  p3: 49.7, p50: 53.3, p97: 56.9 },
  { week: 8,  p3: 52.7, p50: 56.4, p97: 60.3 },
  { week: 12, p3: 55.2, p50: 59.0, p97: 63.1 },
  { week: 16, p3: 57.3, p50: 61.2, p97: 65.4 },
  { week: 20, p3: 59.1, p50: 63.1, p97: 67.3 },
  { week: 24, p3: 60.7, p50: 64.8, p97: 69.1 },
  { week: 28, p3: 62.1, p50: 66.3, p97: 70.7 },
  { week: 32, p3: 63.5, p50: 67.8, p97: 72.2 },
  { week: 36, p3: 64.8, p50: 69.3, p97: 73.8 },
  { week: 40, p3: 66.0, p50: 70.6, p97: 75.2 },
  { week: 44, p3: 67.2, p50: 71.9, p97: 76.6 },
  { week: 48, p3: 68.4, p50: 73.2, p97: 77.9 },
  { week: 52, p3: 69.5, p50: 74.3, p97: 79.2 },
];

const lengthBoy: PercentilePoint[] = [
  { week: 0,  p3: 46.3, p50: 49.9, p97: 53.4 },
  { week: 4,  p3: 50.4, p50: 54.2, p97: 57.9 },
  { week: 8,  p3: 53.4, p50: 57.4, p97: 61.3 },
  { week: 12, p3: 56.0, p50: 60.0, p97: 64.1 },
  { week: 16, p3: 58.3, p50: 62.4, p97: 66.5 },
  { week: 20, p3: 60.2, p50: 64.4, p97: 68.5 },
  { week: 24, p3: 61.7, p50: 65.9, p97: 70.1 },
  { week: 28, p3: 63.2, p50: 67.6, p97: 71.9 },
  { week: 32, p3: 64.6, p50: 69.0, p97: 73.4 },
  { week: 36, p3: 66.0, p50: 70.4, p97: 74.9 },
  { week: 40, p3: 67.3, p50: 71.8, p97: 76.4 },
  { week: 44, p3: 68.5, p50: 73.1, p97: 77.8 },
  { week: 48, p3: 69.7, p50: 74.4, p97: 79.1 },
  { week: 52, p3: 70.8, p50: 75.6, p97: 80.4 },
];

// ── Head circumference (cm) ───────────────────────────────────────────────────
const headGirl: PercentilePoint[] = [
  { week: 0,  p3: 31.7, p50: 33.9, p97: 36.1 },
  { week: 4,  p3: 34.3, p50: 36.6, p97: 39.0 },
  { week: 8,  p3: 35.9, p50: 38.2, p97: 40.7 },
  { week: 12, p3: 37.2, p50: 39.5, p97: 42.1 },
  { week: 16, p3: 38.2, p50: 40.5, p97: 43.1 },
  { week: 20, p3: 39.0, p50: 41.4, p97: 43.9 },
  { week: 24, p3: 39.7, p50: 42.1, p97: 44.7 },
  { week: 28, p3: 40.3, p50: 42.7, p97: 45.3 },
  { week: 32, p3: 40.8, p50: 43.3, p97: 45.9 },
  { week: 36, p3: 41.3, p50: 43.8, p97: 46.4 },
  { week: 40, p3: 41.7, p50: 44.2, p97: 46.9 },
  { week: 44, p3: 42.1, p50: 44.6, p97: 47.2 },
  { week: 48, p3: 42.4, p50: 45.0, p97: 47.6 },
  { week: 52, p3: 42.7, p50: 45.3, p97: 47.9 },
];

const headBoy: PercentilePoint[] = [
  { week: 0,  p3: 31.9, p50: 34.5, p97: 37.0 },
  { week: 4,  p3: 34.7, p50: 37.2, p97: 39.7 },
  { week: 8,  p3: 36.4, p50: 38.9, p97: 41.5 },
  { week: 12, p3: 37.8, p50: 40.4, p97: 43.0 },
  { week: 16, p3: 38.9, p50: 41.5, p97: 44.1 },
  { week: 20, p3: 39.9, p50: 42.5, p97: 45.1 },
  { week: 24, p3: 40.6, p50: 43.3, p97: 45.9 },
  { week: 28, p3: 41.3, p50: 44.0, p97: 46.6 },
  { week: 32, p3: 41.9, p50: 44.6, p97: 47.2 },
  { week: 36, p3: 42.4, p50: 45.1, p97: 47.8 },
  { week: 40, p3: 42.9, p50: 45.6, p97: 48.3 },
  { week: 44, p3: 43.3, p50: 46.0, p97: 48.7 },
  { week: 48, p3: 43.7, p50: 46.5, p97: 49.2 },
  { week: 52, p3: 44.1, p50: 46.8, p97: 49.5 },
];

export const whoData: Record<Gender, Record<GrowthMetric, PercentilePoint[]>> = {
  girl: { weight: weightGirl, length: lengthGirl, head: headGirl },
  boy:  { weight: weightBoy,  length: lengthBoy,  head: headBoy  },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function getPercentileAt(
  metric: GrowthMetric,
  week: number,
  gender: Gender = 'girl',
): { p3: number; p50: number; p97: number } {
  const data = whoData[gender][metric];
  const clampedWeek = Math.max(0, Math.min(52, week));

  const hiIdx = data.findIndex(d => d.week >= clampedWeek);
  if (hiIdx === 0) return { p3: data[0].p3, p50: data[0].p50, p97: data[0].p97 };
  if (hiIdx === -1) {
    const last = data[data.length - 1];
    return { p3: last.p3, p50: last.p50, p97: last.p97 };
  }
  const lo = data[hiIdx - 1];
  const hi = data[hiIdx];
  const t = (clampedWeek - lo.week) / (hi.week - lo.week);
  return {
    p3:  lerp(lo.p3,  hi.p3,  t),
    p50: lerp(lo.p50, hi.p50, t),
    p97: lerp(lo.p97, hi.p97, t),
  };
}

export const metricConfig: Record<GrowthMetric, { label: string; unit: string; step: string }> = {
  weight: { label: 'Weight', unit: 'kg', step: '0.01' },
  length: { label: 'Length', unit: 'cm', step: '0.1'  },
  head:   { label: 'Head',   unit: 'cm', step: '0.1'  },
};
