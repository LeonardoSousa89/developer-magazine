import { useEffect, useState } from 'react';
import { readStoredJson, writeStoredJson } from '../lib/browser-storage';

export function usePersistedState<StoredValue>(key: string, initial: StoredValue) {
  const [state, setState] = useState(initial);
  useEffect(() => {
    try {
      const storedValue = readStoredJson<StoredValue>(key);
      if (storedValue !== undefined) setState(storedValue);
    } catch {}
  }, [key]);
  return [
    state,
    (next: StoredValue) => {
      setState(next);
      try {
        writeStoredJson(key, next);
      } catch {}
    },
  ] as const;
}
