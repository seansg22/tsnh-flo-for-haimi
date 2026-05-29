import { Baby, Milk, Smile, Zap, Star, Move, TrendingUp, Trophy, Sparkles, Heart, Rocket } from 'lucide-react';

interface Stage {
  Icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
  label: string;
  color: string;
  bg: string;
}

function getStage(week: number): Stage {
  if (week <= 4)   return { Icon: Baby,       label: 'Newborn',      color: 'text-peachDark',  bg: 'from-peachLight to-warm' };
  if (week <= 8)   return { Icon: Milk,       label: 'Feeding',      color: 'text-blue-400',   bg: 'from-blue-100 to-peachLight' };
  if (week <= 12)  return { Icon: Smile,      label: 'Smiling',      color: 'text-yellow-500', bg: 'from-yellow-100 to-peachLight' };
  if (week <= 20)  return { Icon: Zap,        label: 'Playing',      color: 'text-orange-400', bg: 'from-orange-100 to-peachLight' };
  if (week <= 28)  return { Icon: Star,       label: 'Exploring',    color: 'text-purple-400', bg: 'from-purple-100 to-peachLight' };
  if (week <= 36)  return { Icon: Move,       label: 'Moving',       color: 'text-green-500',  bg: 'from-green-100 to-peachLight' };
  if (week <= 44)  return { Icon: TrendingUp, label: 'Cruising',     color: 'text-pink-400',   bg: 'from-pink-100 to-peachLight' };
  if (week <= 56)  return { Icon: Trophy,     label: 'One year!',    color: 'text-amber-500',  bg: 'from-amber-100 to-peachLight' };
  if (week <= 78)  return { Icon: Rocket,     label: 'Toddling',     color: 'text-rose-400',   bg: 'from-rose-100 to-peachLight' };
  if (week <= 104) return { Icon: Zap,        label: 'Running',      color: 'text-orange-500', bg: 'from-orange-100 to-warm' };
  if (week <= 130) return { Icon: Heart,      label: 'Two years!',   color: 'text-pink-500',   bg: 'from-pink-100 to-peachLight' };
  return            { Icon: Sparkles,         label: 'Three years!', color: 'text-violet-500', bg: 'from-violet-100 to-peachLight' };
}

export function BabyIllustration({ week }: { week: number }) {
  const { Icon, label, color, bg } = getStage(week);
  return (
    <div className="flex flex-col items-center justify-center py-6 gap-2">
      <div className={`w-36 h-36 rounded-full bg-gradient-to-b ${bg} flex items-center justify-center shadow-md`}>
        <Icon size={72} strokeWidth={1.3} className={color} />
      </div>
      <span className="text-xs font-semibold text-textMuted uppercase tracking-widest">{label}</span>
    </div>
  );
}
