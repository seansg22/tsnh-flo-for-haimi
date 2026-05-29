import { differenceInDays } from 'date-fns';

export interface BabyAge {
  weeks: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  years: number;
  remainingMonths: number;
  currentWeek: number;
}

export function useBabyAge(birthDate: string | null): BabyAge {
  if (!birthDate) return { weeks: 0, days: 0, totalDays: 0, totalMonths: 0, years: 0, remainingMonths: 0, currentWeek: 0 };

  const birth = new Date(birthDate);
  const today = new Date();
  const totalDays = Math.max(0, differenceInDays(today, birth));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  const totalMonths = Math.floor(totalDays / 30.44);
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  const currentWeek = Math.min(weeks, 156);

  return { weeks, days, totalDays, totalMonths, years, remainingMonths, currentWeek };
}
