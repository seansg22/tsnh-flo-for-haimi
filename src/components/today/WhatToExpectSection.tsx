import { Moon, Milk, Zap, CirclePlay, Star, ExternalLink } from 'lucide-react';
import type { Activity, WeekData } from '../../types';

interface WhatToExpectSectionProps {
  week: number;
  data: WeekData;
}

const ACTIVITY_SEARCH_TERMS: Record<string, string> = {
  'Talk softly': 'talking to newborn baby',
  'Show your face': 'face to face newborn interaction',
  'Slow dance': 'dancing with baby bonding',
  'Coo back and forth': 'baby cooing communication',
  'Bicycle legs': 'baby bicycle legs gas relief',
  'Outdoor air': 'taking newborn outside',
  'Smile game': 'baby social smile game',
  'Narrate everything': 'talking to baby language development',
  'Coo conversation': 'baby cooing conversation',
  'Window gazing': 'baby visual stimulation',
  'Make them laugh': 'make baby laugh',
  'Name game': 'baby name recognition',
  'Roll practice': 'baby rolling exercises',
  'Sound imitation': 'baby sound imitation',
  'Foot discovery': 'baby discovering feet',
  'Scarf magic': 'baby peekaboo scarf play',
  'Object grab': 'baby reaching grasping activity',
  'Sit practice': 'baby sitting practice',
  'Object hide': 'baby object permanence game',
  'Food exposure': 'baby food exposure before solids',
  'Object in container': 'baby container play',
  'First words game': 'baby first words activities',
  'Walking practice': 'baby walking practice',
  'Board book library': 'reading board books baby',
  'Birthday adventure': 'toddler birthday activity ideas',
  'Baby book': 'baby memory book ideas',
  'Push toy walk': 'toddler push toy walking',
  'Naming walk': 'toddler vocabulary walk',
  'Body part game': 'toddler body parts game',
  'Emotion naming': 'toddler emotion naming',
  'Parallel household tasks': 'toddler helping household chores',
  'Word labeling': 'toddler language labeling',
  'Choice architecture': 'offering choices toddler',
  'Expand their sentences': 'expanding toddler sentences',
  'Answer why with why': 'toddler why questions',
  'Letter exposure': 'letter recognition toddler activities',
  'Name writing': 'preschool name writing activity',
  'Photo journey': 'family photo memory activity toddler',
};

function getActivityAgeContext(week: number): string {
  if (week < 4) return 'newborn baby';
  if (week < 52) return 'baby';
  return 'toddler';
}

function getActivitySearchQuery(activity: Activity, week: number): string {
  const searchTerm = ACTIVITY_SEARCH_TERMS[activity.title] ?? activity.title.toLowerCase();
  const hasAgeContext = /\b(newborn|baby|toddler|preschool|child|children)\b/i.test(searchTerm);
  return hasAgeContext ? searchTerm : `${searchTerm} ${getActivityAgeContext(week)}`;
}

function getActivityYoutubeUrl(activity: Activity, week: number): string {
  const query = getActivitySearchQuery(activity, week);
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

function getActivityInstagramUrl(activity: Activity, week: number): string {
  const query = getActivitySearchQuery(activity, week);
  return `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(query)}`;
}

function getActivityTikTokUrl(activity: Activity, week: number): string {
  const query = getActivitySearchQuery(activity, week);
  return `https://www.tiktok.com/search?q=${encodeURIComponent(query)}`;
}

export function WhatToExpectSection({ week, data }: WhatToExpectSectionProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2">
        <Star size={16} strokeWidth={2} className="text-peachDark" />
        <p className="text-base font-extrabold text-app-text">What to expect at week {week}</p>
      </div>

      <div className="mt-4 space-y-4">
          <p className="text-sm text-textMuted leading-relaxed">{data.summary}</p>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Moon size={16} strokeWidth={2} className="text-indigo-400" />
              <p className="font-bold text-app-text">Sleep</p>
            </div>
            <div className="text-sm text-textMuted space-y-1">
              <p>Total: <span className="text-app-text font-semibold">{data.sleep.totalHoursRange} hours/day</span></p>
              <p>Longest overnight stretch: <span className="text-app-text font-semibold">{data.sleep.nightSleepHours}</span></p>
              <p>Daytime naps: <span className="text-app-text font-semibold">{data.sleep.naps}</span></p>
              <p className="italic">Ranges are typical for this age. Short wakes and day-to-day variation are normal.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Milk size={16} strokeWidth={2} className="text-blue-400" />
              <p className="font-bold text-app-text">Feeding</p>
            </div>
            <div className="text-sm text-textMuted space-y-1">
              <p>Method: <span className="text-app-text font-semibold">{data.feeding.method}</span></p>
              <p>Frequency: <span className="text-app-text font-semibold">{data.feeding.frequency}</span></p>
              <p className="italic">{data.feeding.notes}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} strokeWidth={2} className="text-peach" />
              <p className="font-bold text-app-text">Activities</p>
            </div>
            <div className="space-y-3">
              {data.activities.map(a => (
                <div key={a.id} className="flex gap-3 items-start">
                  <CirclePlay size={22} strokeWidth={1.5} className="text-peachDark flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="font-semibold text-app-text text-sm">{a.title}</p>
                    <p className="text-textMuted text-xs leading-relaxed">{a.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <a
                        href={getActivityYoutubeUrl(a, week)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-extrabold text-red-500"
                        aria-label={`Open YouTube videos for ${a.title}`}
                      >
                        YouTube
                        <ExternalLink size={12} strokeWidth={2.2} />
                      </a>
                      <a
                        href={getActivityInstagramUrl(a, week)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-extrabold text-pink-500"
                        aria-label={`Open Instagram posts for ${a.title}`}
                      >
                        Instagram
                        <ExternalLink size={12} strokeWidth={2.2} />
                      </a>
                      <a
                        href={getActivityTikTokUrl(a, week)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-slate-700"
                        aria-label={`Open TikTok videos for ${a.title}`}
                      >
                        TikTok
                        <ExternalLink size={12} strokeWidth={2.2} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
