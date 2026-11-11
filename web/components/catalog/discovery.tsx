'use client';
import { T, useT } from '../../providers/language-provider';
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { articles, people, projects } from '../../repositories/catalog-repository';
import { ArticleCard, Empty, PageHeading, PersonCard, ProjectCard, Sidebar } from '../ui';
type Directory = 'people' | 'projects' | 'knowledge';
const descriptions = {
  people: {
    label: 'People',
    title: 'People directory',
    description: 'Discover the pioneers and practitioners behind the work.',
    placeholder: 'Search people, skills, countries…',
  },
  projects: {
    label: 'Projects',
    title: 'Project directory',
    description: 'Explore the technologies people build, share, and depend on.',
    placeholder: 'Search projects, technologies, topics…',
  },
  knowledge: {
    label: 'Knowledge',
    title: 'The knowledge base',
    description: 'Practical ideas and lessons from the work behind technology.',
    placeholder: 'Search articles, topics, technologies…',
  },
};
export function Discovery({ kind }: { kind: Directory }) {
  const t = useT();
  const [query, setQuery] = useState(''),
    [filter, setFilter] = useState('Discover'),
    [show, setShow] = useState(false);
  const copy = descriptions[kind];
  const source =
    kind === 'people'
      ? people.map((x) => x.category)
      : kind === 'projects'
        ? projects.map((x) => x.kind)
        : articles.map((x) => x.topic);
  const filters = ['Discover', ...new Set(source)];
  const needle = query.trim().toLowerCase(),
    has = (parts: string[]) =>
      parts
        .flatMap((s) => [s, t(s)])
        .join(' ')
        .toLowerCase()
        .includes(needle);
  const resultPeople = people.filter(
    (x) =>
      (filter === 'Discover' || filter === x.category) &&
      has([
        x.name,
        x.role,
        x.country,
        ...x.tags,
        ...x.evidence.contributions.map((c) => c.title),
      ]),
  );
  const resultProjects = projects.filter(
    (x) =>
      (filter === 'Discover' || filter === x.kind) &&
      has([x.name, x.kind, x.summary, ...x.tags]),
  );
  const resultArticles = articles.filter(
    (x) =>
      (filter === 'Discover' || filter === x.topic) && has([x.title, x.topic, x.summary]),
  );
  const count =
    kind === 'people'
      ? resultPeople.length
      : kind === 'projects'
        ? resultProjects.length
        : resultArticles.length;
  return (
    <div className="container app-frame">
      <Sidebar kind={copy.label} items={filters} active={filter} onSelect={setFilter} />
      <section className="app-content">
        <PageHeading
          kicker={'Explore / ' + copy.label}
          title={copy.title}
          description={copy.description}
        />
        <div className="control-row">
          <label className="field-search">
            <Search size={19} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t(copy.placeholder)}
              placeholder={t(copy.placeholder)}
              maxLength={100}
            />
            {query && (
              <button
                className="icon-button"
                aria-label={t('Clear search')}
                onClick={() => setQuery('')}
              >
                <X size={15} />
              </button>
            )}
          </label>
          <button
            className="btn secondary"
            aria-expanded={show}
            onClick={() => setShow(!show)}
          >
            <SlidersHorizontal size={16} /> <T text={'Filters'} />
          </button>
        </div>
        {show && (
          <div className="filter-row">
            {filters.map((x) => (
              <button
                className={'pill ' + (filter === x ? 'selected' : '')}
                key={x}
                aria-pressed={filter === x}
                onClick={() => setFilter(x)}
              >
                <T text={x} />
              </button>
            ))}
          </div>
        )}
        <div className="result-line" aria-live="polite">
          <span>
            {
              <T
                text={
                  filter === 'Discover' ? 'Browse ' + copy.label.toLowerCase() : filter
                }
              />
            }
          </span>
          <span>
            <T text={count === 1 ? '{n} result' : '{n} results'} values={{ n: count }} />
          </span>
        </div>
        {!count ? (
          <Empty />
        ) : kind === 'people' ? (
          <div className="card-grid">
            {resultPeople.map((x) => (
              <PersonCard key={x.id} person={x} />
            ))}
          </div>
        ) : kind === 'projects' ? (
          <div className="card-grid">
            {resultProjects.map((x) => (
              <ProjectCard key={x.id} project={x} />
            ))}
          </div>
        ) : (
          <div className="knowledge-grid">
            {resultArticles.map((x, i) => (
              <ArticleCard
                key={x.id}
                article={x}
                featured={i === 0 && resultArticles.length > 1}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
