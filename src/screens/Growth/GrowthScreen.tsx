import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { format, parseISO, differenceInWeeks } from 'date-fns';
import { useApp } from '../../context/AppContext';
import { GrowthChart } from '../../components/growth/GrowthChart';
import { GrowthEntryForm } from '../../components/growth/GrowthEntryForm';
import { type GrowthMetric, metricConfig } from '../../data/whoGrowthData';
import type { GrowthEntry } from '../../types';

const metrics: GrowthMetric[] = ['weight', 'length', 'head'];

export function GrowthScreen() {
  const { state, dispatch } = useApp();
  const [activeMetric, setActiveMetric] = useState<GrowthMetric>('weight');
  const [showForm, setShowForm] = useState(false);

  const birthDate = state.babyProfile?.birthDate ?? '';
  const gender = state.babyProfile?.gender ?? 'girl';
  const entries = state.growthEntries;

  function handleSave(entry: GrowthEntry) {
    dispatch({ type: 'ADD_GROWTH_ENTRY', payload: entry });
    setShowForm(false);
  }

  function handleDelete(id: string) {
    dispatch({ type: 'DELETE_GROWTH_ENTRY', payload: id });
  }

  const cfg = metricConfig[activeMetric];

  const entriesForMetric = entries.filter(e => e[activeMetric] !== undefined);

  return (
    <div className="fade-in">
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-extrabold text-app-text">Growth</h1>
        <p className="text-textMuted text-sm font-medium mt-1">
          Track weight, length &amp; head circumference
        </p>
      </div>

      {/* Metric tabs */}
      <div className="flex gap-2 px-4 pb-4">
        {metrics.map(m => (
          <button
            key={m}
            onClick={() => setActiveMetric(m)}
            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${
              activeMetric === m ? 'bg-peach text-white' : 'bg-warm text-textMuted'
            }`}
          >
            {metricConfig[m].label}
          </button>
        ))}
      </div>

      {/* Chart */}
      {birthDate ? (
        <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-app-text">
              {cfg.label} ({cfg.unit})
            </p>
            <span className="text-xs text-textMuted">WHO reference</span>
          </div>
          <GrowthChart entries={entries} metric={activeMetric} birthDate={birthDate} gender={gender} />
          {entriesForMetric.length === 0 && (
            <p className="text-xs text-textMuted text-center mt-3">
              No {cfg.label.toLowerCase()} data yet — add your first measurement!
            </p>
          )}
        </div>
      ) : null}

      {/* Add form / button */}
      <div className="px-4 mb-4">
        {showForm ? (
          <GrowthEntryForm onSave={handleSave} onCancel={() => setShowForm(false)} />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-peachLight text-peachDark text-sm font-bold hover:bg-peachLight/30 transition-colors"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Measurement
          </button>
        )}
      </div>

      {/* Entry list */}
      {entries.length > 0 && (
        <div className="px-4 space-y-2">
          <p className="text-xs font-bold text-textMuted uppercase tracking-wide mb-1">History</p>
          {[...entries].reverse().map(entry => {
            const ageWeeks = birthDate
              ? differenceInWeeks(parseISO(entry.date), parseISO(birthDate))
              : null;
            return (
              <div key={entry.id} className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-app-text">
                    {format(parseISO(entry.date), 'dd MMM yyyy')}
                  </p>
                  {ageWeeks !== null && ageWeeks >= 0 && (
                    <p className="text-xs text-textMuted">Week {ageWeeks}</p>
                  )}
                  <div className="flex gap-3 mt-1 flex-wrap">
                    {entry.weight !== undefined && (
                      <span className="text-xs text-app-text font-semibold">
                        {entry.weight} kg
                      </span>
                    )}
                    {entry.length !== undefined && (
                      <span className="text-xs text-app-text font-semibold">
                        {entry.length} cm
                      </span>
                    )}
                    {entry.head !== undefined && (
                      <span className="text-xs text-app-text font-semibold">
                        Head {entry.head} cm
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-textMuted hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="pb-6" />
    </div>
  );
}
