import { useEffect, useState } from 'react';

export function useLocal<T>(key: string, initial: T) {
  const [state, setState] = useState(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setState(JSON.parse(raw) as T);
    } catch {}
  }, [key]);
  return [
    state,
    (next: T) => {
      setState(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
    },
  ] as const;
}

export { saveLocal } from '../lib/browser-storage';
