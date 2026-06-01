import type { ReactNode } from 'react';
import { BookOpenText } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useApp } from '../../context/appStateContext';

export function AppShell({ children }: { children: ReactNode }) {
  const { state, dispatch } = useApp();

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-cream overflow-x-hidden">
      <div style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        {children}
      </div>
      <BottomNav />
      {state.currentPage !== 'settings' && (
        <div className="fixed bottom-40 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 pointer-events-none">
          <button
            type="button"
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'book' })}
            className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-peach text-white shadow-lg transition-transform active:scale-95 pointer-events-auto"
            aria-label="Open baby guide"
          >
            <BookOpenText size={22} strokeWidth={2.2} />
          </button>
        </div>
      )}
    </div>
  );
}
