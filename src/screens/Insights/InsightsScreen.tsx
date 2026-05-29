import { useState } from 'react';
import { ChevronLeft, ChevronRight, Dumbbell, Brain, Heart, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getWeekData, definedWeeks } from '../../data/weeklyDevelopment';
import { useBabyAge } from '../../hooks/useBabyAge';

type Category = 'motor' | 'cognitive' | 'social' | 'sensory';

const categoryConfig: { key: Category; label: string; Icon: React.FC<{ size?: number; strokeWidth?: number }>; color: string }[] = [
  { key: 'motor',     label: 'Motor',     Icon: Dumbbell, color: 'bg-orange-100 text-orange-600' },
  { key: 'cognitive', label: 'Cognitive', Icon: Brain,    color: 'bg-blue-100 text-blue-600'     },
  { key: 'social',    label: 'Social',    Icon: Heart,    color: 'bg-pink-100 text-pink-600'     },
  { key: 'sensory',   label: 'Sensory',   Icon: Eye,      color: 'bg-purple-100 text-purple-600' },
];

function formatWeekLabel(week: number): string {
  if (week <= 52) return `Week ${week}`;
  const months = Math.round(week * 7 / 30.44);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (mos === 0) return `${yrs} year${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr ${mos} mo`;
}

export function InsightsScreen() {
  const { state, dispatch } = useApp();
  const { currentWeek } = useBabyAge(state.babyProfile?.birthDate ?? null);
  const [activeCategory, setActiveCategory] = useState<Category>('motor');

  const selectedWeek = state.selectedWeek;
  const data = getWeekData(selectedWeek);

  function changeWeek(delta: number) {
    const currentIdx = definedWeeks.findIndex(w => w >= selectedWeek);
    const effectiveIdx = definedWeeks[currentIdx] === selectedWeek ? currentIdx : Math.max(0, currentIdx - 1);
    const nextIdx = Math.max(0, Math.min(definedWeeks.length - 1, effectiveIdx + delta));
    dispatch({ type: 'SET_SELECTED_WEEK', payload: definedWeeks[nextIdx] });
  }

  const items = data[activeCategory];
  const activeCat = categoryConfig.find(c => c.key === activeCategory)!;

  return (
    <div className="fade-in">
      <div className="px-4 pt-10 pb-4">
        <h1 className="text-2xl font-extrabold text-app-text">Insights</h1>

        {/* Week selector */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => changeWeek(-1)}
            disabled={selectedWeek <= definedWeeks[0]}
            className="w-9 h-9 rounded-full bg-peachLight text-peachDark disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <div className="flex-1 text-center">
            <p className="font-extrabold text-app-text">{formatWeekLabel(selectedWeek)}</p>
            <button
              onClick={() => selectedWeek !== currentWeek && dispatch({ type: 'SET_SELECTED_WEEK', payload: currentWeek })}
              className={`text-xs font-semibold ${selectedWeek === currentWeek ? 'text-peachDark cursor-default' : 'text-textMuted underline underline-offset-2'}`}
            >
              {selectedWeek === currentWeek ? 'Current week' : 'Browsing · back to now'}
            </button>
          </div>
          <button
            onClick={() => changeWeek(1)}
            disabled={selectedWeek >= definedWeeks[definedWeeks.length - 1]}
            className="w-9 h-9 rounded-full bg-peachLight text-peachDark disabled:opacity-30 flex items-center justify-center"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mx-4 bg-peachLight rounded-2xl p-4 mb-4">
        <p className="font-bold text-app-text text-sm mb-1">{data.title}</p>
        <p className="text-textMuted text-xs leading-relaxed">{data.summary}</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
        {categoryConfig.map(({ key, label, Icon, color }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === key ? color : 'bg-warm text-textMuted'
            }`}
          >
            <Icon size={14} strokeWidth={2} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Detail cards */}
      <div className="px-4 space-y-3 pb-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 items-start bg-white rounded-xl p-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-peach mt-2 flex-shrink-0" />
            <p className="text-sm text-app-text font-medium leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
