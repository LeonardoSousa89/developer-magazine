export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  readonly choice: Theme;
  readonly systemDark: boolean;
}

type ThemeAction =
  { type: 'theme/selected'; choice: Theme } | { type: 'system/changed'; dark: boolean };

export const initialTheme: ThemeState = { choice: 'system', systemDark: false };

export function resolveTheme(state: ThemeState): 'light' | 'dark' {
  return state.choice === 'system' ? (state.systemDark ? 'dark' : 'light') : state.choice;
}

export function createThemeStore() {
  let state = initialTheme;
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispatch(action: ThemeAction) {
      const next =
        action.type === 'theme/selected'
          ? { ...state, choice: action.choice }
          : { ...state, systemDark: action.dark };

      if (next.choice === state.choice && next.systemDark === state.systemDark) return;
      state = next;
      for (const listener of listeners) listener();
    },
  };
}
