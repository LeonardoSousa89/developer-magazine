'use client';
import { LanguageControl, T, useT } from '../../providers/language-provider';
import Link from 'next/link';
import { LegalControls } from '../legal/legal';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  Menu,
  Monitor,
  Moon,
  Search,
  Settings,
  Sun,
  X,
} from 'lucide-react';
const links = [
  ['/projects/', 'Projects'],
  ['/people/', 'People'],
  ['/knowledge/', 'Knowledge'],
  ['/community/', 'Community'],
] as const;
export type Theme = 'light' | 'dark' | 'system';
const themes: Record<Theme, typeof Sun> = { light: Sun, dark: Moon, system: Monitor };
function getTheme(): Theme {
  const v = localStorage.getItem('dm-theme');
  return v === 'light' || v === 'dark' ? v : 'system';
}
export function ThemeControl({ full = false }: { full?: boolean }) {
  const t = useT();
  const [choice, setChoice] = useState<Theme>('system');
  useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => {
      const value = getTheme();
      setChoice(value);
      document.documentElement.dataset.theme =
        value === 'system' ? (media.matches ? 'dark' : 'light') : value;
    };
    update();
    media.addEventListener('change', update);
    window.addEventListener('dm-theme', update);
    window.addEventListener('storage', update);
    return () => {
      media.removeEventListener('change', update);
      window.removeEventListener('dm-theme', update);
      window.removeEventListener('storage', update);
    };
  }, []);
  const Icon = themes[choice];
  return (
    <label className={full ? 'theme-control theme-full' : 'theme-control'}>
      <Icon size={16} />
      {full && (
        <span>
          <T text={'Theme'} />
        </span>
      )}
      <select
        value={choice}
        aria-label={t('Appearance theme')}
        onChange={(e) => {
          localStorage.setItem('dm-theme', e.target.value);
          window.dispatchEvent(new Event('dm-theme'));
        }}
      >
        <option value="system">
          <T text={'System'} />
        </option>
        <option value="light">
          <T text={'Light'} />
        </option>
        <option value="dark">
          <T text={'Dark'} />
        </option>
      </select>
      <ChevronDown size={12} />
    </label>
  );
}
export function Header() {
  const t = useT();
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
        <Link className="brand" href="/" aria-label={t('Developer Magazine home')}>
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
          aria-label={t('Main navigation')}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobile(false)}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
            >
              <T text={label} />
            </Link>
          ))}
          <Link className="mobile-only" href="/team/" onClick={() => setMobile(false)}>
            <T text={'Team'} />
          </Link>
          <Link
            className="mobile-only"
            href="/settings/"
            onClick={() => setMobile(false)}
          >
            <T text={'Settings'} />
          </Link>
          <Link className="mobile-only" href="/signin/" onClick={() => setMobile(false)}>
            <T text={'Sign in'} />
          </Link>
          <Link className="tiny-only" href="/join/" onClick={() => setMobile(false)}>
            <T text={'Join'} />
          </Link>
        </nav>
        <div className="top-actions">
          <form className="top-search" role="search" onSubmit={search}>
            <button aria-label={t('Search site')}>
              <Search size={16} />
            </button>
            <input
              aria-label={t('Search site')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('Search…')}
              maxLength={100}
            />
          </form>
          <Link
            className="icon-button mobile-only"
            href="/search/"
            aria-label={t('Search')}
          >
            <Search size={17} />
          </Link>
          <ThemeControl />
          <LanguageControl />
          <Link
            className="icon-button header-extra"
            href="/messages/"
            aria-label={t('Messages and notifications')}
          >
            <Bell size={16} />
          </Link>
          <Link className="btn btn-small secondary sign-in" href="/signin/">
            <T text={'Sign in'} />
          </Link>
          <Link className="btn btn-small primary" href="/join/">
            <T text={'Join'} /> <ArrowUpRight size={13} />
          </Link>
          <button
            className="icon-button menu-button"
            aria-label={t(mobile ? 'Close menu' : 'Open menu')}
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
  const t = useT();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link href="/" aria-label={t('Developer Magazine home')}>
          <img src="/media/brand.webp" alt="Developer Magazine" width="134" height="33" />
        </Link>
        <span>
          <T text={'People · Projects · Knowledge'} />
        </span>
        <nav aria-label={t('Footer')}>
          <Link href="/team/">
            <T text={'Team'} />
          </Link>
          <Link href="/messages/">
            <T text={'Messages'} />
          </Link>
          <Link href="/settings/">
            <Settings size={14} /> <T text={'Settings'} />
          </Link>
          <LegalControls />
        </nav>
      </div>
    </footer>
  );
}
