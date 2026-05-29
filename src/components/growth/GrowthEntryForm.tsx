import { useState } from 'react';
import { X } from 'lucide-react';
import type { GrowthEntry } from '../../types';

interface Props {
  onSave: (entry: GrowthEntry) => void;
  onCancel: () => void;
}

export function GrowthEntryForm({ onSave, onCancel }: Props) {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [head, setHead] = useState('');

  const canSave = date && (weight !== '' || length !== '' || head !== '');

  function handleSave() {
    if (!canSave) return;
    const entry: GrowthEntry = {
      id: `${date}-${Date.now()}`,
      date,
      ...(weight !== '' ? { weight: parseFloat(weight) } : {}),
      ...(length !== '' ? { length: parseFloat(length) } : {}),
      ...(head !== ''   ? { head: parseFloat(head) }     : {}),
    };
    onSave(entry);
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-peachLight">
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-app-text text-sm">Add Measurement</p>
        <button onClick={onCancel} className="p-1 text-textMuted">
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-textMuted block mb-1">Date</label>
          <input
            type="date"
            value={date}
            max={today}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-peachLight rounded-xl px-3 py-2 text-sm text-app-text bg-cream focus:outline-none focus:border-peachDark"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-xs font-semibold text-textMuted block mb-1">Weight (kg)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 4.2"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="w-full border border-peachLight rounded-xl px-3 py-2 text-sm text-app-text bg-cream focus:outline-none focus:border-peachDark"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-textMuted block mb-1">Length (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 55"
              value={length}
              onChange={e => setLength(e.target.value)}
              className="w-full border border-peachLight rounded-xl px-3 py-2 text-sm text-app-text bg-cream focus:outline-none focus:border-peachDark"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-textMuted block mb-1">Head (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              placeholder="e.g. 37"
              value={head}
              onChange={e => setHead(e.target.value)}
              className="w-full border border-peachLight rounded-xl px-3 py-2 text-sm text-app-text bg-cream focus:outline-none focus:border-peachDark"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full py-2.5 rounded-xl text-sm font-bold bg-peach text-white disabled:opacity-40 transition-opacity"
        >
          Save
        </button>
      </div>
    </div>
  );
}
