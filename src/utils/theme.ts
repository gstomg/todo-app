const THEME_KEY = 'theme'; // 'light' | 'dark'
export type Theme = 'light' | 'dark';

export function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

export function initTheme() {
  const theme = getStoredTheme() ?? 'light';
  applyTheme(theme);
  return theme;
}

export function toggleTheme(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light';
}