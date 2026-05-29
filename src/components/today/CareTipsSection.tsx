import { useState } from 'react';
import { Milk, Moon, HandHeart, ShieldCheck, Heart } from 'lucide-react';
import type { CareTips } from '../../types';

type Tab = 'feeding' | 'sleep' | 'soothing' | 'health';

interface CareTipsSectionProps {
  tips: CareTips;
  soothingLabel: string;
  parentTip?: string;
}

const tabConfig: {
  key: Tab;
  label: (s: string) => string;
  Icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
  color: string;
  activeBg: string;
}[] = [
  { key: 'feeding',  label: () => 'Feeding',  Icon: Milk,        color: 'text-blue-400',   activeBg: 'bg-blue-50 border-blue-200'     },
  { key: 'sleep',    label: () => 'Sleep',     Icon: Moon,        color: 'text-indigo-400', activeBg: 'bg-indigo-50 border-indigo-200' },
  { key: 'soothing', label: (s) => s,          Icon: HandHeart,   color: 'text-peachDark',  activeBg: 'bg-peachLight border-peachLight'},
  { key: 'health',   label: () => 'Health',    Icon: ShieldCheck, color: 'text-green-500',  activeBg: 'bg-green-50 border-green-200'   },
];

export function CareTipsSection({ tips, soothingLabel, parentTip }: CareTipsSectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('feeding');

  const active = tabConfig.find(t => t.key === activeTab)!;
  const items = tips[activeTab];

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center gap-2">
        <Heart size={16} strokeWidth={2} className="text-peachDark" />
        <p className="text-base font-extrabold text-app-text">Care guide</p>
      </div>

      <div className="mt-4">
        {/* Tab pills — 2×2 grid for 4 tabs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {tabConfig.map(({ key, label, Icon, color, activeBg }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                activeTab === key
                  ? `${activeBg} border-opacity-100`
                  : 'bg-warm border-transparent text-textMuted'
              }`}
            >
              <Icon size={14} strokeWidth={2} className={activeTab === key ? color : 'text-textMuted'} />
              <span className={activeTab === key ? 'text-app-text' : ''}>{label(soothingLabel)}</span>
            </button>
          ))}
        </div>

        {/* Tips list */}
        <div className="space-y-2">
          {items.map((tip, i) => (
            <div key={i} className="flex gap-3 items-start bg-white rounded-xl p-3 shadow-sm">
              <active.Icon size={16} strokeWidth={1.8} className={`${active.color} flex-shrink-0 mt-0.5`} />
              <p className="text-sm text-app-text leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>

        {/* Parent tip */}
        {parentTip && (
          <div className="mt-4 bg-orange-100 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Heart size={13} strokeWidth={2} className="text-peachDark" />
              <p className="text-xs font-bold uppercase tracking-wide text-peachDark">Tip</p>
            </div>
            <p className="text-sm text-app-text leading-relaxed">{parentTip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
