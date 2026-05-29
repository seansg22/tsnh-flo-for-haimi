import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen';
import { TodayScreen } from './screens/Today/TodayScreen';
import { MilestonesScreen } from './screens/Milestones/MilestonesScreen';
import { InsightsScreen } from './screens/Insights/InsightsScreen';
import { SettingsScreen } from './screens/Settings/SettingsScreen';
import { GrowthScreen } from './screens/Growth/GrowthScreen';

function AppContent() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    if (!state.babyProfile && state.currentPage !== 'onboarding') {
      dispatch({ type: 'SET_PAGE', payload: 'onboarding' });
    }
  }, [state.babyProfile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state.currentPage]);

  if (!state.babyProfile || state.currentPage === 'onboarding') {
    return <OnboardingScreen />;
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
