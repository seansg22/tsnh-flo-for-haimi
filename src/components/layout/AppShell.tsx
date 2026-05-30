import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-cream overflow-x-hidden">
      <div style={{ paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))' }}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
