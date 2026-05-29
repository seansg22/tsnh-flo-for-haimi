import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function AppShell() {
  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-cream">
      <div className="pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
