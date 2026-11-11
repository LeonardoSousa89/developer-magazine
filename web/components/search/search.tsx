'use client';
import { T, useT } from '../../providers/language-provider';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, Search, X } from 'lucide-react';
import { articles, people, projects } from '../../repositories/catalog-repository';
import { Empty, PageHeading, Portrait, ProjectLogo } from '../ui';
const tabs = ['All', 'People', 'Projects', 'Articles'] as const;
export function SearchResults() {
  const t = useT();
  const params = useSearchParams(),
    router = useRouter();
  const q = params.get('q')?.slice(0, 100) ?? '';
  const [value, setValue] = useState(q),
    [tab, setTab] = useState<(typeof tabs)[number]>('All');
  useEffect(() => {
    setValue(q);
  }, [q]);
  const match = (...s: string[]) =>
    s
      .flatMap((x) => [x, t(x)])
      .join(' ')
      .toLowerCase()
      .includes(q.toLowerCase());
  const results = [
    ...people
      .filter((p) => match(p.name, p.role, ...p.tags))
      .map((p) => ({
        name: p.name,
        description: p.role,
        href: '/people/' + p.id + '/',
        type: 'People',
        icon: <Portrait person={p} />,
      })),
    ...projects
      .filter((p) => match(p.name, p.kind, p.summary, ...p.tags))
      .map((p) => ({
        name: p.name,
        description: p.kind,
        href: '/projects/' + p.id + '/',
        type: 'Projects',
        icon: <ProjectLogo project={p} />,
      })),
    ...articles
      .filter((a) => match(a.title, a.topic, a.summary))
      .map((a) => ({
        name: a.title,
        description: t(a.topic) + ' · ' + t('{n} min read', { n: a.minutes }),
        href: '/knowledge/' + a.id + '/',
        type: 'Articles',
        icon: (
          <span className="project-logo orange">
            <BookOpen size={23} />
          </span>
        ),
      })),
  ];
  const filtered = results.filter((r) => tab === 'All' || r.type === tab);
  return (
    <section className="container standalone search-page">
      <PageHeading
        kicker="Explore / Search"
        title="Find what matters"
        description="Search people, projects, and articles in one place."
      />
      <form
        className="control-row"
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/search/?q=' + encodeURIComponent(value.trim()));
        }}
      >
        <label className="field-search">
          <Search size={19} />
          <input
            aria-label={t('Search all content')}
            placeholder={t('Try machine learning')}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={100}
          />
          {value && (
            <button
              className="icon-button"
              type="button"
              aria-label={t('Clear search')}
              onClick={() => {
                setValue('');
                router.push('/search/');
              }}
            >
              <X size={15} />
            </button>
          )}
        </label>
        <button className="btn primary">
          <T text={'Search'} />
        </button>
      </form>
      <div className="result-line">
        <span>
          {q ? t('Results for “{query}”', { query: q }) : t('Browse all content')}
        </span>
        <span>
          <T text="{n} results" values={{ n: filtered.length }} />
        </span>
      </div>
      <div className="filter-row">
        {tabs.map((t) => (
          <button
            key={t}
            aria-pressed={tab === t}
            className={'pill ' + (tab === t ? 'selected' : '')}
            onClick={() => setTab(t)}
          >
            <T text={t} />
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="search-list">
          {filtered.map((r) => (
            <Link className="mini-row panel" key={r.href} href={r.href}>
              {r.icon}
              <div>
                <strong>
                  <T text={r.name} />
                </strong>
                <small>
                  <T text={r.type} /> · {t(r.description)}
                </small>
              </div>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </section>
  );
}
