import { useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { milestones } from '../../data/weeklyDevelopment';
import { useApp } from '../../context/appStateContext';
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
  const [search, setSearch] = useState('');
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleFilterChange(cat: CategoryFilter) {
    setFilter(cat);
    if (contentRef.current) {
      const top = contentRef.current.getBoundingClientRect().top + window.scrollY;
      const offset = stickyRef.current?.offsetHeight ?? 0;
      window.scrollTo({ top: top - offset, behavior: 'smooth' });
    }
  }

  const categories: CategoryFilter[] = ['all', 'motor', 'cognitive', 'social', 'sensory', 'vaccination'];
  const query = search.trim().toLowerCase();
  const filtered = milestones
    .filter(m => filter === 'all' || m.category === filter)
    .filter(m => !query || m.label.toLowerCase().includes(query) || m.description?.toLowerCase().includes(query));
  const achieved = new Set(state.achievedMilestones);
  const achievedCount = milestones.filter(m => achieved.has(m.id)).length;

  return (
    <div className="fade-in">
      <div className="px-4 pt-6">
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

      {/* Search + Category filter — sticky */}
      <div ref={stickyRef} className="sticky top-0 z-10 bg-cream px-4 pb-3 pt-3">
        <div className="flex items-center gap-2 bg-warm rounded-xl px-3 py-2">
          <Search size={16} className="text-textMuted flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search milestones…"
            className="flex-1 bg-transparent text-sm text-app-text placeholder:text-textMuted outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-textMuted text-xs font-bold">✕</button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                filter === cat ? 'bg-peach text-white' : 'bg-warm text-textMuted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Milestone groups */}
      <div ref={contentRef} className="px-4 space-y-6 pb-6">
        {filtered.length === 0 && (
          <p className="text-center text-textMuted text-sm py-8">No milestones found</p>
        )}
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
