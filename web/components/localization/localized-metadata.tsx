'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../providers/language-provider';
import { getPageTitle } from '../../services/page-title';
import { translate } from '../../services/translations';

export function LocalizedMetadata() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = locale;
    const title = getPageTitle(pathname);
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
  return null;
}
