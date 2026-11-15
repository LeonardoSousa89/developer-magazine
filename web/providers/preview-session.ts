'use client';

import { useSyncExternalStore } from 'react';

export type PreviewSession = {
  subject: string;
  username: string;
  name: string;
  location: string;
  projectName: string;
  projectUrl: string;
};

const key = 'dm-preview-session';
const listeners = new Set<() => void>();
let raw: string | null | undefined;
let snapshot: PreviewSession | null = null;

export function readSession() {
  try {
    const next = sessionStorage.getItem(key);
    if (raw !== next) {
      raw = next;
      snapshot = next ? (JSON.parse(next) as PreviewSession) : null;
    }
    return snapshot;
  } catch {
    return null;
  }
}

export function setSession(session: PreviewSession | null) {
  if (session) sessionStorage.setItem(key, JSON.stringify(session));
  else sessionStorage.removeItem(key);
  listeners.forEach((listener) => listener());
}

export function useSession() {
  return useSyncExternalStore(subscribe, readSession, () => undefined);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
