import { NavLink } from 'react-router-dom';
import { Home, Star, Sparkles, TrendingUp, Settings } from 'lucide-react';

const tabs = [
  { path: '/today',      icon: Home,       label: 'Today'      },
  { path: '/insights',   icon: Sparkles,   label: 'Insights'   },
  { path: '/milestones', icon: Star,       label: 'Milestones' },
  { path: '/growth',     icon: TrendingUp, label: 'Growth'     },
  { path: '/settings',   icon: Settings,   label: 'Settings'   },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-peachLight flex z-50">
      {tabs.map(({ path, icon: Icon, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center py-3 gap-0.5 text-xs font-semibold transition-colors ${
              isActive ? 'text-peachDark' : 'text-textMuted'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
