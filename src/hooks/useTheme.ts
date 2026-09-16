import { useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | null;

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(null);

  useEffect(() => {
    let saved: ThemeMode = null;
    try {
      saved = (localStorage.getItem('theme') as ThemeMode) || null;
    } catch {
      /* private mode / blocked storage */
    }
    if (saved) applyTheme(saved);
    setMode(saved);
  }, []);

  function applyTheme(next: ThemeMode) {
    if (next) document.documentElement.setAttribute('data-theme', next);
    else document.documentElement.removeAttribute('data-theme');
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') as ThemeMode;
    const isDark = current ? current === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next: ThemeMode = isDark ? 'light' : 'dark';
    applyTheme(next);
    setMode(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
  }

  const isDark = mode ? mode === 'dark' : typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return { toggle, isDark };
}
