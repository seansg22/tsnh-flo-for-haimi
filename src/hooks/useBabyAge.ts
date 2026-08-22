import { differenceInDays, differenceInWeeks, differenceInYears, addYears, parseISO } from 'date-fns';

export interface BabyAge {
  weeks: number;
  days: number;
  totalDays: number;
  years: number;
  remainingWeeks: number;
  currentWeek: number;
}

export function useBabyAge(birthDate: string | null): BabyAge {
  if (!birthDate) return { weeks: 0, days: 0, totalDays: 0, years: 0, remainingWeeks: 0, currentWeek: 0 };

  const birth = parseISO(birthDate);
  const today = new Date();
  const totalDays = Math.max(0, differenceInDays(today, birth));
  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;
  const years = Math.max(0, differenceInYears(today, birth));
  const remainingWeeks = differenceInWeeks(today, addYears(birth, years));
  const currentWeek = Math.min(weeks, 156);

  return { weeks, days, totalDays, years, remainingWeeks, currentWeek };
}
