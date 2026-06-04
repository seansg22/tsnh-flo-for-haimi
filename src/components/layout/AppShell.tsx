import { useState, type ReactNode } from 'react';
import { BookOpenText, Wand2, Sparkles } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useApp } from '../../context/appStateContext';

export function AppShell({ children }: { children: ReactNode }) {
  const { state, dispatch } = useApp();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-cream overflow-x-clip">
      <div style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        {children}
      </div>
      <BottomNav />
      {state.currentPage !== 'settings' && (
        <>
          {/* Backdrop */}
          {expanded && (
            <div
              className="fixed inset-0 z-30"
              onClick={() => setExpanded(false)}
            />
          )}
          <div className="fixed bottom-40 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 pointer-events-none">
            {/* Sub-button 1: Go to Book */}
            <div
              className="absolute right-4 flex items-center gap-1.5 transition-all duration-200"
              style={{
                transform: expanded ? 'translateY(-112px) scale(1)' : 'translateY(0) scale(0)',
                opacity: expanded ? 1 : 0,
                pointerEvents: expanded ? 'auto' : 'none',
              }}
            >
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-app-text shadow-sm">
                Baby Guide
              </span>
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  dispatch({ type: 'SET_PAGE', payload: 'book' });
                }}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-sky-400 text-white shadow-md pointer-events-auto"
                aria-label="Open baby guide"
              >
                <BookOpenText size={20} strokeWidth={2.2} />
              </button>
            </div>

            {/* Sub-button 2: AI Chat */}
            <div
              className="absolute right-4 flex items-center gap-1.5 transition-all duration-200"
              style={{
                transform: expanded ? 'translateY(-56px) scale(1)' : 'translateY(0) scale(0)',
                opacity: expanded ? 1 : 0,
                pointerEvents: expanded ? 'auto' : 'none',
              }}
            >
              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-app-text shadow-sm">
                Ask AI
              </span>
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  dispatch({ type: 'SET_PAGE', payload: 'ai' });
                }}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-violet-400 text-white shadow-md pointer-events-auto"
                aria-label="Ask AI"
              >
                <Sparkles size={20} strokeWidth={2.2} />
              </button>
            </div>

            {/* Main FAB */}
            <button
              type="button"
              onClick={() => setExpanded(prev => !prev)}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/80 bg-peach text-white shadow-lg transition-transform active:scale-95 pointer-events-auto"
              aria-label="Open actions"
            >
              <div
                className="transition-transform duration-200"
                style={{ transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                <Wand2 size={22} strokeWidth={2.2} />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
