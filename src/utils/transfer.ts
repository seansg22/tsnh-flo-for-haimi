import { compressToBase64, decompressFromBase64 } from 'lz-string';
import { milestones } from '../data/weeklyDevelopment';
import type { GrowthEntry } from '../types';

const validMilestoneIds = new Set(milestones.map(m => m.id));

interface Payload {
  v: number;
  m: string[];
  g: Array<{ i: string; d: string; w?: number; l?: number; h?: number }>;
}

export function encodeTransfer(achievedMilestones: string[], growthEntries: GrowthEntry[]): string {
  const payload: Payload = {
    v: 1,
    m: achievedMilestones.filter(id => validMilestoneIds.has(id)),
    g: growthEntries.map(({ id, date, weight, length, head }) => ({
      i: id, d: date,
      ...(weight !== undefined && { w: weight }),
      ...(length !== undefined && { l: length }),
      ...(head !== undefined && { h: head }),
    })),
  };
  return compressToBase64(JSON.stringify(payload));
}

export function decodeTransfer(code: string): { achievedMilestones: string[]; growthEntries: GrowthEntry[] } {
  const json = decompressFromBase64(code.trim());
  if (!json) throw new Error('Invalid code');
  const payload = JSON.parse(json) as Payload;
  if (payload.v !== 1) throw new Error('Unsupported version');
  return {
    achievedMilestones: payload.m.filter(id => validMilestoneIds.has(id)),
    growthEntries: payload.g.map(e => ({
      id: e.i, date: e.d,
      ...(e.w !== undefined && { weight: e.w }),
      ...(e.l !== undefined && { length: e.l }),
      ...(e.h !== undefined && { head: e.h }),
    })),
  };
}
