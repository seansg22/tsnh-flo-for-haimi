import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, BabyProfile } from '../types';

const initialState: AppState = {
  babyProfile: null,
  achievedMilestones: [],
  selectedWeek: 0,
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_BABY_PROFILE':
      return { ...state, babyProfile: action.payload };
    case 'TOGGLE_MILESTONE':
      return {
        ...state,
        achievedMilestones: state.achievedMilestones.includes(action.payload)
          ? state.achievedMilestones.filter(id => id !== action.payload)
          : [...state.achievedMilestones, action.payload],
      };
    case 'SET_SELECTED_WEEK':
      return { ...state, selectedWeek: action.payload };
    default:
      return state;
  }
}

const defaultProfile: BabyProfile = {
  name: 'Hải Mi',
  birthDate: '2026-04-16',
};

function loadState(): AppState {
  try {
    const profile = localStorage.getItem('baby-day:profile');
    const milestones = localStorage.getItem('baby-day:achieved-milestones');
    return {
      babyProfile: profile ? (JSON.parse(profile) as BabyProfile) : defaultProfile,
      achievedMilestones: milestones ? (JSON.parse(milestones) as string[]) : [],
      selectedWeek: 0,
    };
  } catch {
    return { ...initialState, babyProfile: defaultProfile };
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    if (state.babyProfile) {
      localStorage.setItem('baby-day:profile', JSON.stringify(state.babyProfile));
    }
  }, [state.babyProfile]);

  useEffect(() => {
    localStorage.setItem('baby-day:achieved-milestones', JSON.stringify(state.achievedMilestones));
  }, [state.achievedMilestones]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
