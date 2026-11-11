'use client';
import { T, useT } from '../../providers/language-provider';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Briefcase, MapPin, Search } from 'lucide-react';
import { positions } from '../../repositories/catalog-repository';
import { Empty, PageHeading, Tags } from '../ui';
const categories = ['All', 'Frontend', 'Backend', 'DevOps'];
export function Team() {
  const t = useT();
  const [filter, setFilter] = useState('All'),
    [query, setQuery] = useState('');
  const items = positions.filter(
    (p) =>
      (filter === 'All' || p.area === filter) &&
      [p.title, p.description, ...p.tags]
        .flatMap((x) => [x, t(x)])
        .join(' ')
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="container standalone">
      <PageHeading
        kicker="Community / Team"
        title="Team members"
        description="Meet the people shaping Developer Magazine and explore where you can contribute."
      />
      <div className="control-row">
        <label className="field-search">
          <Search size={19} />
          <input
            aria-label={t('Search team roles')}
            placeholder={t('Search team roles and skills…')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="filter-row">
        {categories.map((c) => (
          <button
            key={c}
            className={'pill ' + (filter === c ? 'selected' : '')}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            <T text={c} />
          </button>
        ))}
      </div>
      <div className="result-line">
        <span>
          <T text={'Founding team · Collaboration'} />
        </span>
        <span>
          <T text="{n} roles" values={{ n: items.length }} />
        </span>
      </div>
      {items.length ? (
        <div className="card-grid">
          {items.map((p) => (
            <article className="card team-card" key={p.id}>
              <div className="team-card-top">
                <span className="stat-icon">
                  <Briefcase size={24} />
                </span>
                <span className="badge warm">
                  <T text={'Collaboration role'} />
                </span>
              </div>
              <h2>
                <T text={p.title} />
              </h2>
              <p>
                <T text={p.description} />
              </p>
              <span className="card-meta">
                <MapPin size={14} /> <T text={'Remote · Worldwide'} />
              </span>
              <Tags items={p.tags} />
              <Link
                href={'/join/?role=' + encodeURIComponent(p.title)}
                className="btn primary"
              >
                <T text={'Express interest'} /> <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
}
