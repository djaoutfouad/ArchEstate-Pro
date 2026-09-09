import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Check, Cookie, Sliders, Info } from 'lucide-react';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean;
  advertising: boolean;
  consentGiven: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'archestate_cookie_preferences';

export const getStoredCookiePreferences = (): CookiePreferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // Ignore storage errors
  }
  return {
    necessary: true,
    analytics: true,
    advertising: true,
    consentGiven: false,
    timestamp: '',
  };
};

export const saveStoredCookiePreferences = (prefs: CookiePreferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    // Ignore storage errors
  }
};

export const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ isOpen, onClose }) => {
  const [prefs, setPrefs] = useState<CookiePreferences>(getStoredCookiePreferences);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPrefs(getStoredCookiePreferences());
      setSavedFeedback(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated: CookiePreferences = {
      ...prefs,
      necessary: true, // cannot be disabled
      consentGiven: true,
      timestamp: new Date().toISOString(),
    };
    saveStoredCookiePreferences(updated);
    setPrefs(updated);
    setSavedFeedback(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleAcceptAll = () => {
    const updated: CookiePreferences = {
      necessary: true,
      analytics: true,
      advertising: true,
      consentGiven: true,
      timestamp: new Date().toISOString(),
    };
    saveStoredCookiePreferences(updated);
    setPrefs(updated);
    setSavedFeedback(true);
    setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cookie-settings-title" className="text-lg font-bold text-slate-900">
                Privacy &amp; Cookie Settings
              </h2>
              <p className="text-xs text-slate-500">
                Manage your tracking and advertising preferences
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content explanation */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We use cookies and browser storage to optimize site functionality, evaluate non-personal aggregate usage, and serve contextual ads in accordance with Google AdSense guidelines. You may customize your categories below:
        </p>

        {/* Categories */}
        <div className="space-y-3.5">
          {/* 1. Necessary Cookies */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">Strictly Necessary Cookies</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Essential for core site navigation, security, and retaining calculator state during your session. These cannot be disabled.
              </p>
            </div>
            <input
              type="checkbox"
              checked={true}
              disabled={true}
              aria-label="Strictly Necessary Cookies (Always Active)"
              className="w-4 h-4 text-emerald-600 rounded mt-1 opacity-60 cursor-not-allowed"
            />
          </div>

          {/* 2. Analytics Cookies */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 hover:border-slate-300 transition-colors">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Performance &amp; Analytics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aggregated, anonymized metrics (such as page views and calculator tool engagement) that help us diagnose errors and refine formulas.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                aria-label="Toggle Performance & Analytics Cookies"
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          {/* 3. Advertising Cookies */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 hover:border-slate-300 transition-colors">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Advertising &amp; AdSense Cookies</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Used by Google and third-party ad vendors to serve relevant advertisements and limit the number of times an ad is displayed.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={prefs.advertising}
                onChange={(e) => setPrefs({ ...prefs, advertising: e.target.checked })}
                aria-label="Toggle Advertising & AdSense Cookies"
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs text-emerald-700 font-semibold">
            {savedFeedback ? (
              <span className="flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Preferences saved successfully!</span>
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              Save Choices
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-colors shadow-xs"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
