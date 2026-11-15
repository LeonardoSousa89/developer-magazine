'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { connectTheme, saveTheme } from '../lib/theme-browser';
import { createThemeStore, initialTheme, type Theme } from '../stores/theme-store';

const ThemeContext = createContext<ReturnType<typeof createThemeStore> | null>(null);
const getServerChoice = () => initialTheme.choice;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createThemeStore);
  useEffect(() => connectTheme(store), [store]);
  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const store = useContext(ThemeContext);
  if (!store) throw new Error('useTheme must be used within ThemeProvider.');

  const choice = useSyncExternalStore(
    store.subscribe,
    () => store.getSnapshot().choice,
    getServerChoice,
  );
  const changeTheme = useCallback(
    (next: Theme) => {
      saveTheme(next);
      store.dispatch({ type: 'theme/selected', choice: next });
    },
    [store],
  );
  return { choice, changeTheme };
}
