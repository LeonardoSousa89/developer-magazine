'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useSession } from '../../providers/preview-session';
import { useWikiEntries } from '../../providers/wiki-state';
import type { WikiEntry } from '../../types/wiki';
import { TranslatedText } from '../localization/translated-text';

export function WikiEditLink({ id }: { id?: string }) {
  const session = useSession();
  return session ? (
    <Link
      className="btn secondary wiki-edit-link"
      href={id ? '/contribute/?entry=' + encodeURIComponent(id) : '/contribute/'}
    >
      <TranslatedText text={id ? 'Edit entry' : 'Contribute'} />
    </Link>
  ) : null;
}

export function WikiRevision({
  id,
  field,
  inline,
  children,
}: {
  id: string;
  field: keyof Pick<WikiEntry, 'title' | 'summary' | 'body'>;
  inline?: boolean;
  children: ReactNode;
}) {
  const revised = useWikiEntries().find((entry) => entry.id === id)?.[field];
  if (revised === undefined) return children;
  if (field !== 'body' || inline) return revised;
  return (
    <div className="article-panel">
      <div className="article-panel-frame">
        {revised.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
