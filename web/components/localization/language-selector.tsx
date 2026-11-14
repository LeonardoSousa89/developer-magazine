'use client';
import { Globe2 } from 'lucide-react';
import { useLanguage, useTranslate } from '../../providers/language-provider';
import { localeNames } from '../../constants/locales';
import type { Locale } from '../../types/localization';

export function LanguageSelector() {
  const { locale, changeLocale } = useLanguage(),
    translateText = useTranslate();
  return (
    <label className="language-control">
      <Globe2 size={15} aria-hidden="true" />
      <span aria-hidden="true">{locale.split('-')[0].toUpperCase()}</span>
      <select
        aria-label={translateText('Language')}
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
      >
        {Object.entries(localeNames).map(([code, name]) => (
          <option key={code} lang={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
