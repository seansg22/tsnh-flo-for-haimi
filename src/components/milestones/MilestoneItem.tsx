import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { Milestone } from '../../types';

function fmtWeek(w: number): string {
  if (w <= 52) return `Week ${w}`;
  const months = Math.round(w * 7 / 30.44);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  return mos === 0 ? `${yrs}y` : `${yrs}y${mos}m`;
}

function fmtWeekRange(start: number, end: number): string {
  if (start <= 52) return `Week ${start}–${end}`;
  return `${fmtWeek(start)} – ${fmtWeek(end)}`;
}

interface MilestoneItemProps {
  milestone: Milestone;
  achieved: boolean;
  onToggle: () => void;
}

export function MilestoneItem({ milestone, achieved, onToggle }: MilestoneItemProps) {
  const [expanded, setExpanded] = useState(false);
  const hasDescription = !!milestone.description;

  return (
    <div className={`rounded-xl overflow-hidden transition-all ${achieved ? 'bg-green-50 opacity-80' : 'bg-white'}`}>
      <div className="flex items-start gap-3 p-3">
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
            achieved ? 'bg-success border-success' : 'border-peachLight'
          }`}
        >
          {achieved && <Check size={14} strokeWidth={3} className="text-white" />}
        </button>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold leading-snug ${achieved ? 'text-textMuted line-through' : 'text-app-text'}`}>
            {milestone.label}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-textMuted">
              {fmtWeekRange(milestone.weekRange[0], milestone.weekRange[1])}
            </span>
          </div>
        </div>
        {hasDescription && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex-shrink-0 p-1 text-textMuted"
          >
            {expanded ? <ChevronUp size={16} strokeWidth={2} /> : <ChevronDown size={16} strokeWidth={2} />}
          </button>
        )}
      </div>
      {expanded && milestone.description && (
        <div className="px-3 pb-3">
          <p className="text-xs text-textMuted leading-relaxed pl-9">{milestone.description}</p>
        </div>
      )}
    </div>
  );
}
