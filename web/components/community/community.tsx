'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GitPullRequest,
  MessageCircle,
  Users,
} from 'lucide-react';
import { articles, people, projects } from '../../repositories/catalog-repository';
import { PageHeading, Portrait, Sidebar } from '../ui';
import { usePersistedState } from '../../hooks/use-persisted-state';
import {
  communityEvents,
  discussionPrompts,
  featuredContributors,
} from '../../repositories/preview-repository';

const tabs = ['Overview', 'Discussions', 'Events', 'Contributors'];
export function Community() {
  const translateText = useTranslate();
  const [tab, setTab] = useState('Overview'),
    [post, setPost] = useState('');
  const [drafts, setDrafts] = usePersistedState<string[]>('dm-community-drafts', []);
  return (
    <div className="container app-frame">
      <Sidebar kind="Community" items={tabs} active={tab} onSelect={setTab} />
      <section className="app-content">
        <PageHeading
          kicker="Connect / Community"
          title="Community"
          description="Share knowledge and make the work behind technology visible."
        />
        <div className="mobile-tabs filter-row">
          {tabs.map((tabOption) => (
            <button
              key={tabOption}
              className={'pill ' + (tab === tabOption ? 'selected' : '')}
              aria-pressed={tab === tabOption}
              onClick={() => setTab(tabOption)}
            >
              <TranslatedText text={tabOption} />
            </button>
          ))}
        </div>
        {tab === 'Overview' ? (
          <div className="community-columns">
            <div className="community-hero panel">
              <span className="kicker">
                <i /> <TranslatedText text={'Built together'} />
              </span>
              <h2>
                <TranslatedText text={'A global community'} />
                <br />
                <TranslatedText text={'of'} />{' '}
                <em>
                  <TranslatedText text={'builders.'} />
                </em>
              </h2>
              <p>
                <TranslatedText
                  text={
                    'Share ideas, ask better questions, and help document the projects that shape technology.'
                  }
                />
              </p>
              <div className="community-numbers">
                <span>
                  <Users size={17} />
                  <strong>{people.length}</strong>
                  <small>
                    <TranslatedText text={'People'} />
                  </small>
                </span>
                <span>
                  <GitPullRequest size={17} />
                  <strong>{projects.length}</strong>
                  <small>
                    <TranslatedText text={'Projects'} />
                  </small>
                </span>
                <span>
                  <BookOpen size={17} />
                  <strong>{articles.length}</strong>
                  <small>
                    <TranslatedText text={'Articles'} />
                  </small>
                </span>
              </div>
              <div className="hero-actions">
                <Link href="/join/" className="btn primary">
                  <TranslatedText text={'Join the community'} /> <ArrowRight size={16} />
                </Link>
                <button className="btn secondary" onClick={() => setTab('Discussions')}>
                  <TranslatedText text={'Browse discussions'} />
                </button>
              </div>
            </div>
            <div className="stack">
              <section className="panel">
                <h2>
                  <TranslatedText text={'Events preview'} />
                </h2>
                <EventList />
              </section>
              <section className="panel">
                <h2>
                  <TranslatedText text={'Featured contributors'} />
                </h2>
                <Contributors />
              </section>
            </div>
          </div>
        ) : tab === 'Events' ? (
          <div className="panel">
            <h2>
              <TranslatedText text={'Events preview'} />
            </h2>
            <EventList />
          </div>
        ) : tab === 'Contributors' ? (
          <div className="panel">
            <h2>
              <TranslatedText text={'Featured contributors'} />
            </h2>
            <Contributors />
          </div>
        ) : (
          <div className="stack">
            <section className="panel">
              <h2>
                <TranslatedText text={'Discussion prompts'} />
              </h2>
              {discussionPrompts.map((topic) => (
                <div className="mini-row" key={topic.title}>
                  <MessageCircle size={20} />
                  <div>
                    <strong>
                      <TranslatedText text={topic.title} />
                    </strong>
                    <small>
                      <TranslatedText text={topic.body} />
                    </small>
                  </div>
                </div>
              ))}
            </section>
            <form
              className="panel form-stack"
              onSubmit={(event) => {
                event.preventDefault();
                if (!post.trim()) return;
                setDrafts([...drafts, post.trim()]);
                setPost('');
              }}
            >
              <h2>
                <TranslatedText text={'Draft a discussion'} />
              </h2>
              <label>
                <TranslatedText text={'Your idea'} />
                <textarea
                  required
                  maxLength={600}
                  rows={3}
                  value={post}
                  onChange={(event) => setPost(event.target.value)}
                  placeholder={translateText('What would you like to discuss?')}
                />
              </label>
              <button className="btn primary">
                <TranslatedText text={'Save local draft'} />
              </button>
              <p className="muted">
                <TranslatedText text={'Drafts stay in this browser.'} />
              </p>
              {drafts.map((d, i) => (
                <div className="local-entry" key={i}>
                  {d}
                </div>
              ))}
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
function EventList() {
  return (
    <>
      {communityEvents.map((eventDetails) => (
        <div className="mini-row" key={eventDetails.title}>
          <span className="stat-icon">
            <CalendarDays size={17} />
          </span>
          <div>
            <strong>
              <TranslatedText text={eventDetails.title} />
            </strong>
            <small>
              <TranslatedText text={eventDetails.meta} />
            </small>
          </div>
        </div>
      ))}
    </>
  );
}
function Contributors() {
  return (
    <>
      {featuredContributors.map((person) => (
        <Link className="mini-row" key={person.id} href={'/people/' + person.id + '/'}>
          <Portrait person={person} />
          <div>
            <strong>{person.name}</strong>
            <small>
              <TranslatedText text={person.category} />
            </small>
          </div>
          <ArrowRight size={15} />
        </Link>
      ))}
    </>
  );
}
