import { useEffect } from 'react';
import { Baby, Lightbulb } from 'lucide-react';
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
      <div className="flex items-center justify-between px-4 pt-6 pb-2">
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

      {/* Daily insights */}
      <div className="mt-4">
        <InsightCardCarousel week={selectedWeek} data={weekData} />
      </div>

      {/* What to expect */}
      <WhatToExpectSection week={selectedWeek} data={weekData} />

      {/* Care guide */}
      <CareTipsSection tips={careTips} soothingLabel={soothingLabel} parentTip={weekData.parentTip} />

      {/* Did you know */}
      {weekData.funFact && (
        <div className="px-4 pt-2 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} strokeWidth={2} className="text-amber-500" />
            <p className="text-base font-extrabold text-app-text">Did you know?</p>
          </div>
          <p className="text-sm text-textMuted leading-relaxed">{weekData.funFact}</p>
        </div>
      )}
    </div>
  );
}
