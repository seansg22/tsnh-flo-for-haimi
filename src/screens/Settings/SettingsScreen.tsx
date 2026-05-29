import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/shared/Button';
import { TextInput } from '../../components/shared/TextInput';

export function SettingsScreen() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(state.babyProfile?.name ?? '');
  const [birthDate, setBirthDate] = useState(state.babyProfile?.birthDate ?? '');
  const [saved, setSaved] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  function handleSave() {
    if (!name.trim() || !birthDate) return;
    dispatch({ type: 'SET_BABY_PROFILE', payload: { name: name.trim(), birthDate } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (!confirm('Reset all app data? This cannot be undone.')) return;
    localStorage.removeItem('baby-day:profile');
    localStorage.removeItem('baby-day:achieved-milestones');
    window.location.href = '/';
  }

  return (
    <div className="fade-in px-4 pt-10">
      <h1 className="text-2xl font-extrabold text-app-text mb-6">Settings</h1>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4 space-y-4">
        <p className="font-bold text-app-text">Baby profile</p>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1.5 uppercase tracking-wide">Name</p>
          <TextInput value={name} onChange={setName} placeholder="Baby's name" />
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1.5 uppercase tracking-wide">Birth date</p>
          <input
            type="date"
            value={birthDate}
            max={today}
            onChange={e => setBirthDate(e.target.value)}
            className="rounded-xl border-2 border-peachLight focus:border-peach outline-none px-4 py-3 w-full text-app-text bg-cream text-base font-medium transition-colors"
          />
        </div>
        <Button onClick={handleSave} disabled={!name.trim() || !birthDate} className="w-full">
          {saved ? '✓ Saved!' : 'Save changes'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <p className="font-bold text-app-text mb-1">About</p>
        <p className="text-sm text-textMuted">Baby Day v1.0</p>
        <p className="text-sm text-textMuted">Track your baby's first year, day by day</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100">
        <p className="font-bold text-red-500 mb-1">Danger zone</p>
        <p className="text-sm text-textMuted mb-3">This will erase all data including milestones</p>
        <button
          onClick={handleReset}
          className="text-red-500 text-sm font-bold border border-red-200 rounded-xl px-4 py-2 active:bg-red-50"
        >
          Reset app data
        </button>
      </div>
    </div>
  );
}
