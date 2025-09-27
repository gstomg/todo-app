//ключ для хранения темы в ls
const THEME_KEY = 'theme'; // 'light' | 'dark'
export type Theme = 'light' | 'dark';

//получение темы из ls
export function getStoredTheme(): Theme | null {
  try {
    //достаем по ключу
    const v = localStorage.getItem(THEME_KEY);
    //проверяем значение
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}
//применение темы 
export function applyTheme(theme: Theme) {
  // устанавливаем атрибут data-theme у корневого html элемента
  document.documentElement.setAttribute('data-theme', theme);
}

// функция установки и сохранения темы
export function setTheme(theme: Theme) {
  applyTheme(theme);//применение темы
  try {
    //сохраняем в ls
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

//функция инициализации темы при загрузке приложения
export function initTheme() {
  //получаем тему из хранилища или используем 'light' по умолчанию
  const theme = getStoredTheme() ?? 'light';
  applyTheme(theme);//применение
  return theme;
}

//функция переключения темы (light ↔ dark)
export function toggleTheme(current: Theme): Theme {
  return current === 'light' ? 'dark' : 'light';
}