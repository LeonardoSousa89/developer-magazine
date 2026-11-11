'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type ComponentProps,
} from 'react';
import { usePathname } from 'next/navigation';
import { Globe2 } from 'lucide-react';
import {
  translate,
  localeNames,
  type Locale,
  type Values,
} from '../services/translations';
import { articles, people, projects } from '../repositories/catalog-repository';

const Context = createContext<{ locale: Locale; change: (locale: Locale) => void }>({
  locale: 'en',
  change: () => {},
});
const storageKey = 'dm-language';
const routes: Record<string, string> = {
  community: 'Community',
  join: 'Join',
  knowledge: 'Knowledge',
  messages: 'Messages',
  people: 'People',
  projects: 'Projects',
  search: 'Search',
  settings: 'Settings',
  signin: 'Sign in',
  team: 'Team',
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');
  const pathname = usePathname();
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && Object.hasOwn(localeNames, stored)) setLocale(stored as Locale);
    } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    const [route, slug] = pathname.split('/').filter(Boolean);
    const title = slug
      ? route === 'people'
        ? people.find((p) => p.id === slug)?.name
        : route === 'projects'
          ? projects.find((p) => p.id === slug)?.name
          : articles.find((a) => a.id === slug)?.title
      : routes[route];
    document.title = title
      ? translate(locale, title) + ' | Developer Magazine'
      : translate(locale, 'Developer Magazine — People. Projects. Knowledge.');
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        'content',
        translate(locale, 'Discover the people, projects and ideas behind technology.'),
      );
  }, [locale, pathname]);
  function change(next: Locale) {
    setLocale(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {}
  }
  return <Context.Provider value={{ locale, change }}>{children}</Context.Provider>;
}
export function useT() {
  const { locale } = useContext(Context);
  return (text: string, values?: Values) => translate(locale, text, values);
}
export function T({ text, values }: { text: string; values?: Values }) {
  return useT()(text, values);
}
export function LocalNav({ 'aria-label': label, ...props }: ComponentProps<'nav'>) {
  const t = useT();
  return <nav {...props} aria-label={label ? t(label) : undefined} />;
}
export function LanguageControl() {
  const { locale, change } = useContext(Context),
    t = useT();
  return (
    <label className="language-control">
      <Globe2 size={15} aria-hidden="true" />
      <span aria-hidden="true">{locale.split('-')[0].toUpperCase()}</span>
      <select
        aria-label={t('Language')}
        value={locale}
        onChange={(e) => change(e.target.value as Locale)}
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
