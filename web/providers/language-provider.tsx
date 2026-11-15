'use client';
import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { readSavedLocale, saveLocale } from '../lib/language-storage';
import { translate, type Locale, type Values } from '../services/translations';

interface LanguageContextValue {
  locale: Locale;
  changeLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  changeLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = readSavedLocale();
    if (savedLocale) setLocale(savedLocale);
  }, []);

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocale(nextLocale);
    saveLocale(nextLocale);
  }, []);

  const contextValue = useMemo(() => ({ locale, changeLocale }), [locale, changeLocale]);
  return (
    <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslate() {
  const { locale } = useLanguage();
  return useCallback(
    (text: string, values?: Values) => translate(locale, text, values),
    [locale],
  );
}
