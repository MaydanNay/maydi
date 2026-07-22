import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { dictionaries } from './dictionaries';

const STORAGE_KEY = 'maydi-lang';
const LocaleContext = createContext(null);

function detectBrowserLocale() {
  if (typeof navigator === 'undefined') return 'en';

  const candidates = [...(navigator.languages || []), navigator.language]
    .filter(Boolean)
    .map((l) => String(l).toLowerCase());

  if (candidates.some((l) => l === 'ru' || l.startsWith('ru-'))) return 'ru';
  return 'en';
}

function readStoredLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ru') return saved;
  } catch {
    /* ignore */
  }
  return null;
}

function resolveInitialLocale() {
  return readStoredLocale() ?? detectBrowserLocale();
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(resolveInitialLocale);
  const [manual, setManual] = useState(() => readStoredLocale() != null);

  const setLocale = useCallback((next) => {
    if (next !== 'ru' && next !== 'en') return;
    setLocaleState(next);
    setManual(true);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Follow browser language until the user picks RU/EN manually
  useEffect(() => {
    if (manual) return undefined;

    const sync = () => setLocaleState(detectBrowserLocale());
    window.addEventListener('languagechange', sync);
    return () => window.removeEventListener('languagechange', sync);
  }, [manual]);

  const dict = dictionaries[locale] ?? dictionaries.en;

  const t = useCallback(
    (key) => {
      const parts = key.split('.');
      let cur = dict;
      for (const part of parts) {
        if (cur == null || typeof cur !== 'object') return key;
        cur = cur[part];
      }
      return typeof cur === 'string' ? cur : key;
    },
    [dict],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, dict }),
    [locale, setLocale, t, dict],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
