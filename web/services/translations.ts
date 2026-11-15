import messages from '../mocks/messages.i18n.json';
import type { Locale, Values } from '../types/localization';
export { localeNames } from '../constants/locales';
export type { Locale, Values } from '../types/localization';

const dictionaries = messages as Record<string, Partial<Record<Locale, string>>>;

export function translate(locale: Locale, text: string, values?: Values): string {
  const translated = Object.hasOwn(dictionaries, text)
    ? (dictionaries[text][locale] ?? text)
    : text;
  return values
    ? translated.replace(/\{(\w+)\}/g, (token, key) =>
        Object.hasOwn(values, key) ? String(values[key]) : token,
      )
    : translated;
}
