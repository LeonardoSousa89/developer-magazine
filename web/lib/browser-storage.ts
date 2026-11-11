export function saveLocal(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
