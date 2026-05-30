import { Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/appStateContext';
import type { WeekData } from '../../types';
import { InsightCard } from './InsightCard';

interface InsightCardCarouselProps {
  week: number;
  data: WeekData;
}

export function InsightCardCarousel({ data }: InsightCardCarouselProps) {
  const { dispatch } = useApp();
  return (
    <div>
      <div className="px-4 flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} strokeWidth={2} className="text-peachDark" />
          <p className="text-base font-extrabold text-app-text">Daily Insights</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'insights' })}
          className="flex items-center gap-0.5 text-xs font-semibold text-peachDark"
        >
          See all <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 pb-2">
        <InsightCard variant="motor"     data={data} />
        <InsightCard variant="cognitive" data={data} />
        <InsightCard variant="social"    data={data} />
        <InsightCard variant="sensory"   data={data} />
      </div>
    </div>
  );
}
