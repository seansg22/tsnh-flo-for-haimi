export interface BabyProfile {
  name: string;
  birthDate: string; // ISO "YYYY-MM-DD"
  gender: 'girl' | 'boy';
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SleepNorm {
  totalHoursRange: string;
  nightSleepHours: string;
  naps: string;
}

export interface FeedingNorm {
  method: string;
  frequency: string;
  notes: string;
}

export interface WeekData {
  week: number;
  title: string;
  summary: string;
  motor: string[];
  cognitive: string[];
  social: string[];
  sensory: string[];
  activities: Activity[];
  sleep: SleepNorm;
  feeding: FeedingNorm;
  comingUpMilestone: string;
  funFact?: string;
  parentTip?: string;
}

export interface CareTips {
  feeding: string[];
  sleep: string[];
  soothing: string[];   // "Settling" for toddlers, "Wellbeing" for 2y+
  health: string[];
}

export interface Milestone {
  id: string;
  weekRange: [number, number];
  label: string;
  category: 'motor' | 'cognitive' | 'social' | 'sensory' | 'vaccination';
  description?: string;
}

export interface GrowthEntry {
  id: string;
  date: string;    // "YYYY-MM-DD"
  weight?: number; // kg
  length?: number; // cm
  head?: number;   // cm
}

export type Page = 'onboarding' | 'today' | 'milestones' | 'insights' | 'growth' | 'settings' | 'book';

export interface AppState {
  babyProfile: BabyProfile | null;
  achievedMilestones: string[];
  selectedWeek: number;
  growthEntries: GrowthEntry[];
  currentPage: Page;
}

export type AppAction =
  | { type: 'SET_BABY_PROFILE'; payload: BabyProfile }
  | { type: 'TOGGLE_MILESTONE'; payload: string }
  | { type: 'SET_SELECTED_WEEK'; payload: number }
  | { type: 'ADD_GROWTH_ENTRY'; payload: GrowthEntry }
  | { type: 'DELETE_GROWTH_ENTRY'; payload: string }
  | { type: 'SET_PAGE'; payload: Page };
