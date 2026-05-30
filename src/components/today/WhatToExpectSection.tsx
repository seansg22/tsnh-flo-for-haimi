import { Moon, Milk, Zap, CirclePlay, Star } from 'lucide-react';
import type { WeekData } from '../../types';

interface WhatToExpectSectionProps {
  week: number;
  data: WeekData;
}

export function WhatToExpectSection({ week, data }: WhatToExpectSectionProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2">
        <Star size={16} strokeWidth={2} className="text-peachDark" />
        <p className="text-base font-extrabold text-app-text">What to expect at week {week}</p>
      </div>

      <div className="mt-4 space-y-4">
          <p className="text-sm text-textMuted leading-relaxed">{data.summary}</p>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Moon size={16} strokeWidth={2} className="text-indigo-400" />
              <p className="font-bold text-app-text">Sleep</p>
            </div>
            <div className="text-sm text-textMuted space-y-1">
              <p>Total: <span className="text-app-text font-semibold">{data.sleep.totalHoursRange} hours/day</span></p>
              <p>Longest overnight stretch: <span className="text-app-text font-semibold">{data.sleep.nightSleepHours}</span></p>
              <p>Daytime naps: <span className="text-app-text font-semibold">{data.sleep.naps}</span></p>
              <p className="italic">Ranges are typical for this age. Short wakes and day-to-day variation are normal.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Milk size={16} strokeWidth={2} className="text-blue-400" />
              <p className="font-bold text-app-text">Feeding</p>
            </div>
            <div className="text-sm text-textMuted space-y-1">
              <p>Method: <span className="text-app-text font-semibold">{data.feeding.method}</span></p>
              <p>Frequency: <span className="text-app-text font-semibold">{data.feeding.frequency}</span></p>
              <p className="italic">{data.feeding.notes}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} strokeWidth={2} className="text-peach" />
              <p className="font-bold text-app-text">Activities</p>
            </div>
            <div className="space-y-3">
              {data.activities.map(a => (
                <div key={a.id} className="flex gap-3 items-start">
                  <CirclePlay size={22} strokeWidth={1.5} className="text-peachDark flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-app-text text-sm">{a.title}</p>
                    <p className="text-textMuted text-xs leading-relaxed">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
