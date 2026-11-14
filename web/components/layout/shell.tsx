'use client';
import { LanguageSelector } from '../localization/language-selector';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import Link from 'next/link';
import { ThemeControl } from './theme-control';
import { LegalControls } from '../legal/legal';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Bell, Menu, Search, Settings, X } from 'lucide-react';
const links = [
  ['/projects/', 'Projects'],
  ['/people/', 'People'],
  ['/knowledge/', 'Knowledge'],
  ['/community/', 'Community'],
] as const;
export function Header() {
  const translateText = useTranslate();
  const pathname = usePathname(),
    router = useRouter();
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState('');
  function search(e: FormEvent) {
    e.preventDefault();
    router.push('/search/?q=' + encodeURIComponent(query.trim()));
    setMobile(false);
  }
  return (
    <header className="topbar">
      <div className="top-inner">
        <Link
          className="brand"
          href="/"
          aria-label={translateText('Developer Magazine home')}
        >
          <svg
            className="absolute"
            width="0"
            height="0"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <filter id="dm-logo-background" colorInterpolationFilters="sRGB">
                <feColorMatrix
                  in="SourceGraphic"
                  type="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  20 20 20 0 -0.7"
                  result="logo-alpha"
                />
                <feComposite in="SourceGraphic" in2="logo-alpha" operator="in" />
              </filter>
            </defs>
          </svg>
          <img src="/media/brand.webp" alt="Developer Magazine" width="174" height="42" />
        </Link>
        <nav
          className={'top-nav ' + (mobile ? 'is-open' : '')}
          aria-label={translateText('Main navigation')}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobile(false)}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
            >
              <TranslatedText text={label} />
            </Link>
          ))}
          <Link className="mobile-only" href="/team/" onClick={() => setMobile(false)}>
            <TranslatedText text={'Team'} />
          </Link>
          <Link
            className="mobile-only"
            href="/settings/"
            onClick={() => setMobile(false)}
          >
            <TranslatedText text={'Settings'} />
          </Link>
          <Link className="mobile-only" href="/signin/" onClick={() => setMobile(false)}>
            <TranslatedText text={'Sign in'} />
          </Link>
          <Link className="tiny-only" href="/join/" onClick={() => setMobile(false)}>
            <TranslatedText text={'Join'} />
          </Link>
        </nav>
        <div className="top-actions">
          <form className="top-search" role="search" onSubmit={search}>
            <button aria-label={translateText('Search site')}>
              <Search size={16} />
            </button>
            <input
              aria-label={translateText('Search site')}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={translateText('Search…')}
              maxLength={100}
            />
          </form>
          <Link
            className="icon-button mobile-only"
            href="/search/"
            aria-label={translateText('Search')}
          >
            <Search size={17} />
          </Link>
          <ThemeControl />
          <LanguageSelector />
          <Link
            className="icon-button header-extra"
            href="/messages/"
            aria-label={translateText('Messages and notifications')}
          >
            <Bell size={16} />
          </Link>
          <Link className="btn btn-small secondary sign-in" href="/signin/">
            <TranslatedText text={'Sign in'} />
          </Link>
          <Link className="btn btn-small primary" href="/join/">
            <TranslatedText text={'Join'} /> <ArrowUpRight size={13} />
          </Link>
          <button
            className="icon-button menu-button"
            aria-label={translateText(mobile ? 'Close menu' : 'Open menu')}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  const translateText = useTranslate();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link href="/" aria-label={translateText('Developer Magazine home')}>
          <img src="/media/brand.webp" alt="Developer Magazine" width="134" height="33" />
        </Link>
        <span>
          <TranslatedText text={'People · Projects · Knowledge'} />
        </span>
        <nav aria-label={translateText('Footer')}>
          <Link href="/team/">
            <TranslatedText text={'Team'} />
          </Link>
          <Link href="/messages/">
            <TranslatedText text={'Messages'} />
          </Link>
          <Link href="/settings/">
            <Settings size={14} /> <TranslatedText text={'Settings'} />
          </Link>
          <LegalControls />
        </nav>
      </div>
    </footer>
  );
}
