'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, Search, X } from 'lucide-react';
import { articles, people, projects } from '../../repositories/catalog-repository';
import { Empty, PageHeading, Portrait, ProjectLogo } from '../ui';
import { indexSearch, matchSearch } from '../../services/catalog-search';
const tabs = ['All', 'People', 'Projects', 'Articles'] as const;
export function SearchResults() {
  const translateText = useTranslate();
  const params = useSearchParams(),
    router = useRouter();
  const submittedQuery = params.get('q')?.slice(0, 100) ?? '';
  const [value, setValue] = useState(submittedQuery),
    [tab, setTab] = useState<(typeof tabs)[number]>('All');
  useEffect(() => {
    setValue(submittedQuery);
  }, [submittedQuery]);
  const index = useMemo(
    () => ({
      people: indexSearch(
        people,
        (person) => [person.name, person.role, ...person.tags],
        translateText,
      ),
      projects: indexSearch(
        projects,
        (project) => [project.name, project.kind, project.summary, ...project.tags],
        translateText,
      ),
      articles: indexSearch(
        articles,
        (article) => [article.title, article.topic, article.summary],
        translateText,
      ),
    }),
    [translateText],
  );
  const results = useMemo(
    () => [
      ...matchSearch(index.people, submittedQuery).map((person) => ({
        name: person.name,
        description: person.role,
        href: '/people/' + person.id + '/',
        type: 'People',
        icon: <Portrait person={person} />,
      })),
      ...matchSearch(index.projects, submittedQuery).map((project) => ({
        name: project.name,
        description: project.kind,
        href: '/projects/' + project.id + '/',
        type: 'Projects',
        icon: <ProjectLogo project={project} />,
      })),
      ...matchSearch(index.articles, submittedQuery).map((article) => ({
        name: article.title,
        description:
          translateText(article.topic) +
          ' · ' +
          translateText('{n} min read', { n: article.minutes }),
        href: '/knowledge/' + article.id + '/',
        type: 'Articles',
        icon: (
          <span className="project-logo orange">
            <BookOpen size={23} />
          </span>
        ),
      })),
    ],
    [index, submittedQuery, translateText],
  );
  const filtered = results.filter(
    (searchResult) => tab === 'All' || searchResult.type === tab,
  );
  return (
    <section className="container standalone search-page">
      <PageHeading
        kicker="Explore / Search"
        title="Find what matters"
        description="Search people, projects, and articles in one place."
      />
      <form
        className="control-row"
        onSubmit={(event) => {
          event.preventDefault();
          router.push('/search/?q=' + encodeURIComponent(value.trim()));
        }}
      >
        <label className="field-search">
          <Search size={19} />
          <input
            aria-label={translateText('Search all content')}
            placeholder={translateText('Try machine learning')}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            maxLength={100}
          />
          {value && (
            <button
              className="icon-button"
              type="button"
              aria-label={translateText('Clear search')}
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
          <TranslatedText text={'Search'} />
        </button>
      </form>
      <div className="result-line">
        <span>
          {submittedQuery
            ? translateText('Results for “{query}”', { query: submittedQuery })
            : translateText('Browse all content')}
        </span>
        <span>
          <TranslatedText text="{n} results" values={{ n: filtered.length }} />
        </span>
      </div>
      <div className="filter-row">
        {tabs.map((tabOption) => (
          <button
            key={tabOption}
            aria-pressed={tab === tabOption}
            className={'pill ' + (tab === tabOption ? 'selected' : '')}
            onClick={() => setTab(tabOption)}
          >
            <TranslatedText text={tabOption} />
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="search-list">
          {filtered.map((result) => (
            <Link className="mini-row panel" key={result.href} href={result.href}>
              {result.icon}
              <div>
                <strong>
                  <TranslatedText text={result.name} />
                </strong>
                <small>
                  <TranslatedText text={result.type} /> ·{' '}
                  {translateText(result.description)}
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
