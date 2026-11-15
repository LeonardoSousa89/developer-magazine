'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { TranslatedText } from '../localization/translated-text';
import { useSession } from '../../providers/preview-session';
import { saveWikiEntry, useWikiEntries } from '../../providers/wiki-state';
import { wikiKinds, type WikiEntry } from '../../types/wiki';

export function WikiWorkspace({ catalog }: { catalog: readonly WikiEntry[] }) {
  const session = useSession();
  const params = useSearchParams();
  const [selectedEntry, selectEntry] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const revisions = useWikiEntries();
  const originalIds = new Set(catalog.map(({ id }) => id));
  const entries = [
    ...catalog.map((entry) => revisions.find(({ id }) => id === entry.id) ?? entry),
    ...revisions.filter(({ id }) => !originalIds.has(id)),
  ];
  const selected = selectedEntry ?? params.get('entry') ?? '';
  const entry = entries.find(({ id }) => id === selected);

  return (
    <div className="container wiki-workspace">
      <h1>
        <TranslatedText text="Community contributions" />
      </h1>
      {session ? (
        <form
          className="panel form-stack"
          key={entry?.id ?? 'new'}
          onSubmit={(event) => {
            event.preventDefault();
            const fields = new FormData(event.currentTarget);
            const value = (name: string) => String(fields.get(name) ?? '').trim();
            const kind = entry?.kind ?? wikiKinds.find((item) => item === value('kind'));
            const title = value('title'),
              summary = value('summary'),
              body = value('body');
            if (!kind || !title || !summary || !body) {
              setStatus('Complete all fields.');
              return;
            }
            try {
              const id = entry?.id ?? 'draft:' + crypto.randomUUID();
              if (!saveWikiEntry({ id, kind, title, summary, body })) return;
              selectEntry(id);
              setStatus('Contribution saved in this browser.');
            } catch {
              setStatus('The contribution could not be saved.');
            }
          }}
        >
          <h2>
            <TranslatedText text={entry ? 'Edit entry' : 'New entry'} />
          </h2>
          <label>
            <TranslatedText text="Choose an entry" />
            <select
              value={entry?.id ?? ''}
              onChange={(event) => {
                selectEntry(event.target.value);
                setStatus('');
              }}
            >
              <option value="">
                <TranslatedText text="New entry" />
              </option>
              {entries.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </select>
          </label>
          <label>
            <TranslatedText text="Category" />
            <select
              disabled={Boolean(entry)}
              defaultValue={entry?.kind ?? 'Article'}
              name="kind"
            >
              {wikiKinds.map((kind) => (
                <option key={kind} value={kind}>
                  <TranslatedText text={kind} />
                </option>
              ))}
            </select>
          </label>
          <label>
            <TranslatedText text="Title" />
            <input required name="title" maxLength={150} defaultValue={entry?.title} />
          </label>
          <label>
            <TranslatedText text="Summary" />
            <input
              required
              name="summary"
              maxLength={300}
              defaultValue={entry?.summary}
            />
          </label>
          <label>
            <TranslatedText text="Content" />
            <textarea
              required
              name="body"
              rows={9}
              maxLength={16000}
              defaultValue={entry?.body}
            />
          </label>
          <button className="btn primary">
            <TranslatedText text="Save contribution" />
          </button>
          <p role="status">
            <TranslatedText text={status} />
          </p>
        </form>
      ) : session === null ? (
        <Link className="btn secondary" href="/signin/">
          <TranslatedText text="Sign in to contribute" />
        </Link>
      ) : null}
      <section className="stack">
        <h2>
          <TranslatedText text="Entries in this browser" />
        </h2>
        {revisions.length === 0 && (
          <p>
            <TranslatedText text="No contributions yet." />
          </p>
        )}
        {revisions.map((revision) => (
          <details className="panel wiki-entry" key={revision.id}>
            <summary>{revision.title}</summary>
            <p>{revision.summary}</p>
            <p className="wiki-body">{revision.body}</p>
            {session && (
              <button
                className="btn secondary"
                onClick={() => {
                  selectEntry(revision.id);
                  setStatus('');
                  window.scrollTo(0, 0);
                }}
              >
                <TranslatedText text="Edit entry" />
              </button>
            )}
          </details>
        ))}
      </section>
    </div>
  );
}
