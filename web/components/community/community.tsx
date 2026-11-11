'use client';
import { T, useT } from '../../providers/language-provider';
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
import { useLocal } from '../../hooks/local-store';
const tabs = ['Overview', 'Discussions', 'Events', 'Contributors'];
const topics = [
  {
    title: 'How do you document a project’s first release?',
    body: 'Share what belongs in a changelog, release note, or project history.',
  },
  {
    title: 'What makes a contribution easy to verify?',
    body: 'Compare useful references: a pull request, design note, issue, or published article.',
  },
];
const events = [
  { title: 'Open source contributor roundtable', meta: 'Sample event · Online' },
  { title: 'Documenting technical decisions', meta: 'Sample workshop · Online' },
  { title: 'Community project show-and-tell', meta: 'Sample meetup · Online' },
];
export function Community() {
  const t = useT();
  const [tab, setTab] = useState('Overview'),
    [post, setPost] = useState('');
  const [drafts, setDrafts] = useLocal<string[]>('dm-community-drafts', []);
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
          {tabs.map((x) => (
            <button
              key={x}
              className={'pill ' + (tab === x ? 'selected' : '')}
              aria-pressed={tab === x}
              onClick={() => setTab(x)}
            >
              <T text={x} />
            </button>
          ))}
        </div>
        {tab === 'Overview' ? (
          <div className="community-columns">
            <div className="community-hero panel">
              <span className="kicker">
                <i /> <T text={'Built together'} />
              </span>
              <h2>
                <T text={'A global community'} />
                <br />
                <T text={'of'} />{' '}
                <em>
                  <T text={'builders.'} />
                </em>
              </h2>
              <p>
                <T
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
                    <T text={'People'} />
                  </small>
                </span>
                <span>
                  <GitPullRequest size={17} />
                  <strong>{projects.length}</strong>
                  <small>
                    <T text={'Projects'} />
                  </small>
                </span>
                <span>
                  <BookOpen size={17} />
                  <strong>{articles.length}</strong>
                  <small>
                    <T text={'Articles'} />
                  </small>
                </span>
              </div>
              <div className="hero-actions">
                <Link href="/join/" className="btn primary">
                  <T text={'Join the community'} /> <ArrowRight size={16} />
                </Link>
                <button className="btn secondary" onClick={() => setTab('Discussions')}>
                  <T text={'Browse discussions'} />
                </button>
              </div>
            </div>
            <div className="stack">
              <section className="panel">
                <h2>
                  <T text={'Events preview'} />
                </h2>
                <EventList />
              </section>
              <section className="panel">
                <h2>
                  <T text={'Featured contributors'} />
                </h2>
                <Contributors />
              </section>
            </div>
          </div>
        ) : tab === 'Events' ? (
          <div className="panel">
            <h2>
              <T text={'Events preview'} />
            </h2>
            <EventList />
          </div>
        ) : tab === 'Contributors' ? (
          <div className="panel">
            <h2>
              <T text={'Featured contributors'} />
            </h2>
            <Contributors />
          </div>
        ) : (
          <div className="stack">
            <section className="panel">
              <h2>
                <T text={'Discussion prompts'} />
              </h2>
              {topics.map((t) => (
                <div className="mini-row" key={t.title}>
                  <MessageCircle size={20} />
                  <div>
                    <strong>
                      <T text={t.title} />
                    </strong>
                    <small>
                      <T text={t.body} />
                    </small>
                  </div>
                </div>
              ))}
            </section>
            <form
              className="panel form-stack"
              onSubmit={(e) => {
                e.preventDefault();
                if (!post.trim()) return;
                setDrafts([...drafts, post.trim()]);
                setPost('');
              }}
            >
              <h2>
                <T text={'Draft a discussion'} />
              </h2>
              <label>
                <T text={'Your idea'} />
                <textarea
                  required
                  maxLength={600}
                  rows={3}
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder={t('What would you like to discuss?')}
                />
              </label>
              <button className="btn primary">
                <T text={'Save local draft'} />
              </button>
              <p className="muted">
                <T text={'Drafts stay in this browser.'} />
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
      {events.map((e) => (
        <div className="mini-row" key={e.title}>
          <span className="stat-icon">
            <CalendarDays size={17} />
          </span>
          <div>
            <strong>
              <T text={e.title} />
            </strong>
            <small>
              <T text={e.meta} />
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
      {['torvalds', 'hamilton', 'hopper']
        .map((id) => people.find((p) => p.id === id)!)
        .map((p) => (
          <Link className="mini-row" key={p.id} href={'/people/' + p.id + '/'}>
            <Portrait person={p} />
            <div>
              <strong>{p.name}</strong>
              <small>
                <T text={p.category} />
              </small>
            </div>
            <ArrowRight size={15} />
          </Link>
        ))}
    </>
  );
}
