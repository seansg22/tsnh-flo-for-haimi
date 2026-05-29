import { Check } from 'lucide-react';
import type { Milestone } from '../../types';


interface MilestoneItemProps {
  milestone: Milestone;
  achieved: boolean;
  onToggle: () => void;
}

export function MilestoneItem({ milestone, achieved, onToggle }: MilestoneItemProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left ${
        achieved ? 'bg-green-50 opacity-80' : 'bg-white'
      }`}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
          achieved ? 'bg-success border-success' : 'border-peachLight'
        }`}
      >
        {achieved && <Check size={14} strokeWidth={3} className="text-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug ${achieved ? 'text-textMuted line-through' : 'text-app-text'}`}>
          {milestone.label}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-textMuted">
            week {milestone.weekRange[0]}–{milestone.weekRange[1]}
          </span>
        </div>
      </div>
    </button>
  );
}
