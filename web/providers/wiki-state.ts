'use client';
import { useSyncExternalStore } from 'react';
import { readSession } from './preview-session';

import type { WikiEntry } from '../types/wiki';
const key = 'dm-preview-wiki';
const empty: readonly WikiEntry[] = [];
const listeners = new Set<() => void>();
let raw: string | null | undefined;
let snapshot = empty;

function entries() {
  try {
    const next = localStorage.getItem(key);
    if (next !== raw) {
      snapshot = next ? (JSON.parse(next) as WikiEntry[]) : empty;
      raw = next;
    }
    return snapshot;
  } catch {
    return empty;
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}
export function useWikiEntries() {
  return useSyncExternalStore(subscribe, entries, () => empty);
}
export function saveWikiEntry(entry: WikiEntry) {
  if (!readSession()) return false;
  const current = entries();
  const next = current.some(({ id }) => id === entry.id)
    ? current.map((item) => (item.id === entry.id ? entry : item))
    : [...current, entry];
  localStorage.setItem(key, JSON.stringify(next));
  listeners.forEach((listener) => listener());
  return true;
}
