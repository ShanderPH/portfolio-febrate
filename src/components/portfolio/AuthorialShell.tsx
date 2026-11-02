'use client';

import type { ReactNode } from 'react';
import { useSiteTheme } from '@/lib/theme';

export function AuthorialShell({ children, concept, themeLabel }: { children: ReactNode; concept: string; themeLabel: string }) {
  const [theme, toggleTheme] = useSiteTheme(concept === 'atlas' ? 'dark' : 'light');
  return <div className={`authorial authorial--${concept}`} data-theme={theme}>
    {children}
    <button className="author-theme" type="button" onClick={toggleTheme} aria-label={themeLabel}>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg>
    </button>
  </div>;
}
