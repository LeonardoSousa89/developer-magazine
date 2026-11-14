import type { localeNames } from '../constants/locales';

export type Locale = keyof typeof localeNames;

export type Values = Record<string, string | number>;
