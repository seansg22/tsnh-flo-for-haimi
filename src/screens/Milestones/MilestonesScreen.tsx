import { useState } from 'react';
import { milestones } from '../../data/weeklyDevelopment';
import { useApp } from '../../context/AppContext';
import { MilestoneItem } from '../../components/milestones/MilestoneItem';
import type { Milestone } from '../../types';

const groups = [
  { label: '0–4 weeks',    range: [0,   4]   as [number, number] },
  { label: '1–3 months',   range: [4,   12]  as [number, number] },
  { label: '3–6 months',   range: [12,  24]  as [number, number] },
  { label: '6–9 months',   range: [24,  36]  as [number, number] },
  { label: '9–12 months',  range: [36,  52]  as [number, number] },
  { label: '12–18 months', range: [52,  78]  as [number, number] },
  { label: '18–24 months', range: [78,  104] as [number, number] },
  { label: '2–3 years',    range: [104, 200] as [number, number] },
];

type CategoryFilter = 'all' | Milestone['category'];

export function MilestonesScreen() {
  const { state, dispatch } = useApp();
  const [filter, setFilter] = useState<CategoryFilter>('all');

  const categories: CategoryFilter[] = ['all', 'motor', 'cognitive', 'social', 'sensory'];
  const filtered = filter === 'all' ? milestones : milestones.filter(m => m.category === filter);
  const achieved = new Set(state.achievedMilestones);
  const achievedCount = milestones.filter(m => achieved.has(m.id)).length;

  return (
    <div className="fade-in">
      <div className="px-4 pt-10 pb-4">
        <h1 className="text-2xl font-extrabold text-app-text">Milestones</h1>
        <p className="text-textMuted text-sm font-medium mt-1">
          {achievedCount} of {milestones.length} achieved
        </p>
        <div className="w-full bg-peachLight rounded-full h-2 mt-2">
          <div
            className="bg-peach h-2 rounded-full transition-all"
            style={{ width: `${(achievedCount / milestones.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
              filter === cat ? 'bg-peach text-white' : 'bg-warm text-textMuted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Milestone groups */}
      <div className="px-4 space-y-6 pb-6">
        {groups.map(group => {
          const groupMilestones = filtered.filter(
            m => m.weekRange[0] >= group.range[0] && m.weekRange[0] < group.range[1]
          );
          if (groupMilestones.length === 0) return null;
          return (
            <div key={group.label}>
              <p className="text-xs font-bold text-textMuted uppercase tracking-wider mb-2">{group.label}</p>
              <div className="space-y-2">
                {groupMilestones.map(m => (
                  <MilestoneItem
                    key={m.id}
                    milestone={m}
                    achieved={achieved.has(m.id)}
                    onToggle={() => dispatch({ type: 'TOGGLE_MILESTONE', payload: m.id })}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
