'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { articles, people, projects } from '../../repositories/catalog-repository';
import { ArticleCard, Empty, PageHeading, PersonCard, ProjectCard, Sidebar } from '../ui';
import { indexSearch, matchSearch } from '../../services/catalog-search';
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
const directoryFilters = {
  people: [
    'Discover',
    ...new Set(people.map((person) => person.category)),
    ...new Set(people.map((person) => person.profession)),
  ],
  projects: ['Discover', ...new Set(projects.map((item) => item.kind))],
  knowledge: ['Discover', ...new Set(articles.map((item) => item.topic))],
};

export function Discovery({ kind }: { kind: Directory }) {
  const translateText = useTranslate();
  const [query, setQuery] = useState(''),
    [filter, setFilter] = useState('Discover'),
    [show, setShow] = useState(false);
  const copy = descriptions[kind];
  const filters = directoryFilters[kind];
  const index = useMemo(
    () => ({
      people:
        kind === 'people'
          ? indexSearch(
              people,
              (person) => [
                person.name,
                person.role,
                person.category,
                person.profession,
                person.country,
                ...person.tags,
                ...person.evidence.contributions.map(
                  (contribution) => contribution.title,
                ),
              ],
              translateText,
            )
          : [],
      projects:
        kind === 'projects'
          ? indexSearch(
              projects,
              (project) => [project.name, project.kind, project.summary, ...project.tags],
              translateText,
            )
          : [],
      articles:
        kind === 'knowledge'
          ? indexSearch(
              articles,
              (article) => [article.title, article.topic, article.summary],
              translateText,
            )
          : [],
    }),
    [kind, translateText],
  );
  const { resultPeople, resultProjects, resultArticles } = useMemo(() => {
    const needle = query.trim();
    return {
      resultPeople: matchSearch(
        index.people,
        needle,
        (person) =>
          filter === 'Discover' ||
          filter === person.category ||
          filter === person.profession,
      ),
      resultProjects: matchSearch(
        index.projects,
        needle,
        (project) => filter === 'Discover' || filter === project.kind,
      ),
      resultArticles: matchSearch(
        index.articles,
        needle,
        (article) => filter === 'Discover' || filter === article.topic,
      ),
    };
  }, [index, query, filter]);
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
              onChange={(event) => setQuery(event.target.value)}
              aria-label={translateText(copy.placeholder)}
              placeholder={translateText(copy.placeholder)}
              maxLength={100}
            />
            {query && (
              <button
                className="icon-button"
                aria-label={translateText('Clear search')}
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
            <SlidersHorizontal size={16} /> <TranslatedText text={'Filters'} />
          </button>
        </div>
        {show && (
          <div className="filter-row">
            {filters.map((filterOption) => (
              <button
                className={'pill ' + (filter === filterOption ? 'selected' : '')}
                key={filterOption}
                aria-pressed={filter === filterOption}
                onClick={() => setFilter(filterOption)}
              >
                <TranslatedText text={filterOption} />
              </button>
            ))}
          </div>
        )}
        <div className="result-line" aria-live="polite">
          <span>
            {
              <TranslatedText
                text={
                  filter === 'Discover' ? 'Browse ' + copy.label.toLowerCase() : filter
                }
              />
            }
          </span>
          <span>
            <TranslatedText
              text={count === 1 ? '{n} result' : '{n} results'}
              values={{ n: count }}
            />
          </span>
        </div>
        {!count ? (
          <Empty />
        ) : kind === 'people' ? (
          <div className="card-grid">
            {resultPeople.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        ) : kind === 'projects' ? (
          <div className="card-grid">
            {resultProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="knowledge-grid">
            {resultArticles.map((article, i) => (
              <ArticleCard
                key={article.id}
                article={article}
                featured={i === 0 && resultArticles.length > 1}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
