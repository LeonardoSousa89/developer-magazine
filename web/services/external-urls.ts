export function externalUrl(value: unknown, httpsOnly = false): URL | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;

  try {
    const url = new URL(value);
    if (url.protocol === 'https:' || (!httpsOnly && url.protocol === 'http:')) return url;
  } catch {
    // Invalid URLs are handled by the caller as absent.
  }
}

export function requiredExternalUrl(value: unknown, context: string): string {
  const url = externalUrl(value);
  if (!url) throw new Error(`Missing or invalid external URL: ${context}`);
  return url.href;
}
