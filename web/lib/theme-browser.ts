import { resolveTheme, type createThemeStore, type Theme } from '../stores/theme-store';

const storageKey = 'dm-theme';
const mediaQuery = '(prefers-color-scheme: dark)';

function readChoice(): Theme {
  try {
    const value = localStorage.getItem(storageKey);
    if (value === 'light' || value === 'dark') return value;
  } catch {}
  return 'system';
}

export function saveTheme(choice: Theme) {
  try {
    localStorage.setItem(storageKey, choice);
  } catch {}
}

export function connectTheme(store: ReturnType<typeof createThemeStore>) {
  const media = matchMedia(mediaQuery);
  const updateDocument = () => {
    document.documentElement.dataset.theme = resolveTheme(store.getSnapshot());
  };
  const syncChoice = () =>
    store.dispatch({ type: 'theme/selected', choice: readChoice() });
  const syncSystem = () =>
    store.dispatch({ type: 'system/changed', dark: media.matches });
  const onStorage = (event: StorageEvent) => {
    if (
      event.storageArea === window.localStorage &&
      (event.key === storageKey || event.key === null)
    ) {
      syncChoice();
    }
  };

  syncChoice();
  syncSystem();
  updateDocument();
  const unsubscribe = store.subscribe(updateDocument);
  media.addEventListener('change', syncSystem);
  window.addEventListener('storage', onStorage);
  return () => {
    unsubscribe();
    media.removeEventListener('change', syncSystem);
    window.removeEventListener('storage', onStorage);
  };
}
