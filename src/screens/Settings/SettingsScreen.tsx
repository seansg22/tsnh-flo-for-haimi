import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../context/appStateContext';
import { TextInput } from '../../components/shared/TextInput';
import { DateInput } from '../../components/shared/DateInput';
import { encodeTransfer, decodeTransfer } from '../../utils/transfer';
import { DEFAULT_EDD } from '../../constants/babyDefaults';
import type { FeedingMethod, GrowthEntry } from '../../types';

type UpdateStatus = 'idle' | 'checking' | 'updated' | 'error';
type TransferView = 'none' | 'export' | 'import';

export function SettingsScreen() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState(state.babyProfile?.name ?? '');
  const [birthDate, setBirthDate] = useState(state.babyProfile?.birthDate ?? '');
  const [edd, setEdd] = useState(state.babyProfile?.edd ?? DEFAULT_EDD);
  const [gender, setGender] = useState<'girl' | 'boy'>(state.babyProfile?.gender ?? 'girl');
  const [feedingMethod, setFeedingMethod] = useState<FeedingMethod>(state.babyProfile?.feedingMethod ?? 'breast');
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>('idle');
  const [hasNewVersion, setHasNewVersion] = useState(false);
  const [transferView, setTransferView] = useState<TransferView>('none');
  const [copied, setCopied] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [importError, setImportError] = useState('');
  const [importConfirm, setImportConfirm] = useState<{ achievedMilestones: string[]; growthEntries: GrowthEntry[] } | null>(null);
  const [toast, setToast] = useState('');

  const exportCode = transferView === 'export'
    ? encodeTransfer(state.achievedMilestones, state.growthEntries)
    : '';

  useEffect(() => {
    if (importConfirm) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [importConfirm]);

  const today = new Date().toISOString().split('T')[0];
  const maxEddDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().split('T')[0];
  })();

  useEffect(() => {
    fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.buildTime !== __BUILD_TIME__) setHasNewVersion(true); })
      .catch(() => {});
  }, []);

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
        payload: { name: name.trim(), birthDate, gender, feedingMethod, edd: edd || DEFAULT_EDD },
      });
      setToast('Saved');
      setTimeout(() => setToast(''), 1500);
    }, 400);
    return () => clearTimeout(timeout);
  }, [name, birthDate, edd, gender, feedingMethod, dispatch]);

  async function handleUpdate() {
    if (!('serviceWorker' in navigator)) return;
    setUpdateStatus('checking');
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(r => r.unregister()));
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map(key => caches.delete(key)));
      await navigator.serviceWorker.register('/sw.js');
      setUpdateStatus('updated');
      setTimeout(() => window.location.reload(), 1200);
    } catch {
      setUpdateStatus('error');
      setTimeout(() => setUpdateStatus('idle'), 3000);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(exportCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleImportSubmit() {
    try {
      setImportConfirm(decodeTransfer(importCode));
      setImportError('');
    } catch {
      setImportError('Invalid code. Make sure you copied the full code.');
    }
  }

  function handleImportConfirm() {
    if (!importConfirm) return;
    dispatch({ type: 'IMPORT_DATA', payload: importConfirm });
    setImportConfirm(null);
    setTransferView('none');
    setImportCode('');
    setToast('Data imported successfully');
    setTimeout(() => setToast(''), 2500);
  }

  function handleReset() {
    if (!confirm('Reset all app data? This cannot be undone.')) return;
    localStorage.removeItem('baby-day:profile');
    localStorage.removeItem('baby-day:achieved-milestones');
    localStorage.removeItem('baby-day:growth-entries');
    window.location.href = '/';
  }

  const screen = (
    <div className="fade-in px-4 pt-6 pb-8">
      <h1 className="text-2xl font-extrabold text-app-text mb-6">Settings</h1>

      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 space-y-3">
        <p className="font-bold text-app-text">Baby profile</p>
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
      </div>

      <div className="bg-white rounded-2xl p-5 pb-3 shadow-sm mb-4">
        <p className="font-bold text-app-text mb-1">Transfer</p>
        <p className="text-sm text-textMuted mb-3">Move your data to another device using a transfer code.</p>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setTransferView(transferView === 'export' ? 'none' : 'export')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl border-2 transition-all ${transferView === 'export' ? 'bg-peach text-white border-peach' : 'border-peachLight text-app-text active:bg-cream'}`}
          >
            Export code
          </button>
          <button
            onClick={() => setTransferView(transferView === 'import' ? 'none' : 'import')}
            className={`flex-1 py-2 text-sm font-bold rounded-xl border-2 transition-all ${transferView === 'import' ? 'bg-peach text-white border-peach' : 'border-peachLight text-app-text active:bg-cream'}`}
          >
            Import code
          </button>
        </div>

        {transferView === 'export' && (
          <div className="space-y-2">
            <p className="text-xs text-textMuted">Copy this code and paste it on your other device.</p>
            <textarea
              readOnly
              value={exportCode}
              rows={4}
              className="w-full text-xs font-mono bg-cream rounded-xl px-3 py-2 resize-none text-app-text border border-peachLight"
            />
            <button
              onClick={handleCopy}
              className="w-full py-2 text-sm font-bold rounded-xl bg-peach text-white active:opacity-80"
            >
              {copied ? '✓ Copied!' : 'Copy code'}
            </button>
          </div>
        )}

        {transferView === 'import' && (
          <div className="space-y-2">
            <p className="text-xs text-textMuted">Paste the backup code from your other device.</p>
            <textarea
              value={importCode}
              onChange={e => { setImportCode(e.target.value); setImportError(''); }}
              rows={4}
              placeholder="Paste code here…"
              className="w-full text-xs font-mono bg-cream rounded-xl px-3 py-2 resize-none text-app-text border border-peachLight placeholder:text-textMuted/50"
            />
            {importError && <p className="text-red-500 text-xs">{importError}</p>}
            <button
              onClick={handleImportSubmit}
              disabled={!importCode.trim()}
              className="w-full py-2 text-sm font-bold rounded-xl bg-peach text-white active:opacity-80 disabled:opacity-40"
            >
              Import
            </button>
          </div>
        )}
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

  const overlays = (
    <>
      {toast && (
        <div className="fixed bottom-[7.5rem] left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg whitespace-nowrap">
          {toast}
        </div>
      )}
      {importConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-xl -mt-20">
            <p className="font-bold text-app-text mb-1">Import data?</p>
            <p className="text-sm text-textMuted mb-4">
              Import <strong>{importConfirm.achievedMilestones.length} milestones</strong> and{' '}
              <strong>{importConfirm.growthEntries.length} measurements</strong> from the transfer code?{' '}
              Your current data will be replaced.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setImportConfirm(null)}
                className="flex-1 py-2 text-sm font-bold rounded-xl border-2 border-peachLight text-textMuted"
              >
                Cancel
              </button>
              <button
                onClick={handleImportConfirm}
                className="flex-1 py-2 text-sm font-bold rounded-xl bg-peach text-white"
              >
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {screen}
      {createPortal(overlays, document.body)}
    </>
  );
}
