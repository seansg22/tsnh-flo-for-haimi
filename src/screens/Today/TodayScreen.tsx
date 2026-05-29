import { useEffect } from 'react';
import { Baby } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBabyAge } from '../../hooks/useBabyAge';
import { getWeekData } from '../../data/weeklyDevelopment';
import { getCareTips, getSoothingLabel } from '../../data/careTips';
import { WeekStrip } from '../../components/today/WeekStrip';
import { BabyIllustration } from '../../components/today/BabyIllustration';
import { AgeDisplay } from '../../components/today/AgeDisplay';
import { InsightCardCarousel } from '../../components/today/InsightCardCarousel';
import { WhatToExpectSection } from '../../components/today/WhatToExpectSection';
import { CareTipsSection } from '../../components/today/CareTipsSection';

export function TodayScreen() {
  const { state, dispatch } = useApp();
  const { weeks, days, years, remainingMonths, totalMonths, currentWeek } = useBabyAge(state.babyProfile?.birthDate ?? null);
  const selectedWeek = state.selectedWeek;
  const weekData = getWeekData(selectedWeek);
  const careTips = getCareTips(selectedWeek);
  const soothingLabel = getSoothingLabel(selectedWeek);

  useEffect(() => {
    dispatch({ type: 'SET_SELECTED_WEEK', payload: currentWeek });
  }, [currentWeek, dispatch]);

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-10 pb-2">
        <div>
          <p className="text-xs text-textMuted font-semibold uppercase tracking-wider">Baby Day</p>
          <h1 className="text-xl font-extrabold text-app-text">{state.babyProfile?.name}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-peachLight flex items-center justify-center text-peachDark">
          <Baby size={22} strokeWidth={1.8} />
        </div>
      </div>

      {/* Week strip */}
      <WeekStrip
        currentWeek={currentWeek}
        selectedWeek={selectedWeek}
        onSelectWeek={week => dispatch({ type: 'SET_SELECTED_WEEK', payload: week })}
      />

      {/* Baby illustration */}
      <BabyIllustration week={selectedWeek} />

      {/* Age display */}
      <AgeDisplay name={state.babyProfile?.name ?? ''} weeks={weeks} days={days} years={years} remainingMonths={remainingMonths} totalMonths={totalMonths} selectedWeek={selectedWeek} currentWeek={currentWeek} />

      {/* Insight cards */}
      <div className="mt-4">
        <InsightCardCarousel week={selectedWeek} data={weekData} />
      </div>

      {/* What to expect */}
      <WhatToExpectSection week={selectedWeek} data={weekData} />

      {/* Care guide */}
      <CareTipsSection tips={careTips} soothingLabel={soothingLabel} />
    </div>
  );
}
