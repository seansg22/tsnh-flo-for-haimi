import type { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-cream">
      <div className="pb-20">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
