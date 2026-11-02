'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';
const key = 'febrate-portfolio-theme';
const event = 'febrate-theme-change';
let volatileTheme: Theme | undefined;

function subscribe(notify: () => void) {
  window.addEventListener('storage', notify);
  window.addEventListener(event, notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener(event, notify);
  };
}

export function useSiteTheme(fallback: Theme = 'dark') {
  const theme = useSyncExternalStore(subscribe, () => {
    try {
      const saved = localStorage.getItem(key);
      return saved === 'light' || saved === 'dark' ? saved : fallback;
    } catch { return volatileTheme ?? fallback; }
  }, () => fallback);

  return [theme, () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(key, next); } catch { volatileTheme = next; }
    window.dispatchEvent(new Event(event));
  }] as const;
}
