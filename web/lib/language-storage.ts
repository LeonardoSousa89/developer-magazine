import { localeNames } from '../constants/locales';
import type { Locale } from '../types/localization';

const LANGUAGE_STORAGE_KEY = 'dm-language';

export function readSavedLocale(): Locale | undefined {
  try {
    const savedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLocale && Object.hasOwn(localeNames, savedLocale))
      return savedLocale as Locale;
  } catch {
    // Keep the default language when browser storage is unavailable.
  }
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
  } catch {
    // The selected language still applies for the current session.
  }
}
