'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, Briefcase, MapPin, Search } from 'lucide-react';
import { positions } from '../../repositories/catalog-repository';
import { Empty, PageHeading, Tags } from '../ui';
const categories = ['All', 'Frontend', 'Backend', 'DevOps'];
export function Team() {
  const translateText = useTranslate();
  const [filter, setFilter] = useState('All'),
    [query, setQuery] = useState('');
  const items = positions.filter(
    (position) =>
      (filter === 'All' || position.area === filter) &&
      [position.title, position.description, ...position.tags]
        .flatMap((searchTerm) => [searchTerm, translateText(searchTerm)])
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
            aria-label={translateText('Search team roles')}
            placeholder={translateText('Search team roles and skills…')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            className={'pill ' + (filter === category ? 'selected' : '')}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            <TranslatedText text={category} />
          </button>
        ))}
      </div>
      <div className="result-line">
        <span>
          <TranslatedText text={'Founding team · Collaboration'} />
        </span>
        <span>
          <TranslatedText text="{n} roles" values={{ n: items.length }} />
        </span>
      </div>
      {items.length ? (
        <div className="card-grid">
          {items.map((position) => (
            <article className="card team-card" key={position.id}>
              <div className="team-card-top">
                <span className="stat-icon">
                  <Briefcase size={24} />
                </span>
                <span className="badge warm">
                  <TranslatedText text={'Collaboration role'} />
                </span>
              </div>
              <h2>
                <TranslatedText text={position.title} />
              </h2>
              <p>
                <TranslatedText text={position.description} />
              </p>
              <span className="card-meta">
                <MapPin size={14} /> <TranslatedText text={'Remote · Worldwide'} />
              </span>
              <Tags items={position.tags} />
              <Link
                href={'/join/?role=' + encodeURIComponent(position.title)}
                className="btn primary"
              >
                <TranslatedText text={'Express interest'} /> <ArrowUpRight size={15} />
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
