import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/appStateContext';
import { TextInput } from '../../components/shared/TextInput';
import { DateInput } from '../../components/shared/DateInput';
import { DEFAULT_EDD } from '../../constants/babyDefaults';
import type { FeedingMethod } from '../../types';

export function BabyProfileScreen() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState(state.babyProfile?.name ?? '');
  const [birthDate, setBirthDate] = useState(state.babyProfile?.birthDate ?? '');
  const [edd, setEdd] = useState(state.babyProfile?.edd ?? DEFAULT_EDD);
  const [solidsStartDate, setSolidsStartDate] = useState(state.babyProfile?.solidsStartDate ?? '');
  const [formulaSwitchDate, setFormulaSwitchDate] = useState(state.babyProfile?.formulaSwitchDate ?? '');
  const [gender, setGender] = useState<'girl' | 'boy'>(state.babyProfile?.gender ?? 'girl');
  const [feedingMethod, setFeedingMethod] = useState<FeedingMethod>(state.babyProfile?.feedingMethod ?? 'breast');
  const [notes, setNotes] = useState(state.babyProfile?.notes ?? '');

  const today = new Date().toISOString().split('T')[0];
  const maxEddDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  })();

  // Auto-save the baby profile shortly after any field changes (skip the
  // initial mount so loading the saved profile doesn't trigger a save).
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!name.trim() || !birthDate) return;
    const timeout = setTimeout(() => {
      dispatch({
        type: 'SET_BABY_PROFILE',
        payload: {
          name: name.trim(),
          birthDate,
          gender,
          feedingMethod,
          edd: edd || DEFAULT_EDD,
          solidsStartDate,
          formulaSwitchDate: feedingMethod === 'formula' ? formulaSwitchDate : '',
          notes,
        },
      });
    }, 400);
    return () => clearTimeout(timeout);
  }, [name, birthDate, edd, solidsStartDate, formulaSwitchDate, gender, feedingMethod, notes, dispatch]);

  return (
    <div className="fade-in px-4 pt-6 pb-8">
      <h1 className="text-2xl font-extrabold text-app-text">Baby Profile</h1>
      <p className="text-sm text-textMuted mt-1">Used to personalize guidance in Ask AI.</p>

      <div className="bg-white rounded-2xl p-4 shadow-sm mt-6 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Name</p>
            <TextInput value={name} onChange={setName} placeholder="Baby's name" className="h-11 py-0 text-sm" />
          </div>
          <div>
            <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Gender</p>
            <div className="flex gap-1.5">
              {(['girl', 'boy'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  aria-label={g === 'girl' ? 'Girl' : 'Boy'}
                  className={`w-10 h-11 flex items-center justify-center rounded-xl text-sm font-bold leading-none transition-all border-2 ${gender === g
                    ? 'bg-peach text-white border-peach'
                    : 'bg-cream text-textMuted border-peachLight'
                  }`}
                >
                  <span className="leading-none">{g === 'girl' ? '♀' : '♂'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Birth date</p>
          <DateInput value={birthDate} max={today} onChange={setBirthDate} compact />
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Due date (EDD)</p>
          <DateInput value={edd} max={maxEddDate} onChange={setEdd} compact />
          <p className="text-[11px] text-textMuted mt-1">Used to calculate Wonder Week developmental leaps.</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Feeding</p>
          <div className="flex gap-1.5">
            {([
              ['breast', 'Breast'],
              ['bottle', 'Bottle'],
              ['formula', 'Formula'],
            ] as [FeedingMethod, string][]).map(([value, label]) => (
              <button
                key={value}
                onClick={() => setFeedingMethod(value)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border-2 ${feedingMethod === value
                  ? 'bg-peach text-white border-peach'
                  : 'bg-cream text-textMuted border-peachLight'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {feedingMethod === 'formula' && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-textMuted uppercase tracking-wide">Switched to formula</p>
              {formulaSwitchDate && (
                <button onClick={() => setFormulaSwitchDate('')} className="text-[11px] font-semibold text-peachDark">
                  Clear
                </button>
              )}
            </div>
            <DateInput value={formulaSwitchDate} min={birthDate} max={today} onChange={setFormulaSwitchDate} compact />
            <p className="text-[11px] text-textMuted mt-1">
              When your baby switched from breast milk to formula.
            </p>
          </div>
        )}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-textMuted uppercase tracking-wide">Starting solids</p>
            {solidsStartDate && (
              <button onClick={() => setSolidsStartDate('')} className="text-[11px] font-semibold text-peachDark">
                Clear
              </button>
            )}
          </div>
          <DateInput value={solidsStartDate} min={birthDate} max={today} onChange={setSolidsStartDate} compact />
          <p className="text-[11px] text-textMuted mt-1">
            When your baby started eating solid foods (weaning). Leave blank if not started yet — typically around 24 weeks.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Notes</p>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={14}
            placeholder="E.g. allergies, sleep habits, favorite toys, things that upset her, or anything else worth remembering… Mentioning dates (e.g. 'started teething on 12/03') helps the AI give more accurate answers."
            className="w-full text-sm bg-cream rounded-xl px-4 py-3 resize-none text-app-text border-2 border-peachLight focus:border-peach outline-none transition-colors placeholder:text-textMuted/50"
          />
          <p className="text-[11px] text-textMuted mt-px">We'll share this with Ask AI to help it give better answers.</p>
        </div>
      </div>
    </div>
  );
}
