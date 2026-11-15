import { Suspense } from 'react';
import { WikiWorkspace } from '../../components/wiki/wiki-workspace';
import { articles, people } from '../../repositories/catalog-repository';
import type { WikiEntry } from '../../types/wiki';

export const metadata = { title: 'Community contributions' };

const catalog: WikiEntry[] = [
  ...articles.map((article) => ({
    id: 'article:' + article.id,
    kind: 'Article' as const,
    title: article.title,
    summary: article.summary,
    body: article.panels
      .flatMap((panel) => [panel.title, ...panel.paragraphs])
      .join('\n\n'),
  })),
  ...people.flatMap((person): WikiEntry[] =>
    person.category === 'Historical figure' || person.category === 'Famous'
      ? [
          {
            id: 'person:' + person.id,
            kind: person.category,
            title: person.name,
            summary: person.role,
            body: person.bio,
          },
        ]
      : [],
  ),
];

export default function Page() {
  return (
    <Suspense>
      <WikiWorkspace catalog={catalog} />
    </Suspense>
  );
}
