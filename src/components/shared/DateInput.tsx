/**
 * DateInput — custom date picker using three <select> elements.
 * Replaces <input type="date"> to avoid iOS Safari's native widget
 * overflowing its container regardless of CSS constraints.
 *
 * Props:
 *   value   – YYYY-MM-DD string (or empty string)
 *   onChange – called with YYYY-MM-DD whenever any part changes
 *   min     – optional YYYY-MM-DD lower bound
 *   max     – optional YYYY-MM-DD upper bound
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function parseDate(value: string): { year: number; month: number; day: number } | null {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return { year: y, month: m, day: d };
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

interface DateInputProps {
  value: string;
  onChange: (v: string) => void;
  min?: string;
  max?: string;
}

const selectClass =
  'flex-1 min-w-0 rounded-xl border-2 border-peachLight bg-cream text-app-text text-sm font-semibold ' +
  'px-2 py-3 outline-none transition-colors focus:border-peach appearance-none text-center';

export function DateInput({ value, onChange, min, max }: DateInputProps) {
  const parsed = parseDate(value);
  const minParsed = parseDate(min ?? '');
  const maxParsed = parseDate(max ?? '');

  const today = new Date();
  const minYear = minParsed?.year ?? today.getFullYear() - 5;
  const maxYear = maxParsed?.year ?? today.getFullYear();

  // Build year options (most recent first so newest babies appear at top)
  const years: number[] = [];
  for (let y = maxYear; y >= minYear; y--) years.push(y);

  const selectedYear = parsed?.year ?? 0;
  const selectedMonth = parsed?.month ?? 0;
  const selectedDay = parsed?.day ?? 0;

  const dayCount = selectedYear && selectedMonth
    ? daysInMonth(selectedYear, selectedMonth)
    : 31;

  function emit(year: number, month: number, day: number) {
    if (!year || !month || !day) return;
    // Clamp day if month/year change makes it invalid
    const maxDay = daysInMonth(year, month);
    onChange(formatDate(year, month, Math.min(day, maxDay)));
  }

  return (
    <div className="flex gap-2 w-full">
      {/* Month */}
      <select
        value={selectedMonth || ''}
        onChange={e => emit(selectedYear, Number(e.target.value), selectedDay)}
        className={selectClass}
        style={{ WebkitAppearance: 'none' }}
      >
        <option value="" disabled>Month</option>
        {MONTHS.map((name, i) => (
          <option key={name} value={i + 1}>{name}</option>
        ))}
      </select>

      {/* Day */}
      <select
        value={selectedDay || ''}
        onChange={e => emit(selectedYear, selectedMonth, Number(e.target.value))}
        className={`${selectClass} max-w-[72px]`}
        style={{ WebkitAppearance: 'none' }}
      >
        <option value="" disabled>Day</option>
        {Array.from({ length: dayCount }, (_, i) => i + 1).map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* Year */}
      <select
        value={selectedYear || ''}
        onChange={e => emit(Number(e.target.value), selectedMonth, selectedDay)}
        className={`${selectClass} max-w-[90px]`}
        style={{ WebkitAppearance: 'none' }}
      >
        <option value="" disabled>Year</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
