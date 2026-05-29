import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { OnboardingScreen } from './screens/Onboarding/OnboardingScreen';
import { TodayScreen } from './screens/Today/TodayScreen';
import { MilestonesScreen } from './screens/Milestones/MilestonesScreen';
import { InsightsScreen } from './screens/Insights/InsightsScreen';
import { SettingsScreen } from './screens/Settings/SettingsScreen';
import { GrowthScreen } from './screens/Growth/GrowthScreen';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { state } = useApp();
  if (!state.babyProfile) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { state } = useApp();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={state.babyProfile ? '/today' : '/onboarding'} replace />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />
      <Route
        element={
          <AuthGuard>
            <AppShell />
          </AuthGuard>
        }
      >
        <Route path="/today" element={<TodayScreen />} />
        <Route path="/milestones" element={<MilestonesScreen />} />
        <Route path="/insights" element={<InsightsScreen />} />
        <Route path="/growth" element={<GrowthScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
