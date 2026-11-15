'use client';
import { TranslatedText } from '../localization/translated-text';
import { useTranslate } from '../../providers/language-provider';
import { useState } from 'react';
import { Archive, Bell, BookOpen, Inbox, Send, Star } from 'lucide-react';
import { PageHeading, Sidebar } from '../ui';
import { usePersistedState } from '../../hooks/use-persisted-state';
import { previewNotification, threads } from '../../repositories/preview-repository';
const messageTabs = ['Inbox', 'Starred', 'Archived', 'Notifications'];

export function Messages() {
  const translateText = useTranslate();
  const [tab, setTab] = useState('Inbox'),
    [thread, setThread] = useState(threads[0]),
    [text, setText] = useState('');
  const [drafts, setDrafts] = usePersistedState<Record<string, string[]>>(
    'dm-inbox-drafts',
    {},
  );
  const [starred, setStarred] = usePersistedState<string[]>('dm-starred-threads', []),
    [archived, setArchived] = usePersistedState<string[]>('dm-archived-threads', []);
  const [read, setRead] = usePersistedState<boolean>('dm-notifications-read', false);
  const list = threads.filter((messageThread) =>
    tab === 'Starred'
      ? starred.includes(messageThread.id) && !archived.includes(messageThread.id)
      : tab === 'Archived'
        ? archived.includes(messageThread.id)
        : !archived.includes(messageThread.id),
  );
  const active = list.find((messageThread) => messageThread.id === thread.id) ?? list[0];
  return (
    <div className="container app-frame">
      <Sidebar kind="Messages" items={messageTabs} active={tab} onSelect={setTab} />
      <section className="app-content">
        <PageHeading
          kicker="Your workspace"
          title="Messages & notifications"
          description="A preview of conversations and project updates. Drafts are saved locally."
        />
        <div className="mobile-tabs filter-row">
          {messageTabs.map((tabOption) => (
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
        {tab === 'Notifications' ? (
          <div className="panel">
            <div className="section-heading">
              <h2>
                <TranslatedText text={'Notifications'} />
              </h2>
              <button
                className="btn secondary"
                onClick={() => setRead(true)}
                disabled={read}
              >
                {<TranslatedText text={read ? 'All caught up' : 'Mark all as read'} />}
              </button>
            </div>
            <div className="mini-row">
              <Bell size={19} />
              <div>
                <strong>
                  {
                    <TranslatedText
                      text={
                        read ? previewNotification.title : previewNotification.unreadTitle
                      }
                    />
                  }
                </strong>
                <small>
                  <TranslatedText text={previewNotification.details} />
                </small>
              </div>
            </div>
          </div>
        ) : (
          <div className="inbox panel">
            <div className="inbox-list">
              <span className="kicker">
                <Inbox size={15} />
                <TranslatedText text={tab} />
              </span>
              {list.map((messageThread) => (
                <button
                  key={messageThread.id}
                  className={
                    'thread ' + (active?.id === messageThread.id ? 'active' : '')
                  }
                  onClick={() => {
                    setThread(messageThread);
                    setText('');
                  }}
                >
                  <span className="thread-avatar">{messageThread.initial}</span>
                  <span>
                    <strong>
                      <TranslatedText text={messageThread.name} />
                    </strong>
                    <small>
                      <TranslatedText text={messageThread.title} />
                    </small>
                  </span>
                </button>
              ))}
              {!list.length && (
                <p className="muted">
                  <TranslatedText text={'No conversations here.'} />
                </p>
              )}
            </div>
            {active && (
              <div className="inbox-chat">
                <div className="inbox-title">
                  <span className="thread-avatar">{active.initial}</span>
                  <div>
                    <strong>
                      <TranslatedText text={active.name} />
                    </strong>
                    <small>
                      <TranslatedText text={'Sample conversation'} />
                    </small>
                  </div>
                  <button
                    className="icon-button"
                    title={translateText('Toggle star')}
                    aria-label={translateText('Toggle star')}
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
                    title={translateText(
                      tab === 'Archived'
                        ? 'Restore conversation'
                        : 'Archive conversation',
                    )}
                    aria-label={translateText(
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
                    <TranslatedText text={active.text} />
                  </p>
                  {(drafts[active.id] ?? []).map((d, i) => (
                    <p className="bubble self" key={i}>
                      <small>
                        <TranslatedText text={'Saved draft'} />
                      </small>
                      {d}
                    </p>
                  ))}
                </div>
                <form
                  className="control-row chat-compose"
                  onSubmit={(event) => {
                    event.preventDefault();
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
                    aria-label={translateText('Reply draft')}
                    placeholder={translateText('Write a local reply draft…')}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                  <button
                    className="btn primary"
                    aria-label={translateText('Save reply draft')}
                  >
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
