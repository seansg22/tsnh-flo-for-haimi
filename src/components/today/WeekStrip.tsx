import { useEffect, useRef } from 'react';

interface WeekStripProps {
  currentWeek: number;
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
}

function weekLabel(w: number): string {
  if (w <= 52) return `W${w}`;
  const months = Math.round(w * 7 / 30.44);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (mos === 0) return `${yrs}y`;
  return `${yrs}y${mos}m`;
}

export function WeekStrip({ currentWeek, selectedWeek, onSelectWeek }: WeekStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Drag-to-scroll state
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const isDragging = useRef(false);
  const hasCaptured = useRef(false);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedWeek]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasCaptured.current = false;
    dragDistance.current = 0;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    dragDistance.current = Math.abs(dx);
    // Only capture and scroll once past the drag threshold
    if (dragDistance.current > 6) {
      if (!hasCaptured.current) {
        scrollRef.current.setPointerCapture(e.pointerId);
        hasCaptured.current = true;
      }
      scrollRef.current.scrollLeft = dragScrollLeft.current - dx;
    }
  };

  const onPointerUp = () => {
    isDragging.current = false;
    hasCaptured.current = false;
  };

  const isOffCurrentWeek = selectedWeek !== currentWeek;

  return (
    <div>
      <div className="relative">
        {/* Left fade edge */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-cream to-transparent" />
        {/* Right fade edge */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-cream to-transparent" />

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-scroll no-scrollbar px-4 py-2 cursor-grab active:cursor-grabbing select-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {Array.from({ length: 157 }, (_, i) => (
            <button
              key={i}
              ref={i === selectedWeek ? activeRef : null}
              // Suppress click if the pointer moved — user was dragging, not tapping
              onClick={() => { if (dragDistance.current < 6) onSelectWeek(i); }}
              className={`flex-shrink-0 h-11 rounded-full text-xs font-bold transition-all px-3 min-w-[44px] active:scale-95 active:opacity-80 ${
                i === selectedWeek
                  ? `bg-peach text-white shadow-md scale-110${i < currentWeek ? ' line-through' : ''}`
                  : i === currentWeek
                  ? 'bg-peachLight text-peachDark ring-2 ring-peach'
                  : i < currentWeek
                  ? 'bg-warm/40 text-textMuted/50 line-through'
                  : 'bg-warm text-textMuted'
              }`}
            >
              {weekLabel(i)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-3 -mb-2">
        <button
          onClick={() => onSelectWeek(currentWeek)}
          className={`bg-peach text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md transition-all active:scale-95 ${isOffCurrentWeek ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          ↩ Back to today
        </button>
      </div>
    </div>
  );
}
