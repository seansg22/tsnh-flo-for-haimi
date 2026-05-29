import { Home, Star, Sparkles, TrendingUp, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Page } from '../../types';

const tabs: { page: Page; icon: React.ElementType; label: string }[] = [
  { page: 'today',      icon: Home,       label: 'Today'      },
  { page: 'insights',   icon: Sparkles,   label: 'Insights'   },
  { page: 'milestones', icon: Star,       label: 'Milestones' },
  { page: 'growth',     icon: TrendingUp, label: 'Growth'     },
  { page: 'settings',   icon: Settings,   label: 'Settings'   },
];

export function BottomNav() {
  const { state, dispatch } = useApp();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-peachLight flex z-50">
      {tabs.map(({ page, icon: Icon, label }) => {
        const isActive = state.currentPage === page;
        return (
          <button
            key={page}
            onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
            className={`flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-semibold transition-colors ${
              isActive ? 'text-peachDark' : 'text-textMuted'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
