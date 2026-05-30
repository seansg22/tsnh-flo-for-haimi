import { lazy, Suspense, useEffect } from 'react';
import { AppProvider } from './context/AppContext.tsx';
import { useApp } from './context/appStateContext';
import { AppShell } from './components/layout/AppShell';
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen';
import { TodayScreen } from './screens/Today/TodayScreen';
import { MilestonesScreen } from './screens/Milestones/MilestonesScreen';
import { InsightsScreen } from './screens/Insights/InsightsScreen';
import { SettingsScreen } from './screens/Settings/SettingsScreen';
import { GrowthScreen } from './screens/Growth/GrowthScreen';

const BookScreen = lazy(() =>
  import('./screens/Book/BookScreen').then((module) => ({ default: module.BookScreen })),
);

function AppContent() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (!state.babyProfile && state.currentPage !== 'onboarding') {
      dispatch({ type: 'SET_PAGE', payload: 'onboarding' });
    }
  }, [dispatch, state.babyProfile, state.currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.currentPage]);

  if (!state.babyProfile || state.currentPage === 'onboarding') {
    return <OnboardingScreen />;
  }

  if (state.currentPage === 'book') {
    return (
      <Suspense
        fallback={
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-cream text-sm font-extrabold text-textMuted">
            Loading book...
          </div>
        }
      >
        <BookScreen />
      </Suspense>
    );
  }

  const pages: Record<string, React.ReactNode> = {
    today: <TodayScreen />,
    milestones: <MilestonesScreen />,
    insights: <InsightsScreen />,
    growth: <GrowthScreen />,
    settings: <SettingsScreen />,
  };

  return (
    <AppShell>
      {pages[state.currentPage] ?? <TodayScreen />}
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
