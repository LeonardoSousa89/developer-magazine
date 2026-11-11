'use client';
import { T, useT } from '../../providers/language-provider';
import { useState } from 'react';
import { Archive, Bell, BookOpen, Inbox, Send, Star } from 'lucide-react';
import { PageHeading, Sidebar } from '../ui';
import { useLocal } from '../../hooks/local-store';
const threads = [
  {
    id: 'editorial',
    name: 'Editorial desk',
    initial: 'ED',
    title: 'Welcome to the preview',
    text: 'This sample inbox shows how a conversation could look. You can write and save a reply draft on this device.',
  },
  {
    id: 'projects',
    name: 'Project desk',
    initial: 'PD',
    title: 'Documenting a contribution',
    text: 'A useful contribution entry links to work others can inspect, and explains what changed and why it mattered.',
  },
  {
    id: 'community',
    name: 'Community desk',
    initial: 'CD',
    title: 'Introduce your work',
    text: 'What is one project you learned from or helped build?',
  },
];
export function Messages() {
  const t = useT();
  const [tab, setTab] = useState('Inbox'),
    [thread, setThread] = useState(threads[0]),
    [text, setText] = useState('');
  const [drafts, setDrafts] = useLocal<Record<string, string[]>>('dm-inbox-drafts', {});
  const [starred, setStarred] = useLocal<string[]>('dm-starred-threads', []),
    [archived, setArchived] = useLocal<string[]>('dm-archived-threads', []);
  const [read, setRead] = useLocal<boolean>('dm-notifications-read', false);
  const list = threads.filter((t) =>
    tab === 'Starred'
      ? starred.includes(t.id) && !archived.includes(t.id)
      : tab === 'Archived'
        ? archived.includes(t.id)
        : !archived.includes(t.id),
  );
  const active = list.find((t) => t.id === thread.id) ?? list[0];
  return (
    <div className="container app-frame">
      <Sidebar
        kind="Messages"
        items={['Inbox', 'Starred', 'Archived', 'Notifications']}
        active={tab}
        onSelect={setTab}
      />
      <section className="app-content">
        <PageHeading
          kicker="Your workspace"
          title="Messages & notifications"
          description="A preview of conversations and project updates. Drafts are saved locally."
        />
        <div className="mobile-tabs filter-row">
          {['Inbox', 'Starred', 'Archived', 'Notifications'].map((x) => (
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
        {tab === 'Notifications' ? (
          <div className="panel">
            <div className="section-heading">
              <h2>
                <T text={'Notifications'} />
              </h2>
              <button
                className="btn secondary"
                onClick={() => setRead(true)}
                disabled={read}
              >
                {<T text={read ? 'All caught up' : 'Mark all as read'} />}
              </button>
            </div>
            <div className="mini-row">
              <Bell size={19} />
              <div>
                <strong>
                  {
                    <T
                      text={
                        read
                          ? 'Welcome to the workspace'
                          : 'New · Welcome to the workspace'
                      }
                    />
                  }
                </strong>
                <small>
                  <T text={'Sample notification · Developer Magazine'} />
                </small>
              </div>
            </div>
          </div>
        ) : (
          <div className="inbox panel">
            <div className="inbox-list">
              <span className="kicker">
                <Inbox size={15} />
                <T text={tab} />
              </span>
              {list.map((t) => (
                <button
                  key={t.id}
                  className={'thread ' + (active?.id === t.id ? 'active' : '')}
                  onClick={() => {
                    setThread(t);
                    setText('');
                  }}
                >
                  <span className="thread-avatar">{t.initial}</span>
                  <span>
                    <strong>
                      <T text={t.name} />
                    </strong>
                    <small>
                      <T text={t.title} />
                    </small>
                  </span>
                </button>
              ))}
              {!list.length && (
                <p className="muted">
                  <T text={'No conversations here.'} />
                </p>
              )}
            </div>
            {active && (
              <div className="inbox-chat">
                <div className="inbox-title">
                  <span className="thread-avatar">{active.initial}</span>
                  <div>
                    <strong>
                      <T text={active.name} />
                    </strong>
                    <small>
                      <T text={'Sample conversation'} />
                    </small>
                  </div>
                  <button
                    className="icon-button"
                    title={t('Toggle star')}
                    aria-label={t('Toggle star')}
                    aria-pressed={starred.includes(active.id)}
                    onClick={() =>
                      setStarred(
                        starred.includes(active.id)
                          ? starred.filter((id) => id !== active.id)
                          : [...starred, active.id],
                      )
                    }
                  >
                    <Star
                      size={18}
                      fill={starred.includes(active.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button
                    className="icon-button"
                    title={t(
                      tab === 'Archived'
                        ? 'Restore conversation'
                        : 'Archive conversation',
                    )}
                    aria-label={t(
                      tab === 'Archived'
                        ? 'Restore conversation'
                        : 'Archive conversation',
                    )}
                    onClick={() =>
                      setArchived(
                        archived.includes(active.id)
                          ? archived.filter((id) => id !== active.id)
                          : [...archived, active.id],
                      )
                    }
                  >
                    <Archive size={18} />
                  </button>
                </div>
                <div className="bubbles">
                  <p className="bubble">
                    <BookOpen size={15} />
                    <T text={active.text} />
                  </p>
                  {(drafts[active.id] ?? []).map((d, i) => (
                    <p className="bubble self" key={i}>
                      <small>
                        <T text={'Saved draft'} />
                      </small>
                      {d}
                    </p>
                  ))}
                </div>
                <form
                  className="control-row chat-compose"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!text.trim()) return;
                    setDrafts({
                      ...drafts,
                      [active.id]: [...(drafts[active.id] ?? []), text.trim()],
                    });
                    setText('');
                  }}
                >
                  <input
                    required
                    maxLength={500}
                    aria-label={t('Reply draft')}
                    placeholder={t('Write a local reply draft…')}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button className="btn primary" aria-label={t('Save reply draft')}>
                    <Send size={17} />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
