import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// ponytail: module var resets on F5, survives in-app navigation
let sessionShown = false;

interface OverdueBannerProps {
  count: number;
  babyName: string;
  onNavigate: () => void;
}

export function OverdueBanner({ count, babyName, onNavigate }: OverdueBannerProps) {
  const [dismissed, setDismissed] = useState(sessionShown);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed || count === 0) return;
    const t = setTimeout(() => {
      sessionShown = true;
      setVisible(true);
    }, 1500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dismissed || count === 0) return null;

  function dismiss() {
    setVisible(false);
    setTimeout(() => setDismissed(true), 250);
  }

  return (
    <div
      className="absolute top-4 left-4 right-4 z-40 rounded-2xl bg-amber-50/95 backdrop-blur-sm border border-orange-200 shadow-lg p-3 transition-all duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-12px)',
      }}
    >
      <div className="flex items-center gap-2">
        <p className="flex-1 text-sm font-semibold text-orange-700">
          Bet {babyName} has been busy!
          <div>{count} milestone{count > 1 ? 's' : ''} to tick off</div>
        </p>
        <button
          onClick={onNavigate}
          className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-100 hover:bg-orange-200 transition-colors px-2.5 py-1.5 rounded-xl flex-shrink-0"
        >
          View
        </button>
        <button onClick={dismiss} className="text-orange-300 hover:text-orange-400 transition-colors flex-shrink-0">
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
