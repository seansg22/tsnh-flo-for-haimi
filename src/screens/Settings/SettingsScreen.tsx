import { useState, useEffect } from 'react';
import { useApp } from '../../context/appStateContext';
import { Button } from '../../components/shared/Button';
import { TextInput } from '../../components/shared/TextInput';
import { DateInput } from '../../components/shared/DateInput';
import type { FeedingMethod } from '../../types';

type UpdateStatus = 'idle' | 'checking' | 'updated' | 'error';

export function SettingsScreen() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState(state.babyProfile?.name ?? '');
  const [birthDate, setBirthDate] = useState(state.babyProfile?.birthDate ?? '');
  const [gender, setGender] = useState<'girl' | 'boy'>(state.babyProfile?.gender ?? 'girl');
  const [feedingMethod, setFeedingMethod] = useState<FeedingMethod>(state.babyProfile?.feedingMethod ?? 'breast');
  const [saved, setSaved] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>('idle');
  const [hasNewVersion, setHasNewVersion] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.buildTime !== __BUILD_TIME__) setHasNewVersion(true); })
      .catch(() => {});
  }, []);

  function handleSave() {
    if (!name.trim() || !birthDate) return;
    dispatch({ type: 'SET_BABY_PROFILE', payload: { name: name.trim(), birthDate, gender, feedingMethod } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleUpdate() {
    if (!('serviceWorker' in navigator)) return;
    setUpdateStatus('checking');
    try {
      // Unregister all existing SWs so the browser fetches a fresh sw.js
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(r => r.unregister()));

      // Delete all caches so assets are re-fetched after the new SW activates
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map(key => caches.delete(key)));

      // Re-register so the new SW installs immediately on reload
      await navigator.serviceWorker.register('/sw.js');

      setUpdateStatus('updated');
      // Reload after a short delay so the user sees the feedback
      setTimeout(() => window.location.reload(), 1200);
    } catch {
      setUpdateStatus('error');
      setTimeout(() => setUpdateStatus('idle'), 3000);
    }
  }

  function handleReset() {
    if (!confirm('Reset all app data? This cannot be undone.')) return;
    localStorage.removeItem('baby-day:profile');
    localStorage.removeItem('baby-day:achieved-milestones');
    localStorage.removeItem('baby-day:growth-entries');
    window.location.href = '/';
  }

  return (
    <div className="fade-in px-4 pt-6">
      <h1 className="text-2xl font-extrabold text-app-text mb-6">Settings</h1>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 space-y-3">
        <p className="font-bold text-app-text">Baby profile</p>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Name</p>
          <TextInput value={name} onChange={setName} placeholder="Baby's name" className="py-2 text-sm" />
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Birth date</p>
          <DateInput value={birthDate} max={today} onChange={setBirthDate} compact />
        </div>
        <div>
          <p className="text-xs font-semibold text-textMuted mb-1 uppercase tracking-wide">Gender</p>
          <div className="flex gap-1.5">
            {(['girl', 'boy'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize transition-all border-2 ${gender === g
                  ? 'bg-peach text-white border-peach'
                  : 'bg-cream text-textMuted border-peachLight'
                }`}
              >
                {g === 'girl' ? '♀ Girl' : '♂ Boy'}
              </button>
            ))}
          </div>
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
        <Button onClick={handleSave} disabled={!name.trim() || !birthDate} className="w-full">
          {saved ? '✓ Saved!' : 'Save changes'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-bold text-app-text">App</p>
          {hasNewVersion && (
            <span className="text-xs font-bold bg-peach text-white px-2 py-0.5 rounded-full">
              New update
            </span>
          )}
        </div>
        <p className="text-xs text-textMuted mb-3">
          Last updated {new Date(__BUILD_TIME__).toLocaleString()}
        </p>
        {hasNewVersion && (
          <div className="bg-orange-50 border border-peachLight rounded-xl px-3 py-2.5 mb-3">
            <p className="text-sm text-app-text leading-snug">
              A newer version of the app is ready.<br />
              <span className="text-textMuted">Tap below to refresh and get it.</span>
            </p>
          </div>
        )}
        <button
          id="update-app-btn"
          onClick={handleUpdate}
          disabled={updateStatus === 'checking' || updateStatus === 'updated'}
          className={`text-sm font-bold rounded-xl px-4 py-2 transition-all disabled:opacity-60 ${
            hasNewVersion
              ? 'bg-peach text-white border-2 border-peach active:opacity-80'
              : 'text-app-text border-2 border-peachLight active:bg-cream'
          }`}
        >
          {updateStatus === 'checking' && 'Checking…'}
          {updateStatus === 'updated' && 'Updated! Reloading…'}
          {updateStatus === 'error' && 'Update failed — try again'}
          {updateStatus === 'idle' && 'Update app'}
        </button>
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
