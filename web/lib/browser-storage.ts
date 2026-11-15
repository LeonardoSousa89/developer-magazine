export function readStoredJson<StoredValue>(key: string): StoredValue | undefined {
  const serializedValue = localStorage.getItem(key);
  return serializedValue ? (JSON.parse(serializedValue) as StoredValue) : undefined;
}

export function writeStoredJson(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}
