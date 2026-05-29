interface AgeDisplayProps {
  name: string;
  weeks: number;
  days: number;
  years: number;
  remainingMonths: number;
  totalMonths: number;
  selectedWeek: number;
  currentWeek: number;
}

function formatCurrentAge(weeks: number, days: number, years: number, remainingMonths: number, totalMonths: number): string {
  if (weeks === 0 && days === 0) return 'just born!';
  // Under 3 months — show weeks + days
  if (totalMonths < 3) {
    if (weeks === 0) return `${days} day${days !== 1 ? 's' : ''} old`;
    if (days === 0)  return `${weeks} week${weeks !== 1 ? 's' : ''} old`;
    return `${weeks} week${weeks !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''} old`;
  }
  // 3 months–1 year — show months
  if (years === 0) return `${totalMonths} month${totalMonths !== 1 ? 's' : ''} old`;
  // 1+ year — show years + months
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''} old`;
  return `${years} yr${years !== 1 ? 's' : ''}, ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''} old`;
}

function formatBrowseWeek(week: number): string {
  const months = Math.round(week * 7 / 30.44);
  if (week <= 52) return `Week ${week}`;
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (mos === 0) return `${yrs} year${yrs !== 1 ? 's' : ''}`;
  return `${yrs} yr ${mos} mo`;
}

export function AgeDisplay({ name, weeks, days, years, remainingMonths, totalMonths, selectedWeek, currentWeek }: AgeDisplayProps) {
  const isCurrent = selectedWeek === currentWeek;
  const ageText = isCurrent
    ? formatCurrentAge(weeks, days, years, remainingMonths, totalMonths)
    : formatBrowseWeek(selectedWeek);

  return (
    <div className="text-center px-4 pb-2 mb-8">
      <p className="text-2xl font-extrabold text-peachDark">{ageText}</p>
      <p className="text-textMuted text-sm font-semibold mt-0.5">
        {isCurrent ? `${name}'s journey` : 'Browsing'}
      </p>
    </div>
  );
}
